import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode= false;
  
  constructor(private route:ActivatedRoute, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((p:Params) => {
      this.recipe = this.recipeService.getRecipeByIdx(+p['id']);
      this.id = +p['id'];
      this.editMode = p['id'] != null;
    })
  }

}
