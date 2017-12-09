import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class RecipesService {
    private recipes : Recipe[] = [];

    constructor(private http : Http, 
        private authService : AuthService){}

    addRecipe(title : string, 
        description : string, 
        difficulty : string,
        ingredients : Ingredient[]){
        this.recipes.push(new Recipe(title, 
            description, 
            difficulty, 
            ingredients));

        console.log('Added recipe', this.recipes);
    }

    getRecipes(){
        return this.recipes.slice();
    }

    updateRecipe(index : number, 
        title : string, 
        description : string, 
        difficulty : string,
        ingredients : Ingredient[]){
        this.recipes[index] = new Recipe(title, 
            description, 
            difficulty, 
            ingredients);
    }

    removeRecipe(index : number){
        this.recipes.splice(index);
    }

    storeList(token : string){
        const uid = this.authService.getActiveUser().uid;
        const baseUrl = 'https://ionic2-recipebook-27bcb.firebaseio.com/';
        const url = baseUrl + "/" + uid + "/recipes-list.json?auth="+token;
        return this.http.put(url, this.recipes)
            .map((response : Response) => {
                return response.json();
            });
    }

    fetchList(token : string){
        const uid = this.authService.getActiveUser().uid;
        const baseUrl = 'https://ionic2-recipebook-27bcb.firebaseio.com/';
        const url = baseUrl + "/" + uid + "/recipes-list.json?auth="+token;
        return this.http.get(url)
            .map((response : Response) => {
                return response.json();
            }).do( data => {
                this.recipes = data;
            });
    }
}