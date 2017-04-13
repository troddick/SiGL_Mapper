import "./libs";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {FormsModule}   from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { ModalModule } from 'ng2-bootstrap/modal';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import {AppComponent} from "./app/app.component";
import {FiltersideComponent} from "./app/filter/filterside.component";
import {FiltermodalComponent} from "./app/filtermodal/filtermodal.component";
import {BasemapsComponent} from "./app/basemaps/basemaps.component"; 
import {MainviewComponent} from "./app/mainview/mainview.component";
import {SidebarComponent} from "./app/sidebar/sidebar.component";
import {NavbarComponent} from "./app/navbar/navbar.component";

import {SiGLService} from "./services/siglservices.service";
import {MapService} from "./services/map.service";
import {GeocodingService} from "./services/geocoding.service";

@NgModule({
    bootstrap: [AppComponent],
    imports: [HttpModule, FormsModule, BrowserModule, MultiselectDropdownModule, AccordionModule.forRoot(), ModalModule.forRoot() ],    
    declarations: [ AppComponent, MainviewComponent, FiltersideComponent, FiltermodalComponent, BasemapsComponent, SidebarComponent, NavbarComponent ],
    providers: [ SiGLService, MapService, GeocodingService ]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
