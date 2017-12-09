import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    selector : 'page-database-options',
    templateUrl : 'database-options.html'
})
export class DatabaseOptionsPage {

    constructor(private viewController : ViewController){}

    onAction(action : string){
        this.viewController.dismiss({action : action});
    }
}