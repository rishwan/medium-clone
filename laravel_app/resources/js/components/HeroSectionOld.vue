<template>
    <div>
        <!-- display on large screens -->
        <div class="lg:block container lg:mb-5 lg:mt-5 lg:mb-5 hidden border-b pb-5">
            <div class="flex -mx-2">
                <!--
                <div class="w-1/3 px-2">
                    <div class="max-w-sm  overflow-hidden">
                        <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                        <div class="py-4">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-grey-darker text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div class="py-4">
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 px-2">
                    <div class="flex items-center mb-5">
                        <img src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink" class="w-32 h-32  mr-4">
                        <div class="h-32">
                            <div class="text-xl mb-6">
                                <h3 class="text-black text-base leading-none leading-tight">The Gillette Effect: What a Single Ad Reveals About American Men</h3>
                            </div>
                            <div class="text-sm mt-10">
                                <p class="text-black leading-none">Jonathan Reinink</p>
                                <p class="text-grey-dark mt-1">Aug 18</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center mb-5">
                        <img src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink" class="w-32 h-32  mr-4">
                        <div class="h-32">
                            <div class="text-xl mb-6">
                                <h3 class="text-black text-base leading-none leading-tight">The Gillette Effect: What a Single Ad Reveals About American Men</h3>
                            </div>
                            <div class="text-sm mt-10">
                                <p class="text-black leading-none">Jonathan Reinink</p>
                                <p class="text-grey-dark mt-1">Aug 18</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <img src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg" alt="Avatar of Jonathan Reinink" class="w-32 h-32  mr-4">
                        <div class="h-32">
                            <div class="text-xl mb-6">
                                <h3 class="text-black text-base leading-none leading-tight">The Gillette Effect: What a Single Ad Reveals About American Men</h3>
                            </div>
                            <div class="text-sm mt-10">
                                <p class="text-black leading-none">Jonathan Reinink</p>
                                <p class="text-grey-dark mt-1">Aug 18</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-1/3 px-2">
                    <div class="max-w-sm  overflow-hidden ">
                        <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                        <div class="py-4">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-grey-darker text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div class="py-4">
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
                        </div>
                    </div>
                </div>
                -->
                <div v-for="(article, index) in articles" class="w-1/3 px-2" v-if="index === 0">
                    <div class="max-w-sm  overflow-hidden">
                        <a :href="article.url" class="no-underline text-black">
                            <img class="w-full" v-bind:src="article.feature_img_medium_url" :alt="article.title">
                            <div class="py-4">
                                <div class="font-bold text-xl mb-2 article-title capitalize">{{ article.title }}</div>
                                <p class="text-grey-darker text-base">
                                    {{ article.body.replace(/^(.{150}[^\s]*).*/, "$1") + "\n" }}
                                </p>
                            </div>
                        </a>
                        <div class="py-4">
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
                        </div>
                    </div>
                </div>

                <div class="w-1/3 px-2">
                    <div v-for="(article, index) in articles" v-if="index !== 0 && index !== 4" class="flex items-center mb-5">
                        <img v-bind:src="article.feature_img_small_url" :alt="article.title" class="w-32 h-32  mr-4">
                        <div class="h-32 flex-1 flex-col items-end">
                            <div class="text-xl mb-6">
                                <a :href="article.url" class="no-underline text-black">
                                    <h3 class="text-black text-base leading-none leading-tight capitalize">{{ article.title }}</h3>
                                </a>
                            </div>
                            <div class="text-sm mt-10">
                                <p class="text-black leading-none">Jonathan Reinink</p>
                                <p class="text-grey-dark mt-1">Aug 18</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-for="(article, index) in articles" class="w-1/3 px-2" v-if="index === 4">
                    <div class="max-w-sm  overflow-hidden">
                        <a :href="article.url" class="no-underline text-black">
                            <img class="w-full" v-bind:src="article.feature_img_medium_url" :alt="article.title">
                            <div class="py-4">
                                <div class="font-bold text-xl mb-2 capitalize">{{ article.title }}</div>
                                <p class="text-grey-darker text-base">
                                    {{ article.body[0].replace(/^(.{150}[^\s]*).*/, "$1") + "\n" }}
                                </p>
                            </div>
                        </a>
                        <div class="py-4">
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- display on small screens -->
        <div class="sm:container sm:mb-5 sm:mt-5 lg:hidden px-5" v-if="first_article">
            <div class="max-w  overflow-hidden">
                <a :href="first_article.url" class="no-underline text-black">
                    <img class="w-full" :src="first_article.feature_img_large_url" :alt="first_article.title">
                    <div class="py-4">
                        <div class="font-bold text-xl mb-2 capitalize">{{ first_article.title }}</div>
                        <p class="text-grey-darker text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                </a>
                <div class="py-4">
                    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
                    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                    <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
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
                first_article: null
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