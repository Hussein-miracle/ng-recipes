import { ShoppingListService } from './../../shared/services/shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild("form",{static:false}) form:NgForm;
  // @ViewChild("nameInput") nameInput:ElementRef;
  // @ViewChild("amountInput") amountInput:ElementRef;
  startedEditingSub:Subscription;
  editItemIndex:number;
  editItem:Ingredient;
  editMode:boolean = false;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {

    this.startedEditingSub =  this.shoppingListService.startedEditing.subscribe((itemIndex:number) => {
      this.editMode = true
      this.editItemIndex = itemIndex;
      this.editItem = this.shoppingListService.getIngredient(itemIndex);
      // console.log(this.form);
      this.form.setValue({
       "name": this.editItem.name,
       "amount": this.editItem.amount,
      });      
    })
  }

  onAddRecipeItem(){
    // const name = this.nameInput.nativeElement.value;
    // const amount = this.amountInput.nativeElement.value;
    // const ingredient = new Ingredient(name,amount);
    // this.shoppingListService.addIngredient(ingredient);
    // this.shoppingListService.ingredientAdded.next([ingredient]);

  }


  onSubmit(form:NgForm){
    this.onAddItem(form);
  }

  onAddItem(form:NgForm){
    console.log({form}); 
    const {amount, name} = form.value;
    if(!name || !amount){
      return;
    }

    // const modifiedName = name.length >= 2 ? (name[0].toUpperCase() + name.slice(1,name.length).toLowercase()) : name;
    const ingredient = new Ingredient(name,amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex,ingredient);
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.shoppingListService.ingredientAdded.next([ingredient]);

    this.editMode = false;
    form.reset()
  }


  handleClear(){
    // console.log(this.editMode,"before logic")
    this.editMode = this.editMode === true && false;
    // console.log(this.editMode,"expects false if true")
    this.form.reset()
  }

  handleDelete(){
    if(this.editMode !== true) return;
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.editMode = false;
    this.form.reset()
  }
  ngOnDestroy(): void {
    this.startedEditingSub.unsubscribe();
  }
}
