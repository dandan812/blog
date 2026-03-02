export const checksums = {}
export const checksumsStructure = {}

export const tables = {
  "content": "_content_content",
  "info": "_content_info"
}

export default {
  "content": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "author": "string",
      "body": "json",
      "category": "json",
      "cover": "string",
      "date": "string",
      "description": "string",
      "excerpt": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "readingTime": "number",
      "seo": "json",
      "stem": "string",
      "tags": "json",
      "toc": "boolean"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}