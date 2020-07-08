import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ServersService } from "../servers.service";

interface Server {
    id:number;
    name: string;
    status: string;
}

export class ServerResolver implements Resolve<Server> {
    constructor(private serversService:ServersService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | import("rxjs").Observable<Server> | Promise<Server> {
        return this.serversService.getServer(+route.params['id']);
    }
    
    
}