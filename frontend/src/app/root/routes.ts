import {provideRouter, RouterConfig}  from '@angular/router';
import {BlogIndexComponent} from "../blogIndex/blogIndex.component";
import {BlogDetailComponent} from "../blogDetail/blogDetail.component";
import {BlogEditFormComponent} from "../blogEdit/blogEditForm.component";


const routes:RouterConfig = [
    {
        path: 'angular',
        component: BlogIndexComponent,
        data: {drafts: false}
    },
    {
        path: 'angular/entry/:slug',
        component: BlogDetailComponent
    },
    {
        path: 'angular/drafts',
        component: BlogIndexComponent,
        data: {drafts: true}
    },
    {
        path: 'angular/entry/:slug/edit',
        component: BlogEditFormComponent
    },
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
