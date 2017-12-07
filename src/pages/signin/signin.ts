import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {


    constructor(private authService : AuthService,
        private loadingController : LoadingController,
        private alertController : AlertController){}

    onSignin(form : NgForm){
        const loadingDialog = this.loadingController.create({
            content : 'Signing you in...'
        });

        loadingDialog.present();
        this.authService.signin(form.value.email, form.value.password)
        .then(data => {
            loadingDialog.dismiss();
            console.log(data);
        }).catch(error => {
            loadingDialog.dismiss();
            console.log(error)

            const alert = this.alertController.create({
                title : 'Signin failed',
                message : error.message,
                buttons : [ 'Ok']
            });
            alert.present();
        });
      }
}
