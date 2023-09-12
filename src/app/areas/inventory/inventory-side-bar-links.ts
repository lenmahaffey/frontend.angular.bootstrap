import { MenuItems } from "src/app/shared/menu-items";
export interface SideBarNavLinks{ links: MenuItems }

export class InventorySideBarNavLinks implements SideBarNavLinks
{
  public links: MenuItems

  constructor(){
    this.links = {
      itemGroups: [
        {
          id: "1",
          title:"View Items",
          items:[
          { href:"inventory/listitems", text:"View Items" },
        ]},
        {
          id: "2",
          title:"View Categories",
          items:[
          { href:"inventory/viewcategories", text:"View Catagories" },
        ]},
      ]
    }
  }

}
