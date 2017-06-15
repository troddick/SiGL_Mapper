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
import {FiltersideComponent} from "./app/filter.component/filterside.component";
import {FiltermodalComponent} from "./app/filtermodal.component/filtermodal.component";
import {SidebarComponent} from "./app/sidebar.component/sidebar.component";
import {NavbarComponent} from "./app/navbar.component/navbar.component";

import {SiGLService} from "./services/siglservices.service";
import {MapService} from "./services/map.service";
import {MapModule} from "./app/map.module/map.module";
// import {GeocodingService} from "./services/geocoding.service";

@NgModule({
    bootstrap: [AppComponent],
    imports: [HttpModule, FormsModule, BrowserModule, MultiselectDropdownModule, AccordionModule.forRoot(), ModalModule.forRoot(), MapModule ],    
    declarations: [ AppComponent, FiltersideComponent, FiltermodalComponent, SidebarComponent, NavbarComponent ],
    providers: [ SiGLService, MapService]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
