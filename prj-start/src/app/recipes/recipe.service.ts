import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) { }

    private recipes: Recipe[] = [
        new Recipe(
            "Salade fraiche d'été au melon",
            "Vous pouvez la servir avec un jambon de pays, une viande froide... Possibilité de remplacer le mesclun par des pâtes de type Penne...c'est tout aussi délicieux et ç'est original. ",
            "https://assets.afcdn.com/recipe/20140814/42224_w1024h768c1cx1000cy1500.webp",
            [
                new Ingredient('Tomate', 10),
                new Ingredient('Melon', 2),
                new Ingredient('Salade', 1),
                new Ingredient('Fêta', 1),
                new Ingredient('Bouquet de basilic', 1),
                new Ingredient('Citron', 1)
            ]
        ),
        new Recipe(
            "Ratatouille au Cookeo",
            "Utilisez les restes de cette ratatouille pour garnir des bricks à l’œuf avec un peu de fromage râpé.",
            "https://assets.afcdn.com/recipe/20191204/103428_w1024h768c1cx4950cy2462cxt0cyt0cxb8574cyb5715.webp",
            [
                new Ingredient('Tomate', 5),
                new Ingredient('Courgette', 2),
                new Ingredient('Poivron', 2),
                new Ingredient('Aubergine', 1),
                new Ingredient('Oignon', 2),
                new Ingredient("Gousse d'ail", 3)
            ]
        ),
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeByIdx(index:number):Recipe{
        return this.recipes[index];
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

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(recipe: Recipe): void {
        this.slService.addIngredients(recipe.ingredients);
    }
}