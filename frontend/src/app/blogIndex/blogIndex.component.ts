import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Entry} from "../models/entry";
import {EntryService} from "../models/entry.service";


@Component({
    selector: 'blogIndex',
    templateUrl: '/angular/app/blogIndex/blogIndex.component.html',
})
export class BlogIndexComponent implements OnDestroy, OnInit {

    entries:Entry[];
    sub:any;

    constructor(private router:Router,
                private activatedRoute:ActivatedRoute,
                private entryService:EntryService) {
    }

    ngOnInit() {
        this.sub = this.activatedRoute.data.subscribe(data => this.fetchEntries(data.drafts))
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    fetchEntries(drafts) {
        if (drafts) {
            this.entryService.getEntryDrafts().then(entries => this.entries = entries);
        } else {
            this.entryService.getEntryIndex().then(entries => this.entries = entries);
        }
    }

    gotoDetail(entry:Entry) {
        let link = ['/angular/entry', entry.slug];
        this.router.navigate(link);
    }
}
