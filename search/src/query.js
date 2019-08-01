import elasticsearch from 'elasticsearch'

const client = new elasticsearch.Client({
    host: 'http://localhost:8081/es',
    log: 'error'
 });

function search(query, calback) {
  client.search({
    index: 'documentation',
    body: {
      query: {
        multi_match: {
          query: query,
          fields: [
            "title^3",
            "content^1",
            "h1^3",
            "h2^2",
            "h3^1.5",
            "h4^1.5",
            "h5^1",
            "h6^1"
          ],
          fuzziness : "AUTO",
          prefix_length : 2
        }
      },
      highlight: {
        pre_tags: ["<em>"],
        post_tags: ["</em>"],
        fields : {
          title: {
            fragment_size: 0,
            number_of_fragments: 0,
          },
          content: {
            fragment_size: 0,
            number_of_fragments: 0,
          },
          h1: {
            fragment_size: 0,
            number_of_fragments: 0,
          },
          h2: {
            fragment_size: 0,
            number_of_fragments: 0,
          },
          h3: {
            fragment_size: 0,
            number_of_fragments: 0,
          },
          h4: {
            fragment_size: 0,
            number_of_fragments: 0,
          },
          h5: {
            fragment_size: 0,
            number_of_fragments: 0,
          },
          h6: {
            fragment_size: 0,
            number_of_fragments: 0,
          }
        }
      },
      size: 100
    }
  }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      calback(result);
    }
  });
}

export default search;