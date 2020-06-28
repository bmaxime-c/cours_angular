import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerContent = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverName) {
    this.serverCreated.emit({serverName: serverName, serverContent: this.newServerContent});
  }

  onAddBlueprint(serverName) {
    this.blueprintCreated.emit({serverName: serverName, serverContent: this.newServerContent});
  }
}
