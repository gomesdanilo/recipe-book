import { Ingredient } from "../models/ingredient";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
    private ingredients : Ingredient[] = [];

    constructor(private http : Http, 
                private authService : AuthService){}

    addItem(name : string, amount : number){
        const i = new Ingredient(name, amount);
        this.ingredients.push(i);
        console.log(this.ingredients);
    }

    addItems(items : Ingredient[]){
        this.ingredients.push(...items);
    }

    getItems(){
        return this.ingredients.slice();
    }

    removeItem(index : number){
        this.ingredients.splice(index, 1)
    }

    storeList(token : string){
        const uid = this.authService.getActiveUser().uid;
        const baseUrl = 'https://ionic2-recipebook-27bcb.firebaseio.com/';
        const url = baseUrl + "/" + uid + "/shopping-list.json?auth="+token;
        return this.http.put(url, this.ingredients)
            .map((response : Response) => {
                return response.json();
            });
    }

    fetchList(token : string){
        const uid = this.authService.getActiveUser().uid;
        const baseUrl = 'https://ionic2-recipebook-27bcb.firebaseio.com/';
        const url = baseUrl + "/" + uid + "/shopping-list.json?auth="+token;
        return this.http.get(url)
            .map((response : Response) => {
                return response.json();
            }).do( data => {
                this.ingredients = data;
            });
    }
}