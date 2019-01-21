<template>
    <div class="w-full px-2 mb-5">
        <div class="overflow-hidden " v-if="article">
            <h3 class="text-black text-base leading-none leading-tight my-5">FEATURED</h3>
            <a :href="baseUrl + '/' +article.url" class="no-underline text-black">
                <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
                <div class="py-4">
                    <div class="font-bold text-xl mb-2 capitalize">{{ article.title }}</div>
                    <p class="text-grey-darker text-base">
                        {{ article.body[0].replace(/^(.{150}[^\s]*).*/, "$1") + "\n" }}
                    </p>
                </div>
            </a>
            <div class="py-4">
                <p class="text-grey-darker text-sm font-medium mb-5">Author Name</p>
                <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#photography</span>
                <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#travel</span>
                <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#winter</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                topic_title: null,
                article: null,
                baseUrl: this.$root.baseUrl
            }
        },
        created () {
            console.log('topic feature loaded')
            this.topic_title = window.location.href.split('/').pop();
            this.fetchFeaturedArticle(this.topic_title)
        },
        methods: {
            fetchFeaturedArticle(title){
                fetch(this.$root.baseUrl + '/api/topic/'+ title +'/featured-article')
                    .then(response => response.json())
                    .then(response => {
                        this.article = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>