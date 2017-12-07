import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
    selector : 'page-sl-options',
    templateUrl : 'sl-options.html'
})
export class SLOptionsPage {

    constructor(private viewController : ViewController){}

    onAction(action : string){
        this.viewController.dismiss({action : action});
    }
}