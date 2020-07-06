import { Injectable, Output } from "@angular/core";
import { UsersService } from "./users.service";

@Injectable()
export class CounterService {

    @Output() activatedCounter: number = 0;
    @Output() deactivatedCounter: number = 0;

    constructor(private usersService: UsersService) {
        this.usersService.userStatusChanged.subscribe((status: boolean) => { 
            if (status) { 
                this.activatedCounter++; 
            } else { 
                this.deactivatedCounter++; 
            }

            console.log("activatedCounter: " + this.activatedCounter);
            console.log("deactivatedCounter: " + this.deactivatedCounter);
        });
    }
}