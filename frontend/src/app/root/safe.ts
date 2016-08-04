import {Pipe} from '@angular/core'
import {DomSanitizationService} from '@angular/platform-browser';

@Pipe({name: 'safe'})
export class Safe {
    constructor(private sanitizer:DomSanitizationService) {
        this.sanitizer = sanitizer;
    }

    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}

@Pipe({name: 'safe-style'})
export class SafeStyle {
    constructor(private sanitizer:DomSanitizationService) {
        this.sanitizer = sanitizer;
    }

    transform(style) {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }
}
