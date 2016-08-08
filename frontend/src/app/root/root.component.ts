import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {EntryService} from "../models/entry.service";
import {NavService} from "../models/nav.service";
import {HeaderService, Header} from "../models/header.service";
import {SafeStyle} from "./safe";


@Component({
    selector: 'my-app',
    templateUrl: '/angular/app/root/root.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EntryService, NavService, HeaderService],
    pipes: [SafeStyle]
})
export class RootComponent implements OnInit {

    private messages: string[];

    constructor(private entryService: EntryService,
                private navService: NavService,
                private headerService: HeaderService,
                private router: Router) {
        this.messages = [];
        entryService.messageFlashed$.subscribe(
            messages => this.messages.push.apply(this.messages, messages));

    }

    ngOnInit() {}

    ackMessage(message: string) {
        var index = this.messages.indexOf(message);
        this.messages.splice(index, 1);
    }


    updateHeader(header: Header) {
        this.header = header;
    }

    clearHeader() {
        this.header = this.basicHeader;
    }
}
