<template>
    <div>
        <!-- display on large screens -->
        <div class="lg:block container lg:mb-5 lg:mt-5 lg:mb-5 hidden border-b pb-5">
            <div class="flex -mx-2">
                <div v-for="(article, index) in articles" class="w-1/3 px-2" v-if="index === 0">
                    <div class="max-w-sm  overflow-hidden">
                        <a :href="baseUrl + '/' +article.url" class="no-underline text-black">
                            <img class="w-full" v-bind:src="article.feature_img_medium_url" :alt="article.title">
                            <div class="py-4">
                                <div class="font-bold text-xl mb-2 article-title capitalize">{{ article.title }}</div>
                                <div class="text-grey-darker text-base" v-html="article.body.replace(/^(.{150}[^\s]*).*/, '$1') + '\n'"></div>
                            </div>
                        </a>
                        <div class="py-4">
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2" v-for="tag in article.tags">#{{tag.name}}</span>
                        </div>
                    </div>
                </div>

                <div class="w-1/3 px-2">
                    <div v-for="(article, index) in articles" v-if="index !== 0 && index !== 4" class="flex items-center mb-5">
                        <img v-bind:src="article.feature_img_small_url" :alt="article.title" class="w-32 h-32  mr-4">
                        <div class="h-32 flex-1 flex-col items-end">
                            <div class="text-xl mb-6">
                                <a :href="baseUrl + '/' +article.url" class="no-underline text-black">
                                    <h3 class="text-black text-base leading-none leading-tight capitalize">{{ article.title }}</h3>
                                </a>
                            </div>
                            <div class="text-sm mt-10">
                                <p class="text-black leading-none">{{ article.author.name}}</p>
                                <p class="text-grey-dark mt-1">{{ article.date}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-for="(article, index) in articles" class="w-1/3 px-2" v-if="index === 4">
                    <div class="max-w-sm  overflow-hidden">
                        <a :href="baseUrl + '/' +article.url" class="no-underline text-black">
                            <img class="w-full" v-bind:src="article.feature_img_medium_url" :alt="article.title">
                            <div class="py-4">
                                <div class="font-bold text-xl mb-2 capitalize">{{ article.title }}</div>
                                <div class="text-grey-darker text-base" v-html="article.body.replace(/^(.{150}[^\s]*).*/, '$1') + '\n'"></div>
                            </div>
                        </a>
                        <div class="py-4">
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2" v-for="tag in article.tags">#{{tag.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- display on small screens -->
        <div class="sm:container sm:mb-5 sm:mt-5 lg:hidden px-5" v-if="first_article">
            <div class="max-w  overflow-hidden">
                <a :href="baseUrl + '/' +first_article.url" class="no-underline text-black">
                    <img class="w-full" :src="first_article.feature_img_large_url" :alt="first_article.title">
                    <div class="py-4">
                        <div class="font-bold text-xl mb-2 capitalize">{{ first_article.title }}</div>
                        <div class="text-grey-darker text-base" v-html="first_article.body.replace(/^(.{150}[^\s]*).*/, '$1') + '\n'"></div>
                    </div>
                </a>
                <div class="py-4">
                    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2" v-for="tag in first_article.tags">#{{tag.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                articles: [],
                first_article: null,
                baseUrl: this.$root.baseUrl
            }
        },
        created () {
            console.log('home-hero-section created')
            this.fetchArticles()
        },
        methods: {
            fetchArticles () {
                fetch('api/articles/home-hero-features')
                    .then(response => response.json())
                    .then(response => {
                        this.articles = response.data
                        this.first_article = response.data[0]
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>