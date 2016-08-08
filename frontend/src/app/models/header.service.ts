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
        this.basicHeader = {
            title: "Paul Becotte",
            subhead: "A Python/Devops guy's personal blog",
            image: '/static/img/home-bg.jpg',
        };
        this.header = this.basicHeader;
    };

    public header: Header;
    private basicHeader: Header;

    updateHeader(header: Header) {
        this.header = header;
    }

    clearHeader() {
        this.header = this.basicHeader;
    }
}
