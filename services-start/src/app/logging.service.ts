import { Injectable } from "@angular/core";

@Injectable()
export class LoggingService {
    logstatusChange(status:string){
        console.log("A server status changes, new status: " + status);
    }
}