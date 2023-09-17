import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  paramsSub: Subscription;
  recipeForm: FormGroup<{
    description:FormControl<string>;
    name:FormControl<string>;
    imagePath:FormControl<string>;
    ingredients: FormArray;
  }>;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe((p: Params) => {
      this.id = +p['recipeId'];
      this.editMode = !!p['recipeId']
      // console.log(this.editMode)
      this.initForm();
    })
  }


  private initForm() {
    let name: string = "";
    let imagePath = "";
    let description = "";
    let recipeIngredients:FormArray<FormGroup> = new FormArray([])
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe["ingredients"]){
        for (let ing of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            "name": new FormControl(ing.name,Validators.required),
            "amount":new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }))
        }
      }

    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(name, [Validators.required]),
      "imagePath": new FormControl(imagePath, [Validators.required]),
      "description": new FormControl(description, [Validators.required]),
      "ingredients": recipeIngredients
    })
  }


  onSubmit(){
    console.log(this.recipeForm,"rec form");
    const {name,description,imagePath,ingredients} = this.recipeForm.value;
    if(!name || !description || !imagePath) return;
    const newRecipe = new Recipe(name,description,imagePath,ingredients);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
      this.editMode = false;
    }else{
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }


  onAddNewIngredient(){
   (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup({
    "name": new FormControl(null,Validators.required),
    "amount": new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
   }))
  }


  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onCancel(){
    this.recipeForm.reset()
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe()
  }

}
