<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <form class="w-100" onsubmit="return false;">
          <div class="form-group">
            <label for="exampleInputEmail1">Search documents</label>
            <input class="form-control" id="exampleInputEmail1" v-model="query" placeholder="Search...">
          </div>
        </form>
      </div>

      <div class="row mt-2">
        <div class="mt-1 mb-2" v-if="hitCount !== null"><strong>{{ hitCount }}</strong> results found</div>

        <div class="card mt-2 w-100" v-for="(r, i) in results">
          <div class="card-body markdown-body">
            <h4 class="card-title" >
              {{ r._source.source + ' /'}}
              <a :href="r._source.link" v-html="highlight(r._source.title, r.highlight.title)"></a>
              <h6 class="float-right mt-0">{{ i + 1 }}</h6>
            </h4>
            <h6 class="card-subtitle" v-html="displayBreadcrumb(r._source, r.highlight)"></h6>
            <div v-html="highlight(r._source.rendered_content, r.highlight.content)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import search from './query';

  export default {
    name: 'app',
    data() {
      return {
        query: '' || this.$route.query.q,
        results: [],
        hitCount: null
      }
    },
    created() {
      if (this.query) {
        this.makeQuery();
      }
    },
    watch: {
      query: 'makeQuery'
    },
    methods: {
      makeQuery () {
        // Update the query path
        this.$router.push({ query: { q: this.query } });

        // Make a search call
        search(this.query, (data) => {
          this.results = data.hits.hits;
          this.hitCount = data.hits.total.value;
        });
      },
      displayBreadcrumb(source, highlight) {
        let titles = [
          highlight ? this.highlight(source.h1, highlight.h1) : source.h1,
          highlight ? this.highlight(source.h2, highlight.h2) : source.h2,
          highlight ? this.highlight(source.h3, highlight.h3) : source.h3,
          highlight ? this.highlight(source.h4, highlight.h4) : source.h4,
          highlight ? this.highlight(source.h5, highlight.h5) : source.h5,
          highlight ? this.highlight(source.h6, highlight.h6) : source.h6
        ];

        console.log(titles);

        return titles.filter(Boolean).join(' / ')
      },
      highlight(renderedContent, highlightWords) {
        if (!highlightWords) {
          return renderedContent;
        }

        console.log(highlightWords);

        // We join like this we get all the highlighted words together in a string to extract them
        highlightWords = highlightWords.join(' ');

        const wordMatched = [...new Set([...highlightWords.matchAll('<em>(.*?)<\/em>')].map(m => m[1]))];

        console.log(highlightWords);

        let highlightedRenderedContent = renderedContent;
        wordMatched.map(word => {
          highlightedRenderedContent = highlightedRenderedContent.replace(
            new RegExp(word + '(?![^<]*?>)', "g"), // do not replace in url within link tags i.e. <a href="url"></a>
            `<em class="hglt">${word}</em>`
          );
        });

        return highlightedRenderedContent;
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }

  .hglt {
    font-style: normal;
    font-weight: bold;
    color: #de422f;
    background-color: #ffbcbca3;
  }
</style>
