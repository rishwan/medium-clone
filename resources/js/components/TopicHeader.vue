<template>
    <div class="border-b border-2-border-grey main-menu">
        <div class="container">
            <nav class="px-4 md:px-0 flex items-center justify-between mx-auto">
                <ul class="list-reset flex items-center">
                    <li class="mr-5 py-5 pr-5 border-r font-bold">
                        <a :href="baseUrl" class="text-black no-underline">Brand</a>
                    </li>
                    <li class="capitalize font-medium text-grey">
                        {{ topic_title }}
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
                topic_title: null,
                baseUrl: this.$root.baseUrl
            }
        },
        created () {
            console.log('topic header loaded')
            this.topic_title = window.location.href.split('/').pop();
            console.log(this.topic_title)
        }
    }
</script>
