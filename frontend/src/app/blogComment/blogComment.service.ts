import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";

export class Comment {
    username: string;
    text: string;
}

@Injectable()
export class CommentService {

    constructor(private auth: AuthService) {
    }

    private indexUrl:string = 'api/comments/';

    getComments(slug:string): Promise<Comment[]> {
        return this.auth.get(this.indexUrl + slug)
            .toPromise().then(response => response.json().comments)
    }

    addComment(slug:string, text:string): Promise<Comment>{
        return this.auth.post(this.indexUrl + slug, {text: text})
            .toPromise().then(response => response.json().comment)
    }
}
