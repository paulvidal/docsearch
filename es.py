from elasticsearch import Elasticsearch


INDEX = 'documentation'

es=Elasticsearch([{'host':'localhost','port':9200}])


def insert_doc(id, doc):
    res = es.index(index='documentation', id=id, body=doc)
    print('Inserted doc res=' + str(res))


def create():
    res = es.indices.create(index=INDEX, body={
        "mappings":{
            "properties": {
                "source": {
                    "type": "keyword",
                },
                "title": {
                    "type": "text",
                    "analyzer": "english",
                },
                "h1": {
                    "type": "text",
                    "analyzer": "english",
                },
                "h2": {
                    "type": "text",
                    "analyzer": "english",
                },
                "h3": {
                    "type": "text",
                    "analyzer": "english",
                },
                "h4": {
                    "type": "text",
                    "analyzer": "english",
                },
                "h5": {
                    "type": "text",
                    "analyzer": "english",
                },
                "h6": {
                    "type": "text",
                    "analyzer": "english",
                },
                "content": {
                    "type": "text",
                    "analyzer": "english",
                },
                "rendered_content": {
                    "type": "text",
                    "analyzer": "english",
                },
                "link": {
                    "type": "text",
                }
            }
        }
    })

    print('Deleted index res=' + str(res))


def delete():
    res = es.indices.delete(index=INDEX)
    print('Deleted index res=' + str(res))


if __name__ == '__main__':
    delete()
    create()