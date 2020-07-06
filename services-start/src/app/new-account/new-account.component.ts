import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  constructor(private accountsService:AccountService){}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
  }
}
