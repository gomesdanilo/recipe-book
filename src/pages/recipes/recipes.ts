import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { Component } from '@angular/core';
import { 
    IonicPage, 
    NavController, 
    NavParams, 
    PopoverController,
    LoadingController,
    AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes : Recipe[];

  constructor(private navCtrl : NavController,
    private recipesService : RecipesService,
    private popoverController : PopoverController,
    private authService : AuthService,
    private loadingController : LoadingController,
    private alertController : AlertController){

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

  private handleError(errorMessage : string){
    const alert = this.alertController.create({
      title : 'An error occured',
      message : errorMessage,
      buttons : ['Ok']
    });
    alert.present();
  }

  onShowOptions(event : MouseEvent){
    const loading = this.loadingController.create({
      content : 'Please wait...'
    });


    const popover = this.popoverController.create(DatabaseOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {

        if(data.action == 'load'){

          loading.present();

          this.authService.getActiveUser().getToken()
          .then((token : string) => {
              this.recipesService.fetchList(token)
                  .subscribe(
                      (list : Recipe[]) => {
                        loading.dismiss();
                        if (list){
                          this.recipes = list;
                        } else {
                          this.recipes = [];
                        }
                      },
                      error => {
                        loading.dismiss();
                        this.handleError(error.json().error);
                      }
                  );
          })
        } else if(data.action == 'store'){

            loading.present();
            this.authService.getActiveUser().getToken()
            .then((token : string) => {
                this.recipesService.storeList(token)
                    .subscribe(
                        () => {
                          loading.dismiss();
                        },
                        error => {
                          loading.dismiss();
                          this.handleError(error.json().error);
                        }
                    );
            })
        }
    })
  }

}
