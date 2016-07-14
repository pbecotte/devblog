import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Entry} from "../models/entry";


@Component({
    selector: 'blogIndex',
    templateUrl: '/angular/app/blogIndex/blogIndex.component.html',
})
export class BlogIndexComponent implements OnInit {

    entries:Entry[];

    constructor(private router:Router){}

    ngOnInit() {
        this.entries = [
            {
                id: 1,
                title: 'first post',
                slug: 'first',
                tagline: 'always one',
                html_content: 'blog post',
                published: true,
                timestamp: '2016-1-1 12:00:00',
                image: 'fakeurl.example',
            }
        ]
    }
    
    gotoDetail(entry: Entry) {
        let link = ['/angular/entry', entry.slug];
        this.router.navigate(link);
    }
}
