import {bootstrap}    from '@angular/platform-browser-dynamic';
import {RootComponent} from "./root.component";
import {APP_ROUTER_PROVIDERS} from "./routes";
import {HTTP_PROVIDERS} from '@angular/http';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {LoggedInGuard} from "../auth/logged-in.guard";
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../messages/messages.service";
import {StatusService} from "../paulStatus/paulStatus.service";


bootstrap(RootComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    LoggedInGuard,
    AuthService,
    MessageService,
    StatusService
]).catch((err: any) => console.error(err));
