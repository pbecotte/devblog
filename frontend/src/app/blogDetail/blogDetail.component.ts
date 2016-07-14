import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Entry} from "../models/entry";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'blogDetail',
    templateUrl: '/angular/app/blogDetail/blogDetail.component.html',
})
export class BlogDetailComponent implements OnInit, OnDestroy {

    entrySlug:string;
    entry:Entry;
    sub:Subscription;

    constructor(private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.entrySlug = params['slug'];
            this.getEntry(this.entrySlug)
        });
    }

    ngOnDestroy() {
        if (this.sub) {this.sub.unsubscribe()}
    }
    
    getEntry(slug:string) {
        this.entry = {
            id: 1,
            title: 'first post',
            slug: 'first',
            tagline: 'always one',
            html_content: 'blog post',
            published: true,
            timestamp: '2016-1-1 12:00:00',
            image: 'fakeurl.example',
        }
    }

}
