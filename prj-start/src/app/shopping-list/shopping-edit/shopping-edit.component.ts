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
  editedIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedIndex = index;
      const editedItem = this.slService.getIngredient(index);

      this.slForm.setValue({
        name: editedItem.name,
        amount: editedItem.amount
      });
    });
  }

  reinitForm(form: NgForm): void {
    this.editMode = false;
    this.editedIndex = -1;
    form.reset();
  }

  onDelete(): void{
    this.slService.deleteIngredient(this.editedIndex);
    this.reinitForm(this.slForm);
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode) {
      this.slService.updateIngredient(this.editedIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.reinitForm(form);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
