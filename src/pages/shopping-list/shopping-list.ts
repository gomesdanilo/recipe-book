import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ShoppingListService } from '../../services/shopping-list';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  constructor(private shoppingListService : ShoppingListService){}

  onAddItem(form : NgForm){
    this.shoppingListService.addItem(
      form.value.ingretientName, 
      form.value.amount);
      form.reset();
  }

}
