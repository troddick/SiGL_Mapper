// import "./libs";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {FormsModule}   from "@angular/forms";
import {BasemapsComponent} from "./basemaps.component/basemaps.component"; 
import {MainviewComponent} from "./mainview.component/mainview.component";

import {SiGLService} from "../../services/siglservices.service";
import {MapService} from "../../services/map.service";
import {GeocodingService} from "../../services/geocoding.service";

@NgModule({    
    imports: [HttpModule, FormsModule, CommonModule ],    
    declarations: [ MainviewComponent, BasemapsComponent ],
    exports: [BasemapsComponent, MainviewComponent],
    providers: [ SiGLService, MapService, GeocodingService ]
})

export class MapModule {}
