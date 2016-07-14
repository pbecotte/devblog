import {provideRouter, RouterConfig}  from '@angular/router';
import {BlogIndexComponent} from "../blogIndex/blogIndex.component";
import {BlogDetailComponent} from "../blogDetail/blogDetail.component";


const routes:RouterConfig = [
    {
        path: 'angular',
        component: BlogIndexComponent
    },
    {
        path: 'angular/entry/:slug',
        component: BlogDetailComponent
    }
    
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
