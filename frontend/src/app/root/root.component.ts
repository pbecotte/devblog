import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {EntryService} from "../models/entry.service";
import {NavService} from "../models/nav.service";
import {HeaderService} from "../models/header.service";
import {SafeStyle} from "./safe";
import {MessageService} from "../messages/messages.service";
import {AuthService} from "../auth/auth.service";
import {CommentService} from "../blogComment/blogComment.service";


@Component({
    selector: 'my-app',
    templateUrl: 'app/root/root.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EntryService, NavService, HeaderService, CommentService],
    pipes: [SafeStyle]
})
export class RootComponent {

    constructor(private messageService: MessageService,
                private navService: NavService,
                private headerService: HeaderService,
                private authService: AuthService) {
    }
}
