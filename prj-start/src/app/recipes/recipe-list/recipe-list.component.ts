import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangedSub: Subscription;

  constructor(private recipeService:RecipeService) { }
  

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangedSub = this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
      console.log("recipes nb " + recipes.length);
    });
  }

  ngOnDestroy(): void {
    this.recipeChangedSub.unsubscribe();
  }

}
