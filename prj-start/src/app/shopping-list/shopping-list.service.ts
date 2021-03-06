import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Steak haché', 5),
        new Ingredient('PQ', 10)
    ];

    constructor() { }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    ngOnInit(): void {
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
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
            this.ingredientsChanged.next(this.getIngredients());
        }
    }

    addIngredients(ingredients: Ingredient[]) {
        for (var i in ingredients) {
            this.addIngredient(ingredients[i], true);
        }
        this.ingredientsChanged.next(this.getIngredients());
    }
}