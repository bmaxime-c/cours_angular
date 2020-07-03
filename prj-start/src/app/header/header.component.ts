import {Component, Output, EventEmitter} from '@angular/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent {

    @Output() navbarClicked = new EventEmitter<string>();
    
    onNavbarClick(itemName) {
        this.navbarClicked.emit(itemName);
    }
}