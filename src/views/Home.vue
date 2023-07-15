<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles">
            <div class="article-meta">
              <a href="profile.html"><img :src="article.author.image" /></a>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ article.updatedAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a v-for="tag in tags" href="" class="tag-pill tag-default">{{ tag }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import { Api, ContentType } from '@/services/api'
//import { Api, ContentType } from '../services/api'
import { api } from 'src/services'
import type { Article } from 'src/services/api'
import { onMounted } from 'vue'
import { ref } from 'vue'
//import { CONFIG } from '@/config'
 
const articles = ref<Article[]>([])
const tags = ref<string[]>([])
const articlesCount = ref(0)

onMounted(async () => {
  // const api = new Api({
  //   //baseUrl: 'https://api.realworld.io' + '/api',
  //   baseUrl: `${CONFIG.API_HOST}/api`,
  //   baseApiParams: {
  //     headers: {
  //       'content-type': ContentType.Json,
  //     },
  //     format: 'json',
  //   },
  // })

  articles.value = []
  tags.value = []
  let articlesResponsePromise: null | Promise<{ articles: Article[], articlesCount: number }> = null
  let tagsResponsePromise: null | Promise<{tags: string[]}> = null
  articlesResponsePromise = api.articles.getArticles()
    .then(res => res.data)
  if (articlesResponsePromise !== null) {
    const articlesResponse = await articlesResponsePromise
    articles.value = articlesResponse.articles
    articlesCount.value = articlesResponse.articlesCount
  } else {
    console.error('error')
  }

  tagsResponsePromise = api.tags.getTags()
    .then(res => res.data)
  if (tagsResponsePromise !== null) {
    const tagsResponse = await tagsResponsePromise
    tags.value = tagsResponse.tags
  } else {
    console.error('error')
  }
})
</script> 