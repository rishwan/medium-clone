<template>
    <div class="border-b border-2-border-grey main-menu">
        <div class="container">
            <nav class="px-4 md:px-0 flex items-center justify-between mx-auto">
                <ul class="list-reset flex items-center">
                    <li class="mr-5 py-1 pr-5 border-r font-bold">
                        <a :href="baseUrl" class="text-black no-underline">
                            <img :src="baseUrl+'/mindvalley.png'" class="h-10"/>
                        </a>
                    </li>
                    <li v-for="link in links" v-bind:key="link.id" class="mr-10 py-5">
                        <a v-bind:key="link.id" class="no-underline text-grey hover:text-green-darker font-serif capitalize" :href="baseUrl + '/' +link.url">{{ link.title }}</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                links: [],
                baseUrl: this.$root.baseUrl
            }
        },
        created () {
            console.log('main-menu created')
            this.fetchTopics();
        },
        methods: {
            fetchTopics () {
                fetch(this.baseUrl+'/api/topics')
                    .then(response => response.json())
                    .then(response => {
                        this.links = response.data;
                    })
            }
        }
    }
</script>

<style scoped>
    ul {
        overflow-y:hidden;
        overflow-x: scroll;
    }

</style>