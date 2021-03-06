import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {NgForm}    from '@angular/forms';
import {Subscription} from "rxjs/Subscription";
import {Entry, EntryService} from "../models/entry.service";


@Component({
    selector: 'entry-edit-form',
    templateUrl: 'app/blogEdit/blogEditForm.component.html',
    directives: [ROUTER_DIRECTIVES],
})
export class BlogEditFormComponent implements OnInit, OnDestroy{
    entry:Entry;
    file:File;
    sub:Subscription;
    entrySlug:string;
    image:string;
    heroForm:NgForm;
    
    constructor(
        private route:ActivatedRoute,
        private entryService:EntryService
    ) {}
    
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.entrySlug = params['slug'];
            if (this.entrySlug) {
                this.getEntry(this.entrySlug)
            } else {
                this.entry = new Entry ()
            }
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
        this.entryService.updateEntry(this.entry, this.file)
    }

    onFileChange (ev) {
        this.file = ev.target.files[0];
        this.entry.image = this.file.name;
    }
}
