import { SideBarNavLinks } from "./pages/demo/left-side-bar-nav-links";
import { MenuItems } from "./shared/menu-items";

export class HeaderNavLinks implements SideBarNavLinks
{
  public links: MenuItems

  constructor(){
    this.links = {
      itemGroups: [
        // {
        //   title:"Users",
        //   items:[
        //   { href:"users/listusers", text:"Users" },
        // ]},
        // {
        //   title:"Inventory",
        //   items:[
        //   { href:"inventory/dashboard", text:"Inventory" },
        // ]},
        // {
        //   title:"Sales",
        //   items:[
        //   { href:"sales/createitem", text:"Create Sales Item" },
        //   { href:"", text:"Add Users" }
        // ]},
        {
          title:"Contacts",
          items:[
          { href:"contacts/", text:"Contacts" },
        ]},
      ]
    }
  }

}
