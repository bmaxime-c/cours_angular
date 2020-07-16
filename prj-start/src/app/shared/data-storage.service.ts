import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://recipebook-59253.firebaseio.com/recipes.json", recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<Recipe[]>("https://recipebook-59253.firebaseio.com/recipes.json", {
                    params: new HttpParams().set('auth', user.token)
                });
            }),
            map(recipes => {
                return recipes.map(
                    recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ?? [] };
                    });
            }), tap<Recipe[]>(response => {
                this.recipeService.clearRecipes();
                this.recipeService.addRecipes(response);
            })
        );

    }
}