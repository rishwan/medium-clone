
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

//require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('single-article', require('./components/SingleArticle.vue').default);
Vue.component('main-menu', require('./components/MainMenu.vue').default);
Vue.component('hero-section', require('./components/HeroSection').default);
Vue.component('home-topic-features', require('./components/HomeTopicsFeatures').default);
Vue.component('topic-header', require('./components/TopicHeader.vue').default);
Vue.component('topic-feature-article', require('./components/TopicFeatureArticle').default);
Vue.component('topic-details', require('./components/TopicDetails').default);
Vue.component('topic-articles', require('./components/TopicArticles').default);
Vue.component('article-header', require('./components/ArticleHeader').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        baseUrl: Laravel.baseUrl,
        topic_title: Laravel.topic_title
    }
});
