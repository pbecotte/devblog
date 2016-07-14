import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: '/angular/app/root/root.component.html',
    directives: [ROUTER_DIRECTIVES],
})
export class RootComponent {
}
