import {createRouter, createWebHistory} from 'vue-router'
import store from "../store";

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
        {path: '/', component: ArticlesList, name: 'Home'},
        {path: '/article/:id', component: TheArticle, name: 'TheArticle'},
        {path: '/create', component: CreateArticle, name: 'CreateArticle'},
        {path: '/edit/:id', component: EditArticle, name: 'EditArticle'},
        {path: '/authentication', component: Authentication, name: 'Authentication'},
        {path: '/registration', component: Registration, name: 'Registration'},

        {
            path: '/profile',
            component: TheProfile,
            name: 'Profile',
            redirect: '/profile/user',
            children: [
                {path: '/profile/user', component: ProfileUserData, name: 'ProfileUserData'},
                {path: '/profile/favorites', component: ProfileFavorites, name: 'ProfileFavorites'},
                {path: '/profile/articles', component: ProfileArticles, name: 'ProfileArticles'},
                {path: '/profile/archive', component: ProfileArchive, name: 'ProfileArchive'},
            ]
        },
    ],
});

const routesWichNeedAuth = [
    'CreateArticle',
    'EditArticle',
    'Profile',
    'ProfileUserData',
    'ProfileFavorites',
    'ProfileArticles',
    'ProfileArchive',
];

router.beforeEach((to, from, next) => {

    const tokenIsExpired = new Date().getTime() > store.getters.expireTime;
    const nextPageNeedAuth = routesWichNeedAuth.includes(to.name);

    if (tokenIsExpired && nextPageNeedAuth) {

        store.dispatch('notify/show', {
            text: 'Требуется авторизация',
            type: 'warning',
            hideAfter: 2000
        });

        if(store.getters.isAuth) store.dispatch('logout');

        next({name: 'Authentication'});

        return;
    }

    next();

});

export default router;
