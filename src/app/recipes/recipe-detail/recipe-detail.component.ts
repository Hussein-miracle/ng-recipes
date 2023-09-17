import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Component,  OnDestroy,  OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit,OnDestroy {
  
  selectedRecipe:Recipe | null = null;
  id:number;
  paramsSub:Subscription;
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {

    const id = this.route.snapshot.params['recipeId']
    this.id = +id;
    this.selectedRecipe = this.recipeService.getRecipe(+id)

    this.paramsSub = this.route.params.subscribe((params:Params) => {
      const recipeId = +params['recipeId']
      this.id = recipeId;
      this.selectedRecipe = this.recipeService.getRecipe(recipeId);
    })
    // this.recipeService.recipeClicked.subscribe((recipe:Recipe) => {
    //   this.selectedRecipe = recipe;
    // })
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShopList(this.selectedRecipe.ingredients);
  }

  onEditRecipe(){
    // this.router.navigate(['recipes',this.id,"edit"])
    this.router.navigate(["edit"],{relativeTo:this.route})
  }
  onDeleteRecipe(){
    // this.router.navigate(['recipes',this.id,"edit"])
    // this.router.navigate(["edit"],{relativeTo:this.route})
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }


  ngOnDestroy(): void {
      this.paramsSub.unsubscribe();
  }
}
