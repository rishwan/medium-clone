<template>
    <div>
        <!-- display on large screens -->
        <div class="lg:block container lg:mb-5 lg:mt-5 lg:mb-5 hidden border-b pb-5 ">
            <div class="flex -mx-2">

                <div class="w-2/3 px-2">
                    <div class="flex-col items-center mb-5" v-for="( topic, index ) in topics" v-if="index !== 2">
                        <h3 class="uppercase border-b pb-5 my-5 block">{{ topic.title }}</h3>
                        <div class="flex items-center mb-5" v-for="( article, index ) in topic.featured_articles">
                            <a :href="article.url" class="no-underline text-black">
                                <img :src="article.feature_img_small_url" :alt="article.title" class="w-32 h-32  mr-4">
                            </a>
                            <div class="h-32">
                                <div class="text-xl mb-6">
                                    <a :href="article.url" class="no-underline text-black">
                                        <h3 class="text-black text-base leading-none leading-tight capitalize">{{ article.title }}}</h3>
                                    </a>
                                </div>
                                <div class="text-sm mt-10">
                                    <p class="text-black leading-none">Jonathan Reinink</p>
                                    <p class="text-grey-dark mt-1">Aug 18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 px-2">
                    <div class="flex-col items-center mb-5" v-for="( topic, index ) in topics" v-if="index === 2">
                        <div class="h-24 mb-5" v-for="(article, index) in topic.featured_articles">
                            <div class="text-xl mb-0">
                                <a :href="article.url" class="no-underline text-black">
                                    <h3 class="text-black text-base leading-none leading-tight capitalize">{{ article.title }}</h3>
                                </a>
                            </div>
                            <div class="text-sm mt-2">
                                <p class="text-black leading-none">Jonathan Reinink</p>
                                <p class="text-grey-dark mt-1">Aug 18</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- display on small screens -->
        <div class="sm:container sm:mb-5 sm:mt-5 lg:hidden px-5">

            <div class="flex-col items-center mb-5" v-for="( topic, index ) in topics">
                <h3 class="uppercase border-b pb-5 my-5 block">{{ topic.title }}</h3>
                <div class="flex items-center mb-5" v-for="( article, index ) in topic.featured_articles">
                    <a :href="article.url" class="no-underline text-black">
                        <img :src="article.feature_img_small_url" :alt="article.title" class="w-32 h-32  mr-4">
                    </a>
                    <div class="h-32">
                        <div class="text-xl mb-6">
                            <a :href="article.url" class="no-underline text-black">
                                <h3 class="text-black text-base leading-none leading-tight capitalize">{{ article.title }}}</h3>
                            </a>
                        </div>
                        <div class="text-sm mt-10">
                            <p class="text-black leading-none">Jonathan Reinink</p>
                            <p class="text-grey-dark mt-1">Aug 18</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
    export default {
        data () {
            return {
                topics: []
            }
        },
        created () {
            console.log('home-topic-features created')
            this.fetchArticles()
        },
        methods: {
            fetchArticles () {
                fetch('api/articles/featured-articles/all')
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        this.topics = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>