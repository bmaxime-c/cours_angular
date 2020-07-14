import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);

      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  reinitForm(form: NgForm): void {
    this.editMode = false;
    this.editedItem = null;
    form.reset();
  }

  onSubmit(form: NgForm): void {
    const value = form.value;

    if(this.editMode) {
      this.editedItem.name = value.name;
      this.editedItem.amount = value.amount;
    } else {
      this.editedItem = new Ingredient(value.name, value.amount);
      this.slService.addIngredient(this.editedItem);
    }

    this.reinitForm(form);
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
