import { createRouter, createWebHistory } from 'vue-router'

import TheArticle from '../views/TheArticle.vue';
import CreateArticle from '../views/CreateArticle.vue';
import ArticlesList from '../views/ArticlesList.vue';
import EditArticle from '../views/EditArticle.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: ArticlesList, name: 'Home' },
    { path: '/article/:id', component: TheArticle, name: 'TheArticle' },
    { path: '/create', component: CreateArticle, name: 'CreateArticle' },
    { path: '/edit/:id', component: EditArticle, name: 'EditArticle' },
  ],
});


export default router
