import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from './../ingredient.model';
import { Injectable } from "@angular/core";
import { Recipe } from "src/app/recipes/recipe.model";
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';


@Injectable()
export class RecipeService {
  recipeDeleted = new Subject<void>();
  recipeClicked = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe('Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ])
  // ];
  private recipes: Recipe[] = [

  ];
  private ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  // ngOnInit(): void {

  // }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    const recipe = this.recipes[index]
    return recipe;
  }



  addIngredientsToShopList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  deleteRecipe(index: number) {
    this.recipes = this.recipes.slice().filter((_, idx) => index !== idx);
    this.recipeDeleted.next();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.getRecipes());
  }

}