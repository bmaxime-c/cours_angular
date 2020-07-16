import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) { }

    private recipes: Recipe[] = [];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeByIdx(index:number):Recipe{
        return this.recipes[index];
    }

    clearRecipes(silent=false): void{
        this.recipes = [];
        if(!silent) {
            this.recipesChanged.next([]);
        }
    }

    deleteRecipe(recipe: Recipe): void {
        var idx: number;
        for (idx = 0; idx < this.recipes.length; idx++) {
            if (this.recipes[idx].name == recipe.name) {
                this.recipes.splice(idx, 1);
                this.recipesChanged.next(this.getRecipes());
                break;
            }
        }
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipes(recipes: Recipe[]) {
        this.recipes.push(...recipes);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(recipe: Recipe): void {
        this.slService.addIngredients(recipe.ingredients);
    }
}