import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Entry, EntryService} from "../models/entry.service";
import {Safe} from "../root/safe";
import {NavService} from "../models/nav.service";
import {HeaderService} from "../models/header.service";
import {BlogCommentComponent} from "../blogComment/blogComment.component";
import {AuthService} from "../auth/auth.service";


@Component({
    selector: 'blogDetail',
    templateUrl: 'app/blogDetail/blogDetail.component.html',
    directives: [BlogCommentComponent],
    pipes: [Safe],
})
export class BlogDetailComponent implements OnInit, OnDestroy {

    entrySlug:string;
    entry:Entry;
    image:string;
    sub:Subscription;

    constructor(
        private route:ActivatedRoute,
        private entryService:EntryService,
        private navService:NavService,
        private headerService:HeaderService,
        private authService:AuthService
    ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.entrySlug = params['slug'];
            this.getEntry(this.entrySlug);
        });
    }

    ngOnDestroy() {
        if (this.sub) {this.sub.unsubscribe()}
        this.navService.removeEdit();
        this.headerService.clearHeader();
    }
    
    getEntry(slug:string) {
        this.entryService.getEntryDetail(slug).then(data => {
            this.entry = data.entry;
            this.image = data.image;
            this.headerService.updateHeader({
                title: this.entry.title,
                subhead: this.entry.tagline,
                image: this.image
            });
            if (this.authService.admin()) {
                this.navService.addEdit(data.entry.slug);
            }
        })
    }
}
