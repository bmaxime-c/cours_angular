import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn: boolean;

  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn;
    this.authService.loggedInChanged.subscribe((loggedIn) => this.loggedIn = loggedIn);
  }

  onLoadServers(id:number) {
    this.router.navigate(["/servers", id, 'edit'], {queryParams: {allowEdit: 1}, fragment:'coucou'});
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
