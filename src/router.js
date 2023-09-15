import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'AppHome',
            component: () => import('./router-view/AppHome.vue')
        },

        {
            path: '/dishes/:id',
            name: 'DishesShow',
            component: () => import('./router-view/DishesShow.vue')
        },

        {
            path: '/order',
            name: 'Payment',
            component: () => import('./router-view/Payment.vue')
        }
    ]
});

export { router };