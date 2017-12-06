import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, 
  ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';




@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm : FormGroup;

  recipe : Recipe;
  index : number;

  constructor(private navParams: NavParams,
    private asController : ActionSheetController,
    private alertController : AlertController,
    private toastController : ToastController,
    private recipesService : RecipesService,
    private navController : NavController) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }
  
  private initializeForm(){

    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      ingredients = this.recipe.ingredients.map(ingredient => {
        return new FormControl(ingredient.name, Validators.required);
      });
    }

    this.recipeForm = new FormGroup({
      'title' : new FormControl(title, Validators.required),
      'description' : new FormControl(description, Validators.required),
      'difficulty' : new FormControl(difficulty, Validators.required),
      'ingredients' : new FormArray(ingredients)
    })
  }

  private createNewIngredientAlert(){
    const alert = this.alertController.create({
      title : 'Add Ingredient',
      inputs : [
        {
          name : 'name',
          placeholder : 'Name'
        }
      ],
      buttons : [
        {
          text : 'Cancel',
          role : 'cancel'
        },
        {
          text : 'Add',
          handler : data => {
            if(data.name == null || data.name.trim() == ''){
              this.showToast('Invalid name');
              return;
            }
            const newControl = new FormControl(data.name, Validators.required);
            (<FormArray>this.recipeForm.get('ingredients')).push(newControl);
            this.showToast('Ingredient added');
          }
        }
      ]
    });
    return alert;
  }

  onSubmit(){
    const value = this.recipeForm.value;

    let ingredients = [];
    if (value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return { name : name, amount : 1};
      });
    }

    this.recipesService.addRecipe(value.title, 
      value.description, 
      value.difficulty, 
      ingredients);
    this.recipeForm.reset();
    this.navController.popToRoot();
  }

  private showToast(message : string){
    const toast = this.toastController.create({
      message : message,
      duration : 1500,
      position : 'bottom'
    });
    toast.present();
  }

  onManageIngredients(){
    const action = this.asController.create({
      title : 'What do you need?',
      buttons : [
        {
          text : 'Add ingredient',
          handler : () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text : 'Remove all ingredient',
          role : 'destructive',
          handler : () => {
            debugger;
            const fArray : FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0){
              for(let i = len - 1; i >= 0; i--){
                fArray.removeAt(i);
              }
              this.showToast('All Ingredients were removed');
            }
          }
        },
        {
          text : 'Cancel',
          role : 'cancel'
        },
      ]
    });

    action.present();

  }

}
