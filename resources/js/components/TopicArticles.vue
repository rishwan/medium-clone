<template>
    <div>
        <h3 class="text-black text-xl leading-none leading-tight mt-5 mb-5 capitalize pb-2 border-b block">Latest</h3>


        <div class="px-2 my-4" v-if="articles" v-for="article in articles">
            <div class="flex justify-between -mx-2">
                <div class="w-4/5 ">
                    <a :href="article.url" class="no-underline text-black">
                        <h3 class="text-black text-base leading-none leading-tight capitalize mb-2">{{article.title}}</h3>
                    </a>
                    <div class="text-grey-darker text-base w-2/3">
                        {{ article.body[0].replace(/^(.{150}[^\s]*).*/, "$1") + "\n" }}
                    </div>
                    <p class="text-grey-darker text-sm font-medium mt-5 block">Author Name</p>
                </div>
                <div class="w-1/5 pl-2">
                    <a :href="article.url" class="no-underline text-black">
                        <img :src="article.feature_img_small_url" :alt="article.title" class="w-32 h-32  ml-4">
                    </a>
                </div>
            </div>
        </div>


        <!--
        <div class="mb-5" v-if="articles">
            <div class="flex w-full justify-between mb-5" v-for="article in articles">
                <div class="h-32">
                    <div class="text-xl mb-6">
                        <a :href="article.url" class="no-underline text-black">
                            <h3 class="text-black text-base leading-none leading-tight capitalize mb-2">{{article.title}}</h3>
                        </a>
                        <div class="text-grey-darker text-base w-2/3">
                            {{ article.body[0].replace(/^(.{150}[^\s]*).*/, "$1") + "\n" }}
                        </div>
                    </div>
                    <div class="text-sm mt-10">
                        <p class="text-black leading-none">Jonathan Reinink</p>
                        <p class="text-grey-dark mt-1">Aug 18</p>
                    </div>
                </div>
                <a :href="article.url" class="no-underline text-black">
                    <img :src="article.feature_img_small_url" :alt="article.title" class="w-32 h-32  ml-4">
                </a>
            </div>
        </div>
        -->
    </div>
</template>

<script>
    export default {
        data () {
            return {
                articles: []
            }
        },
        created () {
            console.log('topic articles created')
            let topic_title = window.location.href.split('/').pop();

            this.fetchTopicArticles(topic_title)
        },
        methods: {
            fetchTopicArticles (topic_title) {
                fetch(this.$root.baseUrl+'/api/topic/'+topic_title+'/articles/index')
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        this.articles = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>