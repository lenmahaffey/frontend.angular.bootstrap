import { SideBarNavLinks } from "./pages/demo/left-side-bar-nav-links";
import { MenuItems } from "./shared/menu-items";

export class HeaderNavLinks implements SideBarNavLinks
{
  public links: MenuItems

  constructor(){
    this.links = {
      itemGroups: [
        // {
        //   title:"",
        //   items:[
        //   { href:"", text:"" },
        // ]},
        // {
        //   title:"",
        //   items:[
        //   { href:"", text:"" },
        // ]},
        // {
        //   title:"",
        //   items:[
        //   { href:"", text:"" },
        // ]},
        // {
        //   title:"",
        //   items:[
        //   { href:"", text:"" },
        // ]},
        // {
        //   title:"",
        //   items:[
        //   { href:"", text:"" },
        // ]},
      ]
    }
  }

}
