import {Pipe} from '@angular/core'
import {DomSanitizationService} from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class Safe {
    constructor(private sanitizer:DomSanitizationService) {
        this.sanitizer = sanitizer;
    }

    transform(url) {
        return this.sanitizer.bypassSecurityTrustHtml(url);
    }
}
