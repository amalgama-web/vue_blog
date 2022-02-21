import { createRouter, createWebHistory } from 'vue-router'

import TheArticle from '../views/TheArticle';
import CreateArticle from '../views/CreateArticle';
import ArticlesList from '../views/ArticlesList';
import EditArticle from '../views/EditArticle';
import AuthPage from '../views/AuthPage';

import TheProfile from '../views/TheProfile';
import ProfileArticles from '../components/profile/ProfileArticles';
import ProfileArchive from '../components/profile/ProfileArchive';
import ProfileUserData from '../components/profile/ProfileUserData';
import ProfileFavorites from "../components/profile/ProfileFavorites";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: '/', component: ArticlesList, name: 'Home' },
    { path: '/article/:id', component: TheArticle, name: 'TheArticle' },
    { path: '/create', component: CreateArticle, name: 'CreateArticle' },
    { path: '/edit/:id', component: EditArticle, name: 'EditArticle' },
    { path: '/auth', component: AuthPage, name: 'Auth' },

    {
      path: '/profile',
      component: TheProfile,
      name: 'Profile',
      children: [
        { path: '/profile/user', component: ProfileUserData, name: 'ProfileUserData' },
        { path: '/profile/favorites', component: ProfileFavorites, name: 'ProfileFavorites' },
        { path: '/profile/articles', component: ProfileArticles, name: 'ProfileArticles' },
        { path: '/profile/archive', component: ProfileArchive, name: 'ProfileArchive' },
      ]
    },
  ],
});


export default router
