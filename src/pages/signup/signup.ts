import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService : AuthService){}
  
  onSignup(form : NgForm){
    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
        console.log(data);
    }).catch(error => console.log(error));
  }
}
