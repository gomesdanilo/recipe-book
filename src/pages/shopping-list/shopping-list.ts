import { Component } from '@angular/core';
import { 
    IonicPage, 
    NavController, 
    NavParams, 
    PopoverController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
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
              private authService : AuthService){}

  ionViewWillEnter(){
    this.loadItems();
  }

  loadItems(){
    this.listItems = this.shoppingListService.getItems();
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
    const popover = this.popoverController.create(SLOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {

        console.log('dismissed popover', data);
        if(data.action == 'load'){
          this.authService.getActiveUser().getToken()
          .then((token : string) => {
              this.shoppingListService.fetchList(token)
                  .subscribe(
                      (list : Ingredient[]) => {
                        console.log('Success!');
                        if (list){
                          this.listItems = list;
                        } else {
                          this.listItems = [];
                        }
                      },
                      error => console.log("Error", error)
                  );
          })
        } else if(data.action == 'store'){
            this.authService.getActiveUser().getToken()
            .then((token : string) => {
                this.shoppingListService.storeList(token)
                    .subscribe(
                        () => console.log('Success!'),
                        error => console.log("Error", error)
                    );
            })
        }
    })
  }

}
