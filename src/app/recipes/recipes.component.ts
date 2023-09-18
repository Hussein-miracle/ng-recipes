import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../shared/services/recipe.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[]
})
export class RecipesComponent implements OnInit {
  // @Input('recipes') recipeList:any[];
  // recipeList:any[] = [];
  selectedRecipe:Recipe | null = null;
  constructor(private recipeService:RecipeService,private dataStorage:DataStorageService) { }

  ngOnInit() {
    // this.recipeList = this.recipeService.recipes;
    this.dataStorage.fetchRecipesFromBackend().subscribe({next:()=>{},error:()=>{}});
    this.recipeService.recipeClicked.subscribe((r:Recipe) => {
      this.selectedRecipe = r;
    })
  }

  handleRecipeWasSelected(recipe:Recipe){
    console.log({recipe},'res was');
    this.selectedRecipe = recipe;
  }


  handleRecipeWasDeleted(){
    
  }
}
