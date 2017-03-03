import {provideRouter, RouterConfig}  from '@angular/router';
import {BlogIndexComponent} from "../blogIndex/blogIndex.component";
import {BlogDetailComponent} from "../blogDetail/blogDetail.component";
import {BlogEditFormComponent} from "../blogEdit/blogEditForm.component";
import {LoggedInGuard} from "../auth/logged-in.guard";
import {LoginComponent} from "../auth/login.component";
import {SignupComponent} from "../auth/signup.component";
import {PaulStatusComponent} from "../paulStatus/paulStatus.component";


const routes:RouterConfig = [
    {
        path: '',
        component: BlogIndexComponent,
        data: {drafts: false}
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'entry/:slug',
        component: BlogDetailComponent
    },
    {
        path: 'drafts',
        component: BlogIndexComponent,
        data: {drafts: true},
        canActivate: [LoggedInGuard],
    },
    {
        path: 'entry/:slug/edit',
        component: BlogEditFormComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: 'create',
        component: BlogEditFormComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: 'status',
        component: PaulStatusComponent,
        canActivate: [LoggedInGuard],
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
