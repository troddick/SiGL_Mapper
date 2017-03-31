import {Component, ViewChild} from "@angular/core";
import {MapService} from "../../services/map.service";
import { Draggable } from '../mainview/draggable.directive';

@Component({
    selector: "infowindow",
    template: require<any>("./infowindow.component.html"),
    styles: [
        require<any>("./infowindow.component.less")
    ]
})
export class InfowindowComponent {
    public test: string;
    constructor() { }

    ngOnInit() {
        this.test = "INFO WILL GO HERE EVENTUALLY";
    }
}
