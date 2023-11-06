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
          title:"Users",
          items:[
          { href:"users/listusers", text:"Users" },
        ]},
        {
          id: "2",
          title:"Inventory",
          items:[
          { href:"inventory/dashboard", text:"Inventory" },
        ]},
        {
          id: "3",
          title:"Sales",
          items:[
          { href:"sales/createitem", text:"Create Sales Item" },
          { href:"", text:"Add Users" }
        ]},
        {
          id: "4",
          title:"Contacts",
          items:[
          { href:"contacts/listcontacts", text:"List Contacts" },
          { href:"", text:"Add Users" }
        ]},
      ]
    }
  }

}
