import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';


export class NavEntry {
    title:string;
    dest:string[];
}


@Injectable()
export class NavService {
    constructor(){
        this.extraNav = [];
    };
    
    public extraNav: NavEntry[];
    
    addEdit(slug:string) {
        let nav: NavEntry = {title: 'Edit Entry', dest: ['entry', slug, '/edit']};
        this.extraNav.push(nav)
    }
    removeEdit() {
        this.extraNav.splice(0, 1)
    }
}
