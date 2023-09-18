import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipeService } from "./recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url: string = "https://ng-recipe-7a435-default-rtdb.firebaseio.com/";

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {

  }

  saveRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.httpClient.put(this.url + "recipes.json", recipes).subscribe((response) => {
      console.log({ response }, "savedRecipe response");

    })
  }


  fetchRecipesFromBackend() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.httpClient.get<Recipe[]>(this.url + `recipes.json`, {
          params: new HttpParams().set("auth", user.token)
        })
      }),
      map((recipes: Recipe[]) => {
        return recipes.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ?? []
          }
        })
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

}