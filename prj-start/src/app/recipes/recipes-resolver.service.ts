import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        if(this.recipesService.getRecipeByIdx(+route.params['id'])) {
            console.log('No fetch needed !');
            return this.recipesService.getRecipes();
        }

        console.log('fetch needed');
        return this.dataStorageService.fetchRecipes();
    }    

}