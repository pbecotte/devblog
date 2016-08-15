import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {EntryService} from "../models/entry.service";
import {NavService} from "../models/nav.service";
import {HeaderService} from "../models/header.service";
import {SafeStyle} from "./safe";
import {MessageService} from "../messages/messages.service";
import {AuthService} from "../auth/auth.service";


@Component({
    selector: 'my-app',
    templateUrl: '/angular/app/root/root.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EntryService, NavService, HeaderService],
    pipes: [SafeStyle]
})
export class RootComponent {

    constructor(private messageService: MessageService,
                private navService: NavService,
                private headerService: HeaderService,
                private authService: AuthService) {
    }
}
