import { Component } from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent {

    constructor(private dataStore: DataStorageService) { }

    onSaveData() {
        this.dataStore.storeRecipes();
    }

    onFetchData() {
        this.dataStore.fetchRecipes().subscribe();
    }
}