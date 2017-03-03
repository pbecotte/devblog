import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AuthService} from "../auth/auth.service";
import {MessageService} from "../messages/messages.service";


export class StatusDay {
    date:string;
    status:string;
}


@Injectable()
export class StatusService {

    constructor(private auth:AuthService, private messageService:MessageService) {
    }

    private statusUrl = 'api/status_day/';
    private fakeStatus:StatusDay[] = [
        {date: '2-9', status: 'good'},
        {date: '2-10', status: 'good'},
        {date: '2-13', status: 'good'},
        {date: '2-14', status: 'good'},
        {date: '2-15', status: 'good'},
    ];

    getStatus():Promise<StatusDay[]> {
        return this.auth.get(this.statusUrl)
            .toPromise().then(response => this.handleData(response.json()))
            .catch(this.handleError);
    }

    fakegetStatus():Promise<StatusDay[]> {
        return new Promise((resolve, reject) => {
            resolve(this.fakeStatus)
        })
    }

    fakeupdateEntry(status: StatusDay):Promise<StatusDay[]> {
        let ind = this.fakeStatus.indexOf(status);
        if (ind < 0 ) {
            this.fakeStatus = this.fakeStatus.slice(1, 5);
            this.fakeStatus.push(status);
        } else {
            this.fakeStatus[ind].status == 'good' ? this.fakeStatus[ind].status = 'bad':this.fakeStatus[ind].status = 'good';
        }
        return new Promise((resolve, reject) => {
            resolve(this.fakeStatus)
        })
    }

    updateEntry(status: StatusDay):Promise<StatusDay[]> {
        let url = this.statusUrl + status.date + '/';
        return this.auth.post(url, {'status': status.status})
            .toPromise().then(response => {
                if (response.json) {
                    return this.handleData(response.json())
                }
            })
    }

    private handleData(response_json) {
        if (response_json.messages) {
            this.messageService.addMessage.apply(response_json.messages)
        }
        return response_json.data
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
