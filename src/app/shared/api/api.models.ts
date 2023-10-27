export class InventoryItem_DTO implements IInventoryItem_DTO {
    id!: number;
    assetId?: string | undefined;
    name!: string;
    description?: string | undefined;
    quantity!: number;
    purchasePrice!: number;
    dailyRentalRate!: number;
    weeklyRentalRate!: number;
    partNumber?: string | undefined;
    serialNumber?: string | undefined;
    manufacturer?: string | undefined;
    purchaseDate?: Date | undefined;
    weight?: number | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    categoryId!: number;
    typeId?: number | undefined;
    subTypeId?: number | undefined;
    isContainer!: boolean;
    isAssetTracked!: boolean;
    version!: number;
    category?: InventoryItemCategory_DTO | undefined;
    type?: InventoryItemType_DTO | undefined;
    subType?: InventoryItemSubType_DTO | undefined;

    constructor(data?: IInventoryItem_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.assetId = _data["assetId"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.quantity = _data["quantity"];
            this.purchasePrice = _data["purchasePrice"];
            this.dailyRentalRate = _data["dailyRentalRate"];
            this.weeklyRentalRate = _data["weeklyRentalRate"];
            this.partNumber = _data["partNumber"];
            this.serialNumber = _data["serialNumber"];
            this.manufacturer = _data["manufacturer"];
            this.purchaseDate = _data["purchaseDate"] ? new Date(_data["purchaseDate"].toString()) : <any>undefined;
            this.weight = _data["weight"];
            this.length = _data["length"];
            this.width = _data["width"];
            this.height = _data["height"];
            this.categoryId = _data["categoryId"];
            this.typeId = _data["typeId"];
            this.subTypeId = _data["subTypeId"];
            this.isContainer = _data["isContainer"];
            this.isAssetTracked = _data["isAssetTracked"];
            this.version = _data["version"];
            this.category = _data["category"] ? InventoryItemCategory_DTO.fromJS(_data["category"]) : <any>undefined;
            this.type = _data["type"] ? InventoryItemType_DTO.fromJS(_data["type"]) : <any>undefined;
            this.subType = _data["subType"] ? InventoryItemSubType_DTO.fromJS(_data["subType"]) : <any>undefined;
        }
    }

    static fromJS(data: any): InventoryItem_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItem_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["assetId"] = this.assetId;
        data["name"] = this.name;
        data["description"] = this.description;
        data["quantity"] = this.quantity;
        data["purchasePrice"] = this.purchasePrice;
        data["dailyRentalRate"] = this.dailyRentalRate;
        data["weeklyRentalRate"] = this.weeklyRentalRate;
        data["partNumber"] = this.partNumber;
        data["serialNumber"] = this.serialNumber;
        data["manufacturer"] = this.manufacturer;
        data["purchaseDate"] = this.purchaseDate ? this.purchaseDate.toISOString() : <any>undefined;
        data["weight"] = this.weight;
        data["length"] = this.length;
        data["width"] = this.width;
        data["height"] = this.height;
        data["categoryId"] = this.categoryId;
        data["typeId"] = this.typeId;
        data["subTypeId"] = this.subTypeId;
        data["isContainer"] = this.isContainer;
        data["isAssetTracked"] = this.isAssetTracked;
        data["version"] = this.version;
        data["category"] = this.category ? this.category.toJSON() : <any>undefined;
        data["type"] = this.type ? this.type.toJSON() : <any>undefined;
        data["subType"] = this.subType ? this.subType.toJSON() : <any>undefined;
        return data;
    }
}

export interface IInventoryItem_DTO {
    id: number;
    assetId?: string | undefined;
    name: string;
    description?: string | undefined;
    quantity: number;
    purchasePrice: number;
    dailyRentalRate: number;
    weeklyRentalRate: number;
    partNumber?: string | undefined;
    serialNumber?: string | undefined;
    manufacturer?: string | undefined;
    purchaseDate?: Date | undefined;
    weight?: number | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    categoryId: number;
    typeId?: number | undefined;
    subTypeId?: number | undefined;
    isContainer: boolean;
    isAssetTracked: boolean;
    version: number;
    category?: InventoryItemCategory_DTO | undefined;
    type?: InventoryItemType_DTO | undefined;
    subType?: InventoryItemSubType_DTO | undefined;
}

export class InventoryItemCategory_DTO implements IInventoryItemCategory_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    version!: number;
    types?: InventoryItemType_DTO[] | undefined;

    constructor(data?: IInventoryItemCategory_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.version = _data["version"];
            if (Array.isArray(_data["types"])) {
                this.types = [] as any;
                for (let item of _data["types"])
                    this.types!.push(InventoryItemType_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): InventoryItemCategory_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItemCategory_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["version"] = this.version;
        if (Array.isArray(this.types)) {
            data["types"] = [];
            for (let item of this.types)
                data["types"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInventoryItemCategory_DTO {
    id: number;
    name: string;
    description?: string | undefined;
    version: number;
    types?: InventoryItemType_DTO[] | undefined;
}

export class InventoryItemType_DTO implements IInventoryItemType_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    categoryId!: number;
    version!: number;
    category?: InventoryItemCategory_DTO | undefined;
    subTypes?: InventoryItemSubType_DTO[] | undefined;

    constructor(data?: IInventoryItemType_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.categoryId = _data["categoryId"];
            this.version = _data["version"];
            this.category = _data["category"] ? InventoryItemCategory_DTO.fromJS(_data["category"]) : <any>undefined;
            if (Array.isArray(_data["subTypes"])) {
                this.subTypes = [] as any;
                for (let item of _data["subTypes"])
                    this.subTypes!.push(InventoryItemSubType_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): InventoryItemType_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItemType_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["categoryId"] = this.categoryId;
        data["version"] = this.version;
        data["category"] = this.category ? this.category.toJSON() : <any>undefined;
        if (Array.isArray(this.subTypes)) {
            data["subTypes"] = [];
            for (let item of this.subTypes)
                data["subTypes"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInventoryItemType_DTO {
    id: number;
    name: string;
    description?: string | undefined;
    categoryId: number;
    version: number;
    category?: InventoryItemCategory_DTO | undefined;
    subTypes?: InventoryItemSubType_DTO[] | undefined;
}

export class InventoryItemSubType_DTO implements IInventoryItemSubType_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    typeId!: number;
    version!: number;
    type?: InventoryItemType_DTO | undefined;

    constructor(data?: IInventoryItemSubType_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.typeId = _data["typeId"];
            this.version = _data["version"];
            this.type = _data["type"] ? InventoryItemType_DTO.fromJS(_data["type"]) : <any>undefined;
        }
    }

    static fromJS(data: any): InventoryItemSubType_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItemSubType_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["typeId"] = this.typeId;
        data["version"] = this.version;
        data["type"] = this.type ? this.type.toJSON() : <any>undefined;
        return data;
    }
}

export interface IInventoryItemSubType_DTO {
    id: number;
    name: string;
    description?: string | undefined;
    typeId: number;
    version: number;
    type?: InventoryItemType_DTO | undefined;
}

export class ListInventoryItemsViewModel implements IListInventoryItemsViewModel {
    categoryId?: number | undefined;
    typeId?: number | undefined;
    subTypeId?: number | undefined;

    constructor(data?: IListInventoryItemsViewModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.categoryId = _data["categoryId"];
            this.typeId = _data["typeId"];
            this.subTypeId = _data["subTypeId"];
        }
    }

    static fromJS(data: any): ListInventoryItemsViewModel {
        data = typeof data === 'object' ? data : {};
        let result = new ListInventoryItemsViewModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["categoryId"] = this.categoryId;
        data["typeId"] = this.typeId;
        data["subTypeId"] = this.subTypeId;
        return data;
    }
}

export interface IListInventoryItemsViewModel {
    categoryId?: number | undefined;
    typeId?: number | undefined;
    subTypeId?: number | undefined;
}

export class SalesItem_DTO implements ISalesItem_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    categoryId!: number;
    category!: InventoryItemCategory_DTO;
    typeId?: number | undefined;
    type?: InventoryItemType_DTO | undefined;
    subTypeId?: number | undefined;
    subType?: InventoryItemSubType_DTO | undefined;
    inventoryItems?: InventorySalesItem_DTO[] | undefined;

    constructor(data?: ISalesItem_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.category = new InventoryItemCategory_DTO();
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.categoryId = _data["categoryId"];
            this.category = _data["category"] ? InventoryItemCategory_DTO.fromJS(_data["category"]) : new InventoryItemCategory_DTO();
            this.typeId = _data["typeId"];
            this.type = _data["type"] ? InventoryItemType_DTO.fromJS(_data["type"]) : <any>undefined;
            this.subTypeId = _data["subTypeId"];
            this.subType = _data["subType"] ? InventoryItemSubType_DTO.fromJS(_data["subType"]) : <any>undefined;
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventorySalesItem_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): SalesItem_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new SalesItem_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["categoryId"] = this.categoryId;
        data["category"] = this.category ? this.category.toJSON() : <any>undefined;
        data["typeId"] = this.typeId;
        data["type"] = this.type ? this.type.toJSON() : <any>undefined;
        data["subTypeId"] = this.subTypeId;
        data["subType"] = this.subType ? this.subType.toJSON() : <any>undefined;
        if (Array.isArray(this.inventoryItems)) {
            data["inventoryItems"] = [];
            for (let item of this.inventoryItems)
                data["inventoryItems"].push(item.toJSON());
        }
        return data;
    }
}

export interface ISalesItem_DTO {
    id: number;
    name: string;
    description?: string | undefined;
    categoryId: number;
    category: InventoryItemCategory_DTO;
    typeId?: number | undefined;
    type?: InventoryItemType_DTO | undefined;
    subTypeId?: number | undefined;
    subType?: InventoryItemSubType_DTO | undefined;
    inventoryItems?: InventorySalesItem_DTO[] | undefined;
}

export class InventorySalesItem_DTO implements IInventorySalesItem_DTO {
    inventoryItemId!: number;
    salesItemId!: number;
    quantity!: number;
    inventoryItem?: InventoryItem_DTO | undefined;

    constructor(data?: IInventorySalesItem_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.inventoryItemId = _data["inventoryItemId"];
            this.salesItemId = _data["salesItemId"];
            this.quantity = _data["quantity"];
            this.inventoryItem = _data["inventoryItem"] ? InventoryItem_DTO.fromJS(_data["inventoryItem"]) : <any>undefined;
        }
    }

    static fromJS(data: any): InventorySalesItem_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new InventorySalesItem_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["inventoryItemId"] = this.inventoryItemId;
        data["salesItemId"] = this.salesItemId;
        data["quantity"] = this.quantity;
        data["inventoryItem"] = this.inventoryItem ? this.inventoryItem.toJSON() : <any>undefined;
        return data;
    }
}

export interface IInventorySalesItem_DTO {
    inventoryItemId: number;
    salesItemId: number;
    quantity: number;
    inventoryItem?: InventoryItem_DTO | undefined;
}

export class CreateNewInventorySalesItemViewModel implements ICreateNewInventorySalesItemViewModel {
    name!: string;
    description!: string;
    categoryId!: number;
    typeId!: number;
    subTypeId!: number;
    inventoryItemQuantities!: { [key: string]: number; };

    constructor(data?: ICreateNewInventorySalesItemViewModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.inventoryItemQuantities = {};
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.description = _data["description"];
            this.categoryId = _data["categoryId"];
            this.typeId = _data["typeId"];
            this.subTypeId = _data["subTypeId"];
            if (_data["inventoryItemQuantities"]) {
                this.inventoryItemQuantities = {} as any;
                for (let key in _data["inventoryItemQuantities"]) {
                    if (_data["inventoryItemQuantities"].hasOwnProperty(key))
                        (<any>this.inventoryItemQuantities)![key] = _data["inventoryItemQuantities"][key];
                }
            }
        }
    }

    static fromJS(data: any): CreateNewInventorySalesItemViewModel {
        data = typeof data === 'object' ? data : {};
        let result = new CreateNewInventorySalesItemViewModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["description"] = this.description;
        data["categoryId"] = this.categoryId;
        data["typeId"] = this.typeId;
        data["subTypeId"] = this.subTypeId;
        if (this.inventoryItemQuantities) {
            data["inventoryItemQuantities"] = {};
            for (let key in this.inventoryItemQuantities) {
                if (this.inventoryItemQuantities.hasOwnProperty(key))
                    (<any>data["inventoryItemQuantities"])[key] = (<any>this.inventoryItemQuantities)[key];
            }
        }
        return data;
    }
}

export interface ICreateNewInventorySalesItemViewModel {
    name: string;
    description: string;
    categoryId: number;
    typeId: number;
    subTypeId: number;
    inventoryItemQuantities: { [key: string]: number; };
}

