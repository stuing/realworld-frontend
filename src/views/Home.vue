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
//import type { Article } from '@/services/api'
import { onMounted } from 'vue'
import { ref } from 'vue'

//const articles = ref<Article[]>([])
const articles = ref([])
const tags = ref<string[]>([])
//const articlesCount = ref(0)

onMounted(async () => {
  const articlesUrl = 'https://api.realworld.io/api/articles?limit=5&offset=0'
  const tagsUrl = 'https://api.realworld.io/api/tags' 
  const articlesResponse = await fetch(articlesUrl)
  const articlesData = await articlesResponse.json()
  articles.value = articlesData.articles

  const tagsResponse = await fetch(tagsUrl)
  const tagsData = await tagsResponse.json()
  tags.value = await tagsData.tags
})
</script>