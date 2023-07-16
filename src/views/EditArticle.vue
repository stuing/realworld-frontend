<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="form.title" type="text" class="form-control form-control-lg"
                                    placeholder="Article Title" />
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="form.description" type="text" class="form-control"
                                    placeholder="What's this article about?" />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea v-model="form.body" class="form-control" rows="8"
                                    placeholder="Write your article (in markdown)">
                                </textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="newTag" type="text" class="form-control" placeholder="Enter tags"
                                    @change="addTag" @keypress.enter.prevent="addTag" />
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary" 
                                type="submit"
                                :disabled="!(form.title && form.description && form.body)">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, reactive, ref } from 'vue'
import { api } from '@/services';
import type { Article } from '@/services/api';


const route = useRoute()
const router = useRouter()
const slug = computed<string>(() => route.params.slug as string)

interface FormState {
    title: string,
    description: string
    body: string
    tagList: string[]
}

const form: FormState = reactive({
    title: '',
    description: '',
    body: '',
    tagList: []
})

const newTag = ref<string>('')

const addTag = () => {
    form.tagList.push(newTag.value.trim())
}

const removeTag = (tag: string) => {
    form.tagList.filter(function (t) { return t != tag })
}

async function fetchArticle(slug: string) {
    const article = await api.articles.getArticle(slug).then(res => res.data.article)
    form.title = article.title
    form.description = article.description
    form.body = article.body
    form.tagList = article.tagList
}

onMounted(() => {
    if (slug.value) fetchArticle(slug.value)
})

const onSubmit = async function () {
    console.log('in Onsubmit')
    let article: Article
    if (slug.value) {
        article = await api.articles.updateArticle(slug.value, { article: form }).then(function (res) {
            return res.data.article
        })
    } else {
        article = await api.articles.createArticle({ article: form }).then(function (res) {
            return res.data.article
        })
    }
}

</script>
    
<style scoped></style>
    