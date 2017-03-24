import {Component} from "@angular/core";

@Component({
    selector: "siglfilters",
    template: require<any>("./siglfilters.component.html"),
    styles: [
        require<any>("./siglfilters.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class SiglFiltersComponent {
    public selectedTabName: string;

    constructor() {
        this.selectedTabName = "sites";
    }

    public selectTab(tabname: string): void {
        if (this.selectedTabName === tabname) return;
        this.selectedTabName = tabname;
    }
}
