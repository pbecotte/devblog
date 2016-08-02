import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {EntryService} from "../models/entry.service";
import {NavService} from "../models/nav.service";
import {NavEntry, NavRequest} from "../models/nav";

@Component({
    selector: 'my-app',
    templateUrl: '/angular/app/root/root.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [EntryService, NavService]
})
export class RootComponent {
    
    private messages:string[];
    private extraNav:NavEntry[];
    
    constructor (
        private entryService: EntryService,
        private navService: NavService
    ) {
        this.messages = [];
        this.extraNav = [];
         entryService.messageFlashed$.subscribe(
             messages => this.messages.push.apply(this.messages, messages));
        navService.navEntry$.subscribe(entry => this.updateNav(entry))
    }

    ackMessage(message: string) {
        var index = this.messages.indexOf(message);
        this.messages.splice(index, 1);
    }

    updateNav(req: NavRequest) {
        if (req.add) {this.extraNav.push(req.entry)}
        else {this.extraNav.splice(this.extraNav.indexOf(req.entry), 1)}
    }
}
