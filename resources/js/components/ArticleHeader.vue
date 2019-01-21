<template>
    <article v-if="article">
        <div class="border-b border-2-border-grey main-menu">
            <!-- Header -->
            <div class="container">
                <nav class="px-4 md:px-0 flex items-center justify-between mx-auto">
                    <ul class="list-reset flex items-center">
                        <li class="mr-5 py-5 pr-5 border-r font-bold">
                            Brand
                        </li>
                        <li class="capitalize font-medium text-grey" >
                            {{ article.topic.title }}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- Article Title / Image (Desktop) -->
        <div class="container my-10">
            <div class="">
                <div class="flex -mx-2">
                    <div class="w-2/5 px-2">
                        <h3 class="capitalize text-3xl leading-normal font-serif">{{article.title}}</h3>
                        <h4 class="capitalize text-xl leading-normal text-grey font-light mt-5 font-serif">{{article.tag_line}}</h4>

                        <p class="text-sm text-grey mt-16">Author Name</p>
                    </div>
                    <div class="w-3/5 px-2">
                        <img class="w-full" :src="article.feature_img_large_url" :alt="article.title">
                    </div>
                </div>
            </div>
        </div>
        <!-- Article Title / Image (Desktop) -->

        <!-- Article Body (Desktop) -->
        <div class="container my-10">
            <div class="flex -mx-2">
                <div class="w-4/5 px-2">
                    <p v-for="paragraph in body" class="text-grey-darker font-serif text-xl leading-normal my-5">{{paragraph}}</p>
                </div>
            </div>

        </div>
        <!-- Article Body (Desktop) -->

    </article>


</template>

<script>
    export default {
        data () {
            return {
                article_id: null,
                topic_title: null,
                article: null,
                body: null
            }
        },
        created () {
            console.log('topic header loaded')
            this.article_id = window.location.href.split('/').pop();
            this.fetchArticle(this.article_id)
        },
        methods: {
            fetchArticle(article_id) {
                fetch(this.$root.baseUrl + '/api/article/' + article_id)
                    .then(response => response.json())
                    .then(response => {
                        this.topic_title = response.data.topic.title
                        this.article = response.data
                        this.body = JSON.parse(response.data.body)
                    })
            }
        }
    }
</script>