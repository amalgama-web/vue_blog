import { createRouter, createWebHistory } from 'vue-router'

import TheArticle from '../views/TheArticle';
import CreateArticle from '../views/CreateArticle';
import ArticlesList from '../views/ArticlesList';
import EditArticle from '../views/EditArticle';
import Authentication from '../views/TheAuthentication';
import Registration from '../views/TheRegistration';

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
    { path: '/authentication', component: Authentication, name: 'Authentication' },
    { path: '/registration', component: Registration, name: 'Registration' },

    {
      path: '/profile',
      component: TheProfile,
      name: 'Profile',
      redirect: '/profile/user',
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
