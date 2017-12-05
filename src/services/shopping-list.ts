import { Ingredient } from "../models/ingredient";


export class ShoppingListService {
    private ingredients : Ingredient[] = [];


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

}