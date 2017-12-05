import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm : FormGroup;

  constructor(private navParams: NavParams,
    private asController : ActionSheetController,
    private alertController : AlertController) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }
  
  private initializeForm(){
    this.recipeForm = new FormGroup({
      'title' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulty' : new FormControl('Medium', Validators.required),
      'ingredients' : new FormArray([])
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
              return;
            }
            const newControl = new FormControl(data.name, Validators.required);
            (<FormArray>this.recipeForm.get('ingredients')).push(newControl);
          }
        }
      ]
    });
    return alert;
  }

  onSubmit(){
    console.log(this.recipeForm);
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
