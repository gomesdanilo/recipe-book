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
import { SLOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems : Ingredient[]; 

  constructor(private shoppingListService : ShoppingListService,
              private popoverController : PopoverController,
              private authService : AuthService,
              private loadingController : LoadingController,
              private alertController : AlertController){}

  ionViewWillEnter(){
    this.loadItems();
  }

  loadItems(){
    this.listItems = this.shoppingListService.getItems();
  }

  private handleError(errorMessage : string){
    const alert = this.alertController.create({
      title : 'An error occured',
      message : errorMessage,
      buttons : ['Ok']
    });
    alert.present();
  }
  

  onAddItem(form : NgForm){
    this.shoppingListService.addItem(
      form.value.ingretientName, 
      form.value.amount);
      form.reset();
      this.loadItems();
  }

  onCheckItem(index : number){
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event : MouseEvent){
    const loading = this.loadingController.create({
      content : 'Please wait...'
    });


    const popover = this.popoverController.create(SLOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {

        if(data.action == 'load'){

          loading.present();

          this.authService.getActiveUser().getToken()
          .then((token : string) => {
              this.shoppingListService.fetchList(token)
                  .subscribe(
                      (list : Ingredient[]) => {
                        loading.dismiss();
                        if (list){
                          this.listItems = list;
                        } else {
                          this.listItems = [];
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
                this.shoppingListService.storeList(token)
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
