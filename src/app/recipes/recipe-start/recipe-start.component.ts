import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  showContent:boolean = false;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.showContent = this.recipeService.getRecipes().length > 0 ? true : false;
  }

}
