import {Component, Input, OnInit} from '@angular/core';


import {CommentService, Comment} from "./blogComment.service";
import {AuthService} from "../auth/auth.service";


@Component({
    selector: 'blogComment',
    templateUrl: 'app/blogComment/blogComment.component.html',
})
export class BlogCommentComponent implements OnInit {

    @Input()
    commentSlug:string;
    comments:Comment[] = [];
    newComment:string;
    sub:any;

    constructor(private commentService:CommentService, private auth:AuthService) {
    }

    ngOnInit() {
        this.fetchComments();
    }


    fetchComments() {
        this.commentService.getComments(this.commentSlug)
            .then(comments => {
                this.comments.splice(0, this.comments.length);
                this.comments.push.apply(this.comments, comments)
            })
            .catch()
    }

    addComment() {
        this.commentService.addComment(this.commentSlug, this.newComment)
            .then(resp => this.fetchComments())
            .catch()
    }

}
