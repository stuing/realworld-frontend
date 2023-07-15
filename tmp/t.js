const api = new Api({
    baseUrl: 'https://api.realworld.io' + '/api',
    baseApiParams: {
      headers: {
        'content-type': ContentType.Json,
      },
      format: 'json',
    },
  })

api.articles.getArticles()


class Api extends HttpClient {
   
}

class HttpClient {
    // 有很多属性
    // ...
    constructor(apiConfig = {}) {
        Object.assign(this, apiConfig);
    }
}


let getArticles = (
    query,
    params = {},
  ) =>
    this.request({
      path: `/articles`,
      method: "GET",
      query: query,
      ...params,
    })

let getArticles1 = ( 
    query,
    params = {}
    ) => {
    this.request({
        path: `/articles`,
        method: 'GET',
        query: query,
        ...params,
    })
}

