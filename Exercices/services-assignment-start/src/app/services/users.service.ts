import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class UsersService {
    activeUsers: string[] = [
        'Max',
        'Anna'
    ];

    inactiveUsers: string[] = [
        'Chris',
        'Manu'
    ];

    userStatusChanged = new EventEmitter<boolean>();

    constructor(){
        
    }

    deactivateUser(id: number) {
        var removed = this.activeUsers.splice(id, 1);
        if (removed) {
            console.log(removed);
            this.inactiveUsers.push(removed[0]);
            this.userStatusChanged.emit(false);
        }
    }

    activateUser(id: number) {
        var removed = this.inactiveUsers.splice(id, 1);
        if (removed) {
            console.log(removed);
            this.activeUsers.push(removed[0]);
            this.userStatusChanged.emit(true);
        }
    }
}