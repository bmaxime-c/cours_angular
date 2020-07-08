import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanDeactivateGuard, CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route:ActivatedRoute, private router:Router) { }
  
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    if(!this.allowEdit || this.changesSaved) {
      return true;
    }
    
    if (this.server.name !== this.serverName || this.server.status !== this.serverStatus)
    {
      return confirm("Voulez-vous abandonner les modifications ?");
    }
    else
    {
      return true;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1';
    });

    this.route.fragment.subscribe((fragment: string) => {
      console.log("Fragment :" + fragment)
    });

    this.route.params.subscribe((p:Params) => {
      this.server = this.serversService.getServer(+p['id']);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
