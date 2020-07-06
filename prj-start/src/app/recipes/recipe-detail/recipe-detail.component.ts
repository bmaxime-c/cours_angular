import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }

  onToSLClick(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe);
  }

  onDelete(): void {
    this.recipeService.deleteRecipe(this.recipe);
  }
}
