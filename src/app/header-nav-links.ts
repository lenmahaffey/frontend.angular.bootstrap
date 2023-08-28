import { SideBarNavLinks } from "./pages/demo/left-side-bar-nav-links";
import { MenuItems } from "./shared/menu-items";

export class HeaderNavLinks implements SideBarNavLinks
{
  public links: MenuItems

  constructor(){
    this.links = {
      itemGroups: [
        {
          id: "1",
          title:"Single Link",
          items:[
          { href:"demo", text:"Component Demo" },
        ]},
        {
          id: "2",
          title:"Graphs",
          items:[
          { href:"graphs/barchart", text:"Bar Chart" },
          { href:"graphs/piechart", text:"Pie Chart" },
        ]}
      ]
    }
  }

}
