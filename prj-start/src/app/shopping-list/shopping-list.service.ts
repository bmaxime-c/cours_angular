import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Steak haché', 5),
        new Ingredient('PQ', 10)
    ];

    constructor() { }

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    ngOnInit(): void {
    }

    addIngredient(ingredient: Ingredient, silent: boolean = false) {
        var ingredientUpdated: boolean = false;
        for (var i in this.ingredients) {
            if (this.ingredients[i].name == ingredient.name) {
                this.ingredients[i].amount += ingredient.amount;
                ingredientUpdated = true;
                break;
            }
        }

        if (!ingredientUpdated) {
            this.ingredients.push(ingredient);
        }

        if (!silent) {
            this.ingredientsChanged.emit(this.getIngredients());
        }
    }

    addIngredients(ingredients: Ingredient[]) {
        for (var i in ingredients) {
            this.addIngredient(ingredients[i], true);
        }
        this.ingredientsChanged.emit(this.getIngredients());
    }
}