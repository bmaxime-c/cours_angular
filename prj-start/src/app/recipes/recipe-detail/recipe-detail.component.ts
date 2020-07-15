import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      this.recipe = this.recipeService.getRecipeByIdx(+p['id']);

      if(!this.recipe) {
        this.router.navigate(['/not-found']);
      }
    })
  }

  onEdit():void{
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

  onToSLClick(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe);
  }

  onDelete(): void {
    this.recipeService.deleteRecipe(this.recipe);
    this.router.navigate(['..'], {relativeTo:this.route});
  }
}
