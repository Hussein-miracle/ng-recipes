import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients: Ingredient[] = [ ];
  ingredientAddedSub:Subscription;
  ingredientDeletedSub:Subscription;
 

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientAddedSub = this.shoppingListService.ingredientAdded.subscribe((_ings) => {
      this.fetchIngredients()
    })


    this.ingredientDeletedSub = this.shoppingListService.ingredientDeleted.subscribe(() => {
      this.fetchIngredients()
    })




  }


  handleIngredientAdded(i:Ingredient){
    // console.log({i})
    this.shoppingListService.addIngredient(i);
  }


  onEditItem(idx:number){
    this.shoppingListService.startedEditing.next(idx)
  }

  ngOnDestroy(): void {
      this.ingredientAddedSub.unsubscribe();
  }


  fetchIngredients(){
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
