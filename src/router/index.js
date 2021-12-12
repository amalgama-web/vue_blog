import { createRouter, createWebHistory } from 'vue-router'

import Article from '../views/Article';
import CreateArticle from '../views/CreateArticle';
import ArticlesList from '../views/ArticlesList';
import EditArticle from '../views/EditArticle';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: ArticlesList, name: 'Home' },
    { path: '/article/:id', component: Article, name: 'Article' },
    { path: '/create', component: CreateArticle, name: 'CreateArticle' },
    { path: '/edit/:id', component: EditArticle, name: 'EditArticle' },
  ],
});


export default router
