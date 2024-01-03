export interface MenuItem{
  href: string;
  text: string;
}

export class MenuItem implements MenuItem{
  href: string = ""
  text: string = ""
}

export interface MenuItemGroup{
  title: string;
  items: MenuItem[];
}

export class MenuItemGroup implements MenuItemGroup {
  title: string = ""
  items: MenuItem[] = []
}

export interface MenuItems {
  itemGroups: MenuItemGroup[];
}

export class MenuItems implements MenuItems
{
  itemGroups: MenuItemGroup[] = [];
}
