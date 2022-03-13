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
        {
            path: '/',
            component: ArticlesList,
            name: 'Home',
            meta: {
                ruName: 'Главная'
            }
        },
        {
            path: '/article/:id',
            component: TheArticle,
            name: 'TheArticle',
            meta: {
                ruName: 'Просмотр статьи'
            }
        },
        {
            path: '/create',
            component: CreateArticle,
            name: 'CreateArticle',
            meta: {
                ruName: 'Создание статьи',
                needAuth: true
            }
        },
        {
            path: '/edit/:id',
            component: EditArticle,
            name: 'EditArticle',
            meta: {
                ruName: 'Редактор статьи',
                needAuth: true
            }
        },
        {
            path: '/authentication',
            component: Authentication,
            name: 'Authentication',
            meta: {
                ruName: 'Авторизация'
            }
        },
        {
            path: '/registration',
            component: Registration,
            name: 'Registration',
            meta: {
                ruName: 'Регистрация'
            }
        },

        {
            path: '/profile',
            component: TheProfile,
            name: 'Profile',
            redirect: '/profile/user',
            meta: {
                ruName: 'Профиль',
                needAuth: true,
                testParent: 'parent'
            },
            children: [
                {
                    path: 'user',
                    component: ProfileUserData,
                    name: 'ProfileUserData',
                    meta: {
                        ruName: 'Ваши данные',
                    },
                },
                {
                    path: 'favorites',
                    component: ProfileFavorites,
                    name: 'ProfileFavorites',
                    meta: {
                        ruName: 'Избранное',
                    },
                },
                {
                    path: 'articles',
                    component: ProfileArticles,
                    name: 'ProfileArticles',
                    meta: {
                        ruName: 'Список ваших статей',
                    },
                },
                {
                    path: 'archive',
                    component: ProfileArchive,
                    name: 'ProfileArchive',
                    meta: {
                        ruName: 'Список ваших архивных статей',
                    },
                },
            ]
        },
    ],
});

router.beforeEach((to, from, next) => {

    const tokenIsExpired = new Date().getTime() > store.getters.expireTime;
    const nextPageNeedAuth = to.meta.needAuth;

    if (tokenIsExpired && nextPageNeedAuth) {

        store.dispatch('notify/show', {
            text: 'Требуется авторизация',
            type: 'warning',
            hideAfter: 2000
        });

        if (store.getters.isAuth) store.dispatch('logout');

        next({name: 'Authentication'});

        return;
    }

    next();

});

export default router;
