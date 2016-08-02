import {bootstrap}    from '@angular/platform-browser-dynamic';
import {RootComponent} from "./root.component";
import {APP_ROUTER_PROVIDERS} from "./routes";
import {HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';


bootstrap(RootComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]).catch((err: any) => console.error(err));
