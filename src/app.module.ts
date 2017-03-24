import "./libs";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {FormsModule}   from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app/app.component";
import {MainviewComponent} from "./app/mainview/mainview.component";
import {SidebarComponent} from "./app/sidebar/sidebar.component";
 // import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {NavbarComponent} from "./app/navbar/navbar.component";

import {MapService} from "./services/map.service";
import {GeocodingService} from "./services/geocoding.service";

@NgModule({
    bootstrap: [AppComponent],
    imports: [HttpModule, FormsModule, BrowserModule],
    declarations: [ AppComponent, MainviewComponent, SidebarComponent, NavbarComponent ],
    providers: [ MapService, GeocodingService ]
})

export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
