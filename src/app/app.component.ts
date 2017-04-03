import {Component, ViewChild} from "@angular/core";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MainviewComponent} from "./mainview/mainview.component";
import {InfowindowComponent} from "./infowindow/infowindow.component";
import {Location} from "../core/location.class";

@Component({
    selector: "app",
    template: `
        <infowindow></infowindow>
        <navbar></navbar>
        <sidebar></sidebar>
        <mainview></mainview>
        `,
    styles: [
            './app.component.less', 
            '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
        //require<any>("./app.component.less"),
        //require<any>("../../node_modules/bootstrap/dist/css/bootstrap.min.css")
    ]
})
export class AppComponent {
    @ViewChild(InfowindowComponent) infowindowComponent: InfowindowComponent;
    @ViewChild(NavbarComponent) navbarComponent: NavbarComponent;
    @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;    
    @ViewChild(MainviewComponent) mainviewCommponent: MainviewComponent;
}
