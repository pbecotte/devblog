import {Component} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {NgForm}    from '@angular/forms';
import {Subscription} from "rxjs/Subscription";
import {Entry} from "../models/entry";
import {EntryService} from "../models/entry.service";


@Component({
    selector: 'entry-edit-form',
    templateUrl: '/angular/app/blogEdit/blogEditForm.component.html',
    directives: [ROUTER_DIRECTIVES],
})
export class BlogEditFormComponent implements OnInit, OnDestroy{
    entry:Entry;
    sub:Subscription;
    entrySlug:string;
    image:string;
    
    constructor(
        private route:ActivatedRoute,
        private entryService:EntryService
    ) {}
    
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
        this.entryService.getEntryDetail(slug).then(data => function (_comp, _data) {
            _comp.entry = _data.entry;
            _comp.image = _data.image;
        }(this, data));
    }
    
    updateEntry () {
        
    }
}
