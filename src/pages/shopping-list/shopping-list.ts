import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems : Ingredient[]; 

  constructor(private shoppingListService : ShoppingListService){}

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

}
