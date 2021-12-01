import { Component } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {
    LoginModalService,
    ProjectService,
    Principal,
    Project,
} from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss',
    ],

})
export class HomeComponent {
    modalRef: NgbModalRef;

    constructor(
            public principal: Principal,
            private loginModalService: LoginModalService,
            public projectService: ProjectService,
    ) {
    }

    trackId(index: number, item: Project) {
        return item.projectName;
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
