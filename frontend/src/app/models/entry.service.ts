import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Entry} from "./entry";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntryService {

    constructor(private http:Http) {
        this.messageFlashed$ = new EventEmitter();
    }

    private indexUrl = '/api/entries/';
    private draftUrl = '/api/drafts/';
    public messageFlashed$: EventEmitter<string>;

    getEntryIndex():Promise<Entry[]> {
        return this.http.get(this.indexUrl)
            .toPromise().then(response => this.handleData(response.json()))
            .catch(this.handleError);
    }
    
    getEntryDrafts():Promise<Entry[]> {
        return this.http.get(this.draftUrl)
            .toPromise().then(response => this.handleData(response.json()))
            .catch(this.handleError);
    }
    
    getEntryDetail(slug: string):Promise<Entry> {
        return this.http.get(this.indexUrl + slug + '/')
            .toPromise().then(response => this.handleData(response.json()))
            .catch(this.handleError);
    }

    private handleData(response_json) {
        if (response_json.messages) {
            this.messageFlashed$.emit(response_json.messages);
        }
        return response_json.data
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
