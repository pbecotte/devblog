import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {EntryService} from "../models/entry.service";
import {NavService} from "../models/nav.service";
import {NavEntry, NavRequest} from "../models/nav";
import {HeaderService, Header} from "../models/header.service";
import {SafeStyle} from "./safe";

@Component({
    selector: 'my-app',
    templateUrl: '/angular/app/root/root.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EntryService, NavService, HeaderService],
    pipes: [SafeStyle]
})
export class RootComponent implements OnInit, OnDestroy{
    
    private messages:string[];
    private extraNav:NavEntry[];
    private header:Header;
    private basicHeader:Header;
    
    constructor (
        private entryService: EntryService,
        private navService: NavService,
        private headerService: HeaderService
    ) {
        this.messages = [];
        this.extraNav = [];
         entryService.messageFlashed$.subscribe(
             messages => this.messages.push.apply(this.messages, messages));
                this.basicHeader = {
            title: "Paul Becotte",
            subhead: "A Python/Devops guy's personal blog",
            image: '/static/img/home-bg.jpg',
        };
        this.header = this.basicHeader;
        this.headerService.jimmy = 'hi'
    }

    ngOnInit() {
        console.log('launching root');
        this.navService.navEntry$.subscribe(entry => this.updateNav(entry));
        this.headerService.header$.subscribe(header => this.updateHeader(header));
        this.headerService.clearHeader$.subscribe(_ => this.clearHeader());
    }

    ackMessage(message: string) {
        var index = this.messages.indexOf(message);
        this.messages.splice(index, 1);
    }

    updateNav(req: NavRequest) {
        if (req.add) {this.extraNav.push(req.entry)}
        else {this.extraNav.splice(this.extraNav.indexOf(req.entry), 1)}
    }

    updateHeader(header: Header) {
        console.log('this happened!');
        this.header = header;
    }

    clearHeader() {
        this.header = this.basicHeader;
    }
}
