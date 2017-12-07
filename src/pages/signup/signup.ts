import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService : AuthService,
              private loadingController : LoadingController,
              private alertController : AlertController){}
  
  onSignup(form : NgForm){
    const loadingDialog = this.loadingController.create({
      content : 'Signing you up...'
    });

    loadingDialog.present();
    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
      loadingDialog.dismiss();
      console.log(data);
    }).catch(error => {
      loadingDialog.dismiss();
      console.log(error)

      const alert = this.alertController.create({
        title : 'Signup failed',
        message : error.message,
        buttons : [ 'Ok']
      });
      alert.present();
    });
  }
}
