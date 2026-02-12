export const checksums = {
  "content": "v3.5.0--7ue83FFIHAf7kq37K05mM2rlIxLAL3q3uzSgT-I5lYE"
}
export const checksumsStructure = {
  "content": "iqeO2cAQLQJgnaq2MvvDKikyya6cXzeOv30s7rAf6co"
}

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
      "body": "json",
      "category": "json",
      "cover": "string",
      "date": "string",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "readingTime": "number",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}