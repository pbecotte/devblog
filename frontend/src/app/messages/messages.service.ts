import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {
    public messages:string[];

    constructor () {
        this.messages = []
    }

    addMessage(message:string) {
        this.messages.push(message)
    }

    ackMessage(message:string) {
        var index = this.messages.indexOf(message);
        this.messages.splice(index, 1);
    }
}
