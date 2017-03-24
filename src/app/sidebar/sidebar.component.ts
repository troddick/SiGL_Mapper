import {Component} from "@angular/core";

@Component({
    selector: "sidebar",
    template: require<any>("./sidebar.component.html"),
    styles: [
        require<any>("./sidebar.component.less"),
        require<any>("../../styles/main.less")
    ],
    providers: []
})
export class SidebarComponent {
    public selectedTabName: string;

    constructor() {
        this.selectedTabName = "sites";
    }

    public selectTab(tabname: string): void {
        if (this.selectedTabName === tabname) return;
        this.selectedTabName = tabname;
    }
}
