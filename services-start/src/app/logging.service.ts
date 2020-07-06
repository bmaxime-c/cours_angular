export class LoggingService {
    logstatusChange(status:string){
        console.log("A server status changes, new status: " + status);
    }
}