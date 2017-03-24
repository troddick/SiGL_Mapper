import {Component, ViewChild} from "@angular/core";
import {MapService} from "../../services/map.service";
import {GeocodingService} from "../../services/geocoding.service";
import {Location} from "../../core/location.class";

@Component({
    selector: "mainview",
    template: require<any>("./mainview.component.html"),
    styles: [
        require<any>("./mainview.component.less")
    ]
})
export class MainviewComponent {
  //  @ViewChild(ToolbarComponent) toolbarComponent: ToolbarComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        let map = L.map("map", {
           // zoomControl: false, //allows to override placement of controls
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

       // L.control.zoom({ position: "topright" }).addTo(map); //add it back here to put it where you want
        L.control.layers(null, this.mapService.baseMaps, {position: "topleft"}).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
        this.geocoder.getCurrentLocation()
            .subscribe(
                location => map.panTo([location.latitude, location.longitude]),
                err => console.error(err)
            );
     //   this.toolbarComponent.Initialize();
    }
}
