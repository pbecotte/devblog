import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Entry} from "../models/entry";
import {Subscription} from "rxjs/Subscription";
import {EntryService} from "../models/entry.service";
import {Safe} from "../root/safe";
import {NavService} from "../models/nav.service";
import {NavEntry} from "../models/nav";
import {HeaderService} from "../models/header.service";


@Component({
    selector: 'blogDetail',
    templateUrl: '/angular/app/blogDetail/blogDetail.component.html',
    pipes: [Safe],
})
export class BlogDetailComponent implements OnInit, OnDestroy {

    entrySlug:string;
    entry:Entry;
    image:string;
    sub:Subscription;
    nav:NavEntry;

    constructor(
        private route:ActivatedRoute,
        private entryService:EntryService,
        private navService:NavService,
        private headerService:HeaderService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.entrySlug = params['slug'];
            this.getEntry(this.entrySlug);
        });
        this.nav = {title: 'Edit Post', dest: []};
        this.navService.navEntry$.emit({add: true, entry: this.nav})
    }

    ngOnDestroy() {
        if (this.sub) {this.sub.unsubscribe()}
        this.navService.navEntry$.emit({add: false, entry: this.nav});
        this.headerService.clearHeader();
    }
    
    getEntry(slug:string) {
        this.entryService.getEntryDetail(slug).then(data => {
            this.entry = data.entry;
            this.image = data.image;
            this.nav.dest = ['/angular/entry', data.entry.slug, '/edit'];
            this.headerService.updateHeader({
                title: this.entry.title,
                subhead: this.entry.tagline,
                image: this.image});
        })
    }
}
