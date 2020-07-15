import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  getIngredientsControls(): AbstractControl[] { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {

      this.id = +p['id'];
      this.editMode = p['id'] != null;

      this.initForm();
    })
  }

  onSubmit(): void {
    console.log(this.recipeForm.value);
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.reinitForm();
    this.router.navigate([".."], {relativeTo: this.route});
  }

  onCancel(): void{
    this.reinitForm();
    this.router.navigate([".."], {relativeTo: this.route});
  }

  onAddIngredient(): void {
    this.getIngredientsControls().push(new FormGroup({
      'name': new FormControl(null, Validators.required),
              'amount': new FormControl(null, [Validators.required, Validators.min(1)])
    }));
  }

  onDeleteIngredient(index: number): void {
    this.getIngredientsControls().splice(index, 1);
  }

  private reinitForm(): void{
    this.editMode = false;
    this.id = -1;
  }

  private initForm(): void {
    let recipe: Recipe = null;
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipe = this.recipeService.getRecipeByIdx(this.id);
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe?.name, Validators.required),
      'imagePath': new FormControl(recipe?.imagePath, Validators.required),
      'description': new FormControl(recipe?.description, Validators.required),
      'ingredients': recipeIngredients,
    });
  }

}
