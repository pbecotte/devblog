import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {NavEntry, NavRequest} from "./nav";

@Injectable()
export class NavService {
    constructor(){
        this.navEntry$ = new EventEmitter();
    };
    
    public navEntry$: EventEmitter<NavRequest>;
    
    addEntry(entry:NavEntry) {
        let req: NavRequest = new NavRequest(true, entry);
        this.navEntry$.emit(req);
    }
    removeEntry(entry:NavEntry) {
        let req: NavRequest = new NavRequest(false, entry);
        this.navEntry$.emit(req)
    }
}
