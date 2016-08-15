import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AuthService} from "../auth/auth.service";


export class Entry {
    id:number;
    title:string;
    slug:string;
    tagline:string;
    content:string;
    html_content:string;
    published:boolean;
    timestamp:string;
    image:string;
}


@Injectable()
export class EntryService {

    constructor(private auth:AuthService) {
        this.messageFlashed$ = new EventEmitter();
    }

    private indexUrl = '/api/entries/';
    private draftUrl = '/api/drafts/';
    public messageFlashed$: EventEmitter<string>;

    getEntryIndex():Promise<Entry[]> {
        return this.auth.get(this.indexUrl)
            .toPromise().then(response => this.handleData(response.json()))
            .catch(this.handleError);
    }
    
    getEntryDrafts():Promise<Entry[]> {
        return this.auth.get(this.draftUrl)
            .toPromise().then(response => this.handleData(response.json()))
            .catch(this.handleError);
    }
    
    getEntryDetail(slug: string):Promise<Entry> {
        return this.auth.get(this.indexUrl + slug + '/')
            .toPromise().then(response => this.handleData(response.json()))
            .catch(this.handleError);
    }
    
    updateEntry(entry: Entry, file:File) {
        new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest(),
                url: string,
                method: string;
            if (entry.slug) {
                url = this.indexUrl + entry.slug + '/edit/';
                method = 'PUT';
            } else {
                url = '/api/create/';
                method = 'POST';
            }

            if (file) {formData.append("image", file, file.name);}
            formData.append("entry", JSON.stringify(entry));

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.open(method, url, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.setRequestHeader("Authorization", this.auth.head()["Authorization"])
            xhr.send(formData);
        }).then(response => this.messageFlashed$.emit(response.json().messages))
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
