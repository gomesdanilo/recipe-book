import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';


@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes : Recipe[];

  constructor(private navCtrl : NavController,
    private recipesService : RecipesService){

  }

  ionViewWillEnter(){
    this.loadItems();
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, { mode : 'New'});
  }
  
  onLoadRecipe(recipe : Recipe, index : number){
    this.navCtrl.push(RecipePage, {
      recipe : recipe,
      index : index
    });
  }

  loadItems(){
    this.recipes = this.recipesService.getRecipes();
  }

}
