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
          { href:"inventory/items", text:"View Items" },
        ]},
        {
          id: "2",
          title:"View Categories",
          items:[
          { href:"inventory/viewcategories", text:"View Catagories" },
        ]},
        {
          id: "3",
          title:"Import Inventory",
          items:[
          { href:"inventory/import", text:"Import Inventory" },
        ]},
        {
          id: "4",
          title:"Asset Report",
          items:[
          { href:"inventory/assetreport", text:"Asset Report" },
        ]},
      ]
    }
  }

}
