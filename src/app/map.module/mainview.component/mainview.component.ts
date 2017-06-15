import {Component, ViewChild} from "@angular/core";
import {MapService} from "../../../services/map.service";
import {SiGLService} from "../../../services/siglservices.service";
import {GeocodingService} from "../../../services/geocoding.service";
import {Location} from "../../../core/location.class";

@Component({
    selector: "mainview",
    template: `<div id="map"></div>`,// require<any>("./mainview.component.html"),
    styles: [
        require<any>("./mainview.component.less")
    ]
})
export class MainviewComponent { 
    constructor(private _mapService: MapService, private _siglService: SiGLService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        this._siglService.sites
            .subscribe((result:any) => {
                L.geoJSON(result, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng);
                    }
                }).addTo(map);
        });
        
        let map = L.map("map", {
           // zoomControl: false, //allows to override placement of controls
            center: L.latLng(40.731253, -73.996139),
            zoom: 5,
            minZoom: 4,
            maxZoom: 19,
            layers: [this._mapService.baseMaps.Topo]
        });
        L.control.layers(this._mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);
        this._mapService.map = map;       
        L.control.scale().addTo(map);

        this._mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );
     //   this.toolbarComponent.Initialize();
    } // end ngOnInit()

}
