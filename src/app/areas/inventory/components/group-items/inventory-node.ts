import { InventoryItem_DTO } from "src/app/shared/api/api.models";

export interface InventoryNode {
  name: string
  children?: InventoryNode[]
}

export interface InventoryFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
