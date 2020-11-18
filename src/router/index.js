import Vue from 'vue';
import Router from 'vue-router';
import dragger from '@/views/sortable/vueDragger';
import content from '@/views/sortable/content';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'dragger',
            component: dragger
        },
        {
            path: '/content/:id',
            name: 'vueDraggerContent',
            component: content
        }
    ]
});
