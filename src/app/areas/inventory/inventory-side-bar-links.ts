import { MenuItems } from "src/app/shared/menu-items";
export interface SideBarNavLinks{ links: MenuItems }

export class InventorySideBarNavLinks implements SideBarNavLinks
{
  public links: MenuItems

  constructor(){
    this.links = {
      itemGroups: [
        {
          title:"View Items",
          items:[
          { href:"inventory/items", text:"View Items" },
        ]},
        {
          title:"View Categories",
          items:[
          { href:"inventory/viewcategories", text:"View Catagories" },
        ]},
        {
          title:"Import Inventory",
          items:[
          { href:"inventory/import", text:"Import Inventory" },
        ]},
        {
          title:"Asset Report",
          items:[
          { href:"inventory/assetreport", text:"Asset Report" },
        ]},
      ]
    }
  }

}
