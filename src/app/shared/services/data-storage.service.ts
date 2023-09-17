import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipeService } from "./recipe.service";
import { map, tap } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class DataStorageService{
  url:string = "https://ng-recipe-7a435-default-rtdb.firebaseio.com/";

  constructor(private httpClient:HttpClient,private recipeService:RecipeService) {
    
  }

  saveRecipes(){
    const recipes:Recipe[] = this.recipeService.getRecipes();
    this.httpClient.put(this.url+"recipes.json",recipes).subscribe((response) => {
      console.log({response},"savedRecipe response");
      
    })
  }


  fetchRecipesFromBackend(){
    return this.httpClient.get<Recipe[]>(this.url+"recipes.json")
    .pipe(
      map((recipes) => {
        return recipes.map((recipe:Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ?? []
          }
        })
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
       })
   );

  }

}