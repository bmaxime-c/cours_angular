import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(2017, 10, 1)
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(2018, 2, 23)
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(2020, 8, 30)
    },
    {
      instanceType: 'small',
      name: 'Testing',
      status: 'stable',
      started: new Date(2012, 1, 3)
    }
  ];
  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }
}
