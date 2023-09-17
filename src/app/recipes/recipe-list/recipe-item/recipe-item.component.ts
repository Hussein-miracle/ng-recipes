import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() index:number;
  @Input() recipe:Recipe;
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }


  handleRecipeClicked(){
    // console.log({recipe:this.recipe})
    // this.recipeClicked.next()
    this.recipeService.recipeClicked.next(this.recipe)
  }

}
