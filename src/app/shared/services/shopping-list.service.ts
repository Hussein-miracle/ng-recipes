import { OnInit } from "@angular/core";
import { Ingredient } from "../ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
  ingredientAdded = new Subject<Ingredient[]>()
  ingredientDeleted = new Subject<void>()
  startedEditing = new Subject<number>()
  
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor(){

  }

  // ngOnInit(): void {
      
  // }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ing:Ingredient){
    // console.log({i})
    this.ingredients.unshift(ing);
    this.ingredientAdded.next(this.getIngredients());
  }
  addIngredients(ings:Ingredient[]){
    // console.log({i})
    this.ingredients.push(...ings);
    this.ingredientAdded.next(this.getIngredients());
  }

  getIngredient(ind:number){
    return this.getIngredients()[ind];
  }

  updateIngredient(index:number,ing:Ingredient){
    this.ingredients[index] = ing;
    this.ingredientAdded.next(this.getIngredients())
  }


  deleteIngredient(index:number){
    this.ingredients = this.getIngredients().filter((_ing:Ingredient,idx:number) => index !== idx);
    this.ingredientDeleted.next()
  }
}