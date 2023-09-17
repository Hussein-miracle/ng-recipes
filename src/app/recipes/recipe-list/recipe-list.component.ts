import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';

import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from './../recipe.model';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})


export class RecipeListComponent implements OnInit,OnDestroy {
  @Output() recipeWasSelected = new Subject<Recipe>();
  recipeUpdatedSub:Subscription;
  recipeDeletedSub:Subscription;
  recipes: Recipe[] = [];

  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) {
  
   }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeUpdatedSub = this.recipeService.recipeChanged.subscribe((recipes:Recipe[]) => {
      this.recipes = recipes;
    })

    this.recipeDeletedSub = this.recipeService.recipeDeleted.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    })
  }



  onRecipeSelected(index:number){
    // this.recipeWasSelected.next(recipe);
    this.router.navigate([])
  }


  handleNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }


  ngOnDestroy(): void {
      this.recipeUpdatedSub.unsubscribe();
      this.recipeDeletedSub.unsubscribe();
  }

}
