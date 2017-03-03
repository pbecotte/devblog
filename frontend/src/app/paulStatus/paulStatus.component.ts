import {Component, OnInit} from '@angular/core';
import {StatusService, StatusDay} from "./paulStatus.service";


@Component({
    selector: 'paulStatus',
    templateUrl: 'app/paulStatus/paulStatus.component.html',
    styleUrls: ['app/paulStatus/paulStatus.component.css']
})
export class PaulStatusComponent implements OnInit {

    statuses:StatusDay[];

    constructor(private statusService:StatusService) {
    }

    fetchStatuses() {
        this.statusService.getStatus().then(statuses => {
            this.statuses = statuses;
        })
    }

    createStatus() {
        let date = new Date();
        let datestring = (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
        this.statusService.updateEntry({date: datestring, status: 'good'}).then(statuses => {
            this.statuses = statuses;
        })
    }

    updateStatus(status:StatusDay){
        status.status = (status.status === 'good' ? 'bad' : 'good');
        this.statusService.updateEntry(status).then(statuses => {
            this.statuses.splice(0, this.statuses.length);
            this.statuses.push.apply(this.statuses, statuses);
        })
    }

    ngOnInit() {
        this.fetchStatuses();
    }
}
