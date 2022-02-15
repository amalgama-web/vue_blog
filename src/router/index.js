import { createRouter, createWebHistory } from 'vue-router'

import TheArticle from '../views/TheArticle';
import CreateArticle from '../views/CreateArticle';
import ArticlesList from '../views/ArticlesList';
import EditArticle from '../views/EditArticle';
import AuthPage from '../views/AuthPage';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: ArticlesList, name: 'Home' },
    { path: '/article/:id', component: TheArticle, name: 'TheArticle' },
    { path: '/create', component: CreateArticle, name: 'CreateArticle' },
    { path: '/edit/:id', component: EditArticle, name: 'EditArticle' },
    { path: '/auth', component: AuthPage, name: 'Auth' },
  ],
});


export default router
