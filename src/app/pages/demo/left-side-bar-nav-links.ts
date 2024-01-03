import { MenuItems } from "src/app/shared/menu-items";
export interface SideBarNavLinks{ links: MenuItems }

export class LeftSideBarNavLinks implements SideBarNavLinks
{
  public links: MenuItems

  constructor(){
    this.links = {
      itemGroups: [
        {
          title:"Single Link",
          items:[
          { href:"", text:"Single" },
        ]},
        {
          title:"Triple Link",
          items:[
          { href:"", text:"First Link" },
          { href:"", text:"Second Link" },
          { href:"", text:"Third Link" }
        ]},
        {
          title:"Double Link",
          items:[
          { href:"", text:"First Link" },
          { href:"", text:"Second" }
        ]},
        {
          title:"Single Link End",
          items:[
          { href:"", text:"Single End" }
        ]},
      ]
    }
  }

}
