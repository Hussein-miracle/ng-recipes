import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shared/services/shopping-list.service';
import { RecipeService } from './shared/services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [RecipeService,ShoppingListService],
})

export class AppComponent implements OnInit{
  showAddRecipes:boolean = true; 
  constructor(){

  } 
  ngOnInit(): void {
      
  }


  handleNavItemClicked(e:{navItem:string}){
    const {navItem} = e;
    // console.log({e});
    this.showAddRecipes = navItem === 'recipe' ? true : false;
  }
}
