import { MenuItems } from "src/app/shared/menu-items";
export interface SideBarNavLinks{ links: MenuItems }

export class LeftSideBarNavLinks implements SideBarNavLinks
{
  public links: MenuItems

  constructor(){
    this.links = {
      itemGroups: [
        {
          id: "1",
          title:"Single Link",
          items:[
          { href:"", text:"Single" },
        ]},
        {
          id: "2",
          title:"Triple Link",
          items:[
          { href:"", text:"First Link" },
          { href:"", text:"Second Link" },
          { href:"", text:"Third Link" }
        ]},
        {
          id: "3",
          title:"Double Link",
          items:[
          { href:"", text:"First Link" },
          { href:"", text:"Second" }
        ]},
        {
          id: "4",
          title:"Single Link End",
          items:[
          { href:"", text:"Single End" }
        ]},
      ]
    }
  }

}
