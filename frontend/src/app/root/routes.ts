import {provideRouter, RouterConfig}  from '@angular/router';
import {BlogIndexComponent} from "../blogIndex/blogIndex.component";
import {BlogDetailComponent} from "../blogDetail/blogDetail.component";
import {BlogEditFormComponent} from "../blogEdit/blogEditForm.component";
import {LoggedInGuard} from "../auth/logged-in.guard";
import {LoginComponent} from "../auth/login.component";


const routes:RouterConfig = [
    {
        path: 'angular',
        component: BlogIndexComponent,
        data: {drafts: false}
    },
    {
        path: 'angular/login',
        component: LoginComponent,
    },
    {
        path: 'angular/entry/:slug',
        component: BlogDetailComponent
    },
    {
        path: 'angular/drafts',
        component: BlogIndexComponent,
        data: {drafts: true},
        canActivate: [LoggedInGuard],
    },
    {
        path: 'angular/entry/:slug/edit',
        component: BlogEditFormComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: 'angular/create',
        component: BlogEditFormComponent,
        canActivate: [LoggedInGuard],
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
