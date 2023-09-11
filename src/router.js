import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Card',
            component: () => import('./router-view/AppCard.vue')
        },

        {
            // path: '/projects/:id',
            // name: 'project-show',
            // component: () => import('./route-vue/ProjectShow.vue')
        }

    ]
});

export { router };