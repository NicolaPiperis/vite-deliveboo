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
            path: '/dishes/:id',
            name: 'DishesShow',
            component: () => import('./router-view/DishesShow.vue')
        }

    ]
});

export { router };