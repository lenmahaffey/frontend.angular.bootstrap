import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { InventoryService } from '../../inventory.service';
import { InventoryItemCategory_DTO } from 'src/app/shared/api/api.models';


interface TreeNode {
  name: string;
  children?: TreeNode[];
}
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
const TREE_DATA: TreeNode[] = [];

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss']
})
export class CategoryTreeComponent {
  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  categories: InventoryItemCategory_DTO[] = []
  constructor(private inventoryService: InventoryService) {
    this.dataSource.data = TREE_DATA;
    this.getCategories()
  }

  getCategories(){
    const sub = this.inventoryService.ListAllCategories().subscribe(
      {
        next: (data) =>
        {
          this.formatTreeData(data)
        }
      }
    )
  }

  formatTreeData(list: InventoryItemCategory_DTO[])
  {
    let newTreeData: TreeNode[] = []
    let typeNodes: TreeNode[] = []
    let subTypeNodes: TreeNode[] = []
    list.forEach(category =>
    {
        typeNodes = []
        category.types?.forEach(type => {
          subTypeNodes = []
          type.subTypes?.forEach(subType =>
            {
              subTypeNodes.push({name: subType.name}) //Subtypes
            })
          typeNodes.push( {name: type.name, children: subTypeNodes}) //Types
        });
      let newNode = {name: category.name, children: typeNodes } //Categories
      newTreeData.push(newNode)
    })
    this.dataSource.data = newTreeData
  }
  hasChild = (_: number, node: FlatNode) => node.expandable;
  onClick(name:string)
  {
    console.log(name)
  }
}
