<template>
    <div class="w-full lg:px-2 border-b" v-if="topic">
        <div class="overflow-hidden " >
            <h3 class="text-black text-3xl leading-none leading-tight mt-5 mb-1 capitalize">{{ topic.title }}</h3>

            <div class="pb-4">
                <p class="text-grey text-base capitalize">
                    {{ topic.tag_line }}
                </p>
            </div>
            <div class="pb-4">
                <h3 class="text-black block border-b pb-5 mb-5 text-sm mt-10">RELATED TOPICS</h3>
                <ul class="list-reset">
                    <li v-for="s_topic in topic.similar_topics" class="block my-2"><a :href="baseUrl+'/'+s_topic.url" class="no-underline text-grey uppercase text-sm">{{ s_topic.title }}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                topic_title: null,
                topic: null,
                similar_topics: [],
                baseUrl: this.$root.baseUrl
            }
        },
        created () {
            console.log('topic detail created')
            this.topic_title = window.location.href.split('/').pop();
            this.fetchTopicDetails()
        },
        methods: {
            fetchTopicDetails () {
                fetch(this.$root.baseUrl + '/api/topic/' + this.topic_title + '/show')
                    .then(response => response.json())
                    .then(response => {
                        this.topic = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>