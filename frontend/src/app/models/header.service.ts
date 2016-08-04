import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

export class Header {
    title:string;
    subhead:string;
    image:string;
}


@Injectable()
export class HeaderService {
    constructor(){
        this.header$ = new EventEmitter();
        this.clearHeader$ = new EventEmitter();
    };

    public header$: EventEmitter<Header>;
    public clearHeader$ = EventEmitter;

    updateHeader(header: Header) {
        console.log('the service');
        this.header$.emit(header);
        console.log('went?' + header)
    }

    clearHeader() {
        this.clearHeader$.emit('');
    }
}
