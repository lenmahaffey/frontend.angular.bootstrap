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
    category!: InventoryItemCategory;
    type?: InventoryItemType | undefined;
    subType?: InventoryItemSubType | undefined;

    constructor(data?: IInventoryItem_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.category = new InventoryItemCategory();
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
            this.category = _data["category"] ? InventoryItemCategory.fromJS(_data["category"]) : new InventoryItemCategory();
            this.type = _data["type"] ? InventoryItemType.fromJS(_data["type"]) : <any>undefined;
            this.subType = _data["subType"] ? InventoryItemSubType.fromJS(_data["subType"]) : <any>undefined;
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
    category: InventoryItemCategory;
    type?: InventoryItemType | undefined;
    subType?: InventoryItemSubType | undefined;
}

export class InventoryItemCategory implements IInventoryItemCategory {
    id!: number;
    name!: string;
    description?: string | undefined;
    types?: InventoryItemType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;
    version!: number;

    constructor(data?: IInventoryItemCategory) {
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
            if (Array.isArray(_data["types"])) {
                this.types = [] as any;
                for (let item of _data["types"])
                    this.types!.push(InventoryItemType.fromJS(item));
            }
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem.fromJS(item));
            }
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): InventoryItemCategory {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItemCategory();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        if (Array.isArray(this.types)) {
            data["types"] = [];
            for (let item of this.types)
                data["types"].push(item.toJSON());
        }
        if (Array.isArray(this.inventoryItems)) {
            data["inventoryItems"] = [];
            for (let item of this.inventoryItems)
                data["inventoryItems"].push(item.toJSON());
        }
        data["version"] = this.version;
        return data;
    }
}

export interface IInventoryItemCategory {
    id: number;
    name: string;
    description?: string | undefined;
    types?: InventoryItemType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;
    version: number;
}

export class InventoryItemType implements IInventoryItemType {
    id!: number;
    name!: string;
    description?: string | undefined;
    categoryId!: number;
    category?: InventoryItemCategory | undefined;
    subTypes?: InventoryItemSubType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;
    version!: number;

    constructor(data?: IInventoryItemType) {
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
            this.category = _data["category"] ? InventoryItemCategory.fromJS(_data["category"]) : <any>undefined;
            if (Array.isArray(_data["subTypes"])) {
                this.subTypes = [] as any;
                for (let item of _data["subTypes"])
                    this.subTypes!.push(InventoryItemSubType.fromJS(item));
            }
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem.fromJS(item));
            }
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): InventoryItemType {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItemType();
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
        if (Array.isArray(this.subTypes)) {
            data["subTypes"] = [];
            for (let item of this.subTypes)
                data["subTypes"].push(item.toJSON());
        }
        if (Array.isArray(this.inventoryItems)) {
            data["inventoryItems"] = [];
            for (let item of this.inventoryItems)
                data["inventoryItems"].push(item.toJSON());
        }
        data["version"] = this.version;
        return data;
    }
}

export interface IInventoryItemType {
    id: number;
    name: string;
    description?: string | undefined;
    categoryId: number;
    category?: InventoryItemCategory | undefined;
    subTypes?: InventoryItemSubType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;
    version: number;
}

export class InventoryItemSubType implements IInventoryItemSubType {
    id!: number;
    name!: string;
    description?: string | undefined;
    typeId!: number;
    type?: InventoryItemType | undefined;
    inventoryItems?: InventoryItem[] | undefined;
    version!: number;

    constructor(data?: IInventoryItemSubType) {
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
            this.type = _data["type"] ? InventoryItemType.fromJS(_data["type"]) : <any>undefined;
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem.fromJS(item));
            }
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): InventoryItemSubType {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItemSubType();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["typeId"] = this.typeId;
        data["type"] = this.type ? this.type.toJSON() : <any>undefined;
        if (Array.isArray(this.inventoryItems)) {
            data["inventoryItems"] = [];
            for (let item of this.inventoryItems)
                data["inventoryItems"].push(item.toJSON());
        }
        data["version"] = this.version;
        return data;
    }
}

export interface IInventoryItemSubType {
    id: number;
    name: string;
    description?: string | undefined;
    typeId: number;
    type?: InventoryItemType | undefined;
    inventoryItems?: InventoryItem[] | undefined;
    version: number;
}

export class InventoryItem implements IInventoryItem {
    id!: number;
    assetId?: string | undefined;
    name!: string;
    serialNumber?: string | undefined;
    partNumber?: string | undefined;
    description?: string | undefined;
    quantity!: number;
    purchasePrice!: number;
    dailyRentalRate!: number;
    weeklyRentalRate!: number;
    manufacturer?: string | undefined;
    purchaseDate?: Date | undefined;
    weight?: number | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    categoryId!: number;
    typeId?: number | undefined;
    subTypeId?: number | undefined;
    category?: InventoryItemCategory | undefined;
    type?: InventoryItemType | undefined;
    subType?: InventoryItemSubType | undefined;
    isContainer!: boolean;
    isAssetTracked!: boolean;
    version!: number;

    constructor(data?: IInventoryItem) {
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
            this.serialNumber = _data["serialNumber"];
            this.partNumber = _data["partNumber"];
            this.description = _data["description"];
            this.quantity = _data["quantity"];
            this.purchasePrice = _data["purchasePrice"];
            this.dailyRentalRate = _data["dailyRentalRate"];
            this.weeklyRentalRate = _data["weeklyRentalRate"];
            this.manufacturer = _data["manufacturer"];
            this.purchaseDate = _data["purchaseDate"] ? new Date(_data["purchaseDate"].toString()) : <any>undefined;
            this.weight = _data["weight"];
            this.length = _data["length"];
            this.width = _data["width"];
            this.height = _data["height"];
            this.categoryId = _data["categoryId"];
            this.typeId = _data["typeId"];
            this.subTypeId = _data["subTypeId"];
            this.category = _data["category"] ? InventoryItemCategory.fromJS(_data["category"]) : <any>undefined;
            this.type = _data["type"] ? InventoryItemType.fromJS(_data["type"]) : <any>undefined;
            this.subType = _data["subType"] ? InventoryItemSubType.fromJS(_data["subType"]) : <any>undefined;
            this.isContainer = _data["isContainer"];
            this.isAssetTracked = _data["isAssetTracked"];
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): InventoryItem {
        data = typeof data === 'object' ? data : {};
        let result = new InventoryItem();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["assetId"] = this.assetId;
        data["name"] = this.name;
        data["serialNumber"] = this.serialNumber;
        data["partNumber"] = this.partNumber;
        data["description"] = this.description;
        data["quantity"] = this.quantity;
        data["purchasePrice"] = this.purchasePrice;
        data["dailyRentalRate"] = this.dailyRentalRate;
        data["weeklyRentalRate"] = this.weeklyRentalRate;
        data["manufacturer"] = this.manufacturer;
        data["purchaseDate"] = this.purchaseDate ? this.purchaseDate.toISOString() : <any>undefined;
        data["weight"] = this.weight;
        data["length"] = this.length;
        data["width"] = this.width;
        data["height"] = this.height;
        data["categoryId"] = this.categoryId;
        data["typeId"] = this.typeId;
        data["subTypeId"] = this.subTypeId;
        data["category"] = this.category ? this.category.toJSON() : <any>undefined;
        data["type"] = this.type ? this.type.toJSON() : <any>undefined;
        data["subType"] = this.subType ? this.subType.toJSON() : <any>undefined;
        data["isContainer"] = this.isContainer;
        data["isAssetTracked"] = this.isAssetTracked;
        data["version"] = this.version;
        return data;
    }
}

export interface IInventoryItem {
    id: number;
    assetId?: string | undefined;
    name: string;
    serialNumber?: string | undefined;
    partNumber?: string | undefined;
    description?: string | undefined;
    quantity: number;
    purchasePrice: number;
    dailyRentalRate: number;
    weeklyRentalRate: number;
    manufacturer?: string | undefined;
    purchaseDate?: Date | undefined;
    weight?: number | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    categoryId: number;
    typeId?: number | undefined;
    subTypeId?: number | undefined;
    category?: InventoryItemCategory | undefined;
    type?: InventoryItemType | undefined;
    subType?: InventoryItemSubType | undefined;
    isContainer: boolean;
    isAssetTracked: boolean;
    version: number;
}

export class ListInventoryItemsViewModel implements IListInventoryItemsViewModel {
    catgeoryId?: number | undefined;
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
            this.catgeoryId = _data["catgeoryId"];
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
        data["catgeoryId"] = this.catgeoryId;
        data["typeId"] = this.typeId;
        data["subTypeId"] = this.subTypeId;
        return data;
    }
}

export interface IListInventoryItemsViewModel {
    catgeoryId?: number | undefined;
    typeId?: number | undefined;
    subTypeId?: number | undefined;
}

export class InventoryItemCategory_DTO implements IInventoryItemCategory_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    version!: number;
    types?: InventoryItemType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;

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
                    this.types!.push(InventoryItemType.fromJS(item));
            }
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem.fromJS(item));
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
        if (Array.isArray(this.inventoryItems)) {
            data["inventoryItems"] = [];
            for (let item of this.inventoryItems)
                data["inventoryItems"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInventoryItemCategory_DTO {
    id: number;
    name: string;
    description?: string | undefined;
    version: number;
    types?: InventoryItemType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;
}

export class InventoryItemType_DTO implements IInventoryItemType_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    categoryId!: number;
    version!: number;
    category?: InventoryItemCategory | undefined;
    subTypes?: InventoryItemSubType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;

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
            this.category = _data["category"] ? InventoryItemCategory.fromJS(_data["category"]) : <any>undefined;
            if (Array.isArray(_data["subTypes"])) {
                this.subTypes = [] as any;
                for (let item of _data["subTypes"])
                    this.subTypes!.push(InventoryItemSubType.fromJS(item));
            }
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem.fromJS(item));
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
        if (Array.isArray(this.inventoryItems)) {
            data["inventoryItems"] = [];
            for (let item of this.inventoryItems)
                data["inventoryItems"].push(item.toJSON());
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
    category?: InventoryItemCategory | undefined;
    subTypes?: InventoryItemSubType[] | undefined;
    inventoryItems?: InventoryItem[] | undefined;
}

export class InventoryItemSubType_DTO implements IInventoryItemSubType_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    typeId!: number;
    version!: number;
    type?: InventoryItemType | undefined;
    inventoryItems?: InventoryItem[] | undefined;

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
            this.type = _data["type"] ? InventoryItemType.fromJS(_data["type"]) : <any>undefined;
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem.fromJS(item));
            }
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
        if (Array.isArray(this.inventoryItems)) {
            data["inventoryItems"] = [];
            for (let item of this.inventoryItems)
                data["inventoryItems"].push(item.toJSON());
        }
        return data;
    }
}

export interface IInventoryItemSubType_DTO {
    id: number;
    name: string;
    description?: string | undefined;
    typeId: number;
    version: number;
    type?: InventoryItemType | undefined;
    inventoryItems?: InventoryItem[] | undefined;
}

export class User_DTO implements IUser_DTO {
    id!: number;
    contactInfoId!: number;
    contactInfo?: ContactInformation_DTO | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    firstName!: string;
    middleName?: string | undefined;
    lastName!: string;

    constructor(data?: IUser_DTO) {
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
            this.contactInfoId = _data["contactInfoId"];
            this.contactInfo = _data["contactInfo"] ? ContactInformation_DTO.fromJS(_data["contactInfo"]) : <any>undefined;
            this.prefix = _data["prefix"];
            this.suffix = _data["suffix"];
            this.firstName = _data["firstName"];
            this.middleName = _data["middleName"];
            this.lastName = _data["lastName"];
        }
    }

    static fromJS(data: any): User_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new User_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInfoId"] = this.contactInfoId;
        data["contactInfo"] = this.contactInfo ? this.contactInfo.toJSON() : <any>undefined;
        data["prefix"] = this.prefix;
        data["suffix"] = this.suffix;
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
        return data;
    }
}

export interface IUser_DTO {
    id: number;
    contactInfoId: number;
    contactInfo?: ContactInformation_DTO | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
}

export class ContactInformation_DTO implements IContactInformation_DTO {
    id!: number;
    userId!: number;
    physicalAddresses?: PhysicalAddress_DTO[] | undefined;
    emailAddresses?: EmailAddress_DTO[] | undefined;
    phoneNumbers?: PhoneNumber_DTO[] | undefined;

    constructor(data?: IContactInformation_DTO) {
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
            this.userId = _data["userId"];
            if (Array.isArray(_data["physicalAddresses"])) {
                this.physicalAddresses = [] as any;
                for (let item of _data["physicalAddresses"])
                    this.physicalAddresses!.push(PhysicalAddress_DTO.fromJS(item));
            }
            if (Array.isArray(_data["emailAddresses"])) {
                this.emailAddresses = [] as any;
                for (let item of _data["emailAddresses"])
                    this.emailAddresses!.push(EmailAddress_DTO.fromJS(item));
            }
            if (Array.isArray(_data["phoneNumbers"])) {
                this.phoneNumbers = [] as any;
                for (let item of _data["phoneNumbers"])
                    this.phoneNumbers!.push(PhoneNumber_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): ContactInformation_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new ContactInformation_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userId"] = this.userId;
        if (Array.isArray(this.physicalAddresses)) {
            data["physicalAddresses"] = [];
            for (let item of this.physicalAddresses)
                data["physicalAddresses"].push(item.toJSON());
        }
        if (Array.isArray(this.emailAddresses)) {
            data["emailAddresses"] = [];
            for (let item of this.emailAddresses)
                data["emailAddresses"].push(item.toJSON());
        }
        if (Array.isArray(this.phoneNumbers)) {
            data["phoneNumbers"] = [];
            for (let item of this.phoneNumbers)
                data["phoneNumbers"].push(item.toJSON());
        }
        return data;
    }
}

export interface IContactInformation_DTO {
    id: number;
    userId: number;
    physicalAddresses?: PhysicalAddress_DTO[] | undefined;
    emailAddresses?: EmailAddress_DTO[] | undefined;
    phoneNumbers?: PhoneNumber_DTO[] | undefined;
}

export class PhysicalAddress_DTO implements IPhysicalAddress_DTO {
    id!: number;
    contactInfoId!: number;
    line1!: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city!: string;
    state!: string;
    postalCode!: string;
    addressType!: AddressType;

    constructor(data?: IPhysicalAddress_DTO) {
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
            this.contactInfoId = _data["contactInfoId"];
            this.line1 = _data["line1"];
            this.line2 = _data["line2"];
            this.line3 = _data["line3"];
            this.city = _data["city"];
            this.state = _data["state"];
            this.postalCode = _data["postalCode"];
            this.addressType = _data["addressType"];
        }
    }

    static fromJS(data: any): PhysicalAddress_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new PhysicalAddress_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInfoId"] = this.contactInfoId;
        data["line1"] = this.line1;
        data["line2"] = this.line2;
        data["line3"] = this.line3;
        data["city"] = this.city;
        data["state"] = this.state;
        data["postalCode"] = this.postalCode;
        data["addressType"] = this.addressType;
        return data;
    }
}

export interface IPhysicalAddress_DTO {
    id: number;
    contactInfoId: number;
    line1: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city: string;
    state: string;
    postalCode: string;
    addressType: AddressType;
}

export enum AddressType {
    Mailing = 0,
    Billing = 1,
    Shipping = 2,
}

export class EmailAddress_DTO implements IEmailAddress_DTO {
    id!: number;
    contactInformationId!: number;
    contactInformation?: ContactInformation_DTO | undefined;
    address!: string;
    label!: string;
    priority!: number;

    constructor(data?: IEmailAddress_DTO) {
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
            this.contactInformationId = _data["contactInformationId"];
            this.contactInformation = _data["contactInformation"] ? ContactInformation_DTO.fromJS(_data["contactInformation"]) : <any>undefined;
            this.address = _data["address"];
            this.label = _data["label"];
            this.priority = _data["priority"];
        }
    }

    static fromJS(data: any): EmailAddress_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new EmailAddress_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInformationId"] = this.contactInformationId;
        data["contactInformation"] = this.contactInformation ? this.contactInformation.toJSON() : <any>undefined;
        data["address"] = this.address;
        data["label"] = this.label;
        data["priority"] = this.priority;
        return data;
    }
}

export interface IEmailAddress_DTO {
    id: number;
    contactInformationId: number;
    contactInformation?: ContactInformation_DTO | undefined;
    address: string;
    label: string;
    priority: number;
}

export class PhoneNumber_DTO implements IPhoneNumber_DTO {
    id!: number;
    contactInfoId!: number;
    countryCode!: string;
    areaCode!: string;
    prefix!: string;
    localNumber!: string;
    label!: string;
    priority!: number;

    constructor(data?: IPhoneNumber_DTO) {
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
            this.contactInfoId = _data["contactInfoId"];
            this.countryCode = _data["countryCode"];
            this.areaCode = _data["areaCode"];
            this.prefix = _data["prefix"];
            this.localNumber = _data["localNumber"];
            this.label = _data["label"];
            this.priority = _data["priority"];
        }
    }

    static fromJS(data: any): PhoneNumber_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new PhoneNumber_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInfoId"] = this.contactInfoId;
        data["countryCode"] = this.countryCode;
        data["areaCode"] = this.areaCode;
        data["prefix"] = this.prefix;
        data["localNumber"] = this.localNumber;
        data["label"] = this.label;
        data["priority"] = this.priority;
        return data;
    }
}

export interface IPhoneNumber_DTO {
    id: number;
    contactInfoId: number;
    countryCode: string;
    areaCode: string;
    prefix: string;
    localNumber: string;
    label: string;
    priority: number;
}

export class User implements IUser {
    id!: number;
    contactInfoId!: number;
    contactInfo?: ContactInformation | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    firstName!: string;
    middleName?: string | undefined;
    lastName!: string;
    version!: number;

    constructor(data?: IUser) {
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
            this.contactInfoId = _data["contactInfoId"];
            this.contactInfo = _data["contactInfo"] ? ContactInformation.fromJS(_data["contactInfo"]) : <any>undefined;
            this.prefix = _data["prefix"];
            this.suffix = _data["suffix"];
            this.firstName = _data["firstName"];
            this.middleName = _data["middleName"];
            this.lastName = _data["lastName"];
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): User {
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInfoId"] = this.contactInfoId;
        data["contactInfo"] = this.contactInfo ? this.contactInfo.toJSON() : <any>undefined;
        data["prefix"] = this.prefix;
        data["suffix"] = this.suffix;
        data["firstName"] = this.firstName;
        data["middleName"] = this.middleName;
        data["lastName"] = this.lastName;
        data["version"] = this.version;
        return data;
    }
}

export interface IUser {
    id: number;
    contactInfoId: number;
    contactInfo?: ContactInformation | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
    version: number;
}

export class ContactInformation implements IContactInformation {
    id!: number;
    userId!: number;
    user?: User | undefined;
    physicalAddresses?: PhysicalAddress[] | undefined;
    emailAddresses?: EmailAddress[] | undefined;
    phoneNumbers?: PhoneNumber[] | undefined;
    version!: number;

    constructor(data?: IContactInformation) {
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
            this.userId = _data["userId"];
            this.user = _data["user"] ? User.fromJS(_data["user"]) : <any>undefined;
            if (Array.isArray(_data["physicalAddresses"])) {
                this.physicalAddresses = [] as any;
                for (let item of _data["physicalAddresses"])
                    this.physicalAddresses!.push(PhysicalAddress.fromJS(item));
            }
            if (Array.isArray(_data["emailAddresses"])) {
                this.emailAddresses = [] as any;
                for (let item of _data["emailAddresses"])
                    this.emailAddresses!.push(EmailAddress.fromJS(item));
            }
            if (Array.isArray(_data["phoneNumbers"])) {
                this.phoneNumbers = [] as any;
                for (let item of _data["phoneNumbers"])
                    this.phoneNumbers!.push(PhoneNumber.fromJS(item));
            }
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): ContactInformation {
        data = typeof data === 'object' ? data : {};
        let result = new ContactInformation();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userId"] = this.userId;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        if (Array.isArray(this.physicalAddresses)) {
            data["physicalAddresses"] = [];
            for (let item of this.physicalAddresses)
                data["physicalAddresses"].push(item.toJSON());
        }
        if (Array.isArray(this.emailAddresses)) {
            data["emailAddresses"] = [];
            for (let item of this.emailAddresses)
                data["emailAddresses"].push(item.toJSON());
        }
        if (Array.isArray(this.phoneNumbers)) {
            data["phoneNumbers"] = [];
            for (let item of this.phoneNumbers)
                data["phoneNumbers"].push(item.toJSON());
        }
        data["version"] = this.version;
        return data;
    }
}

export interface IContactInformation {
    id: number;
    userId: number;
    user?: User | undefined;
    physicalAddresses?: PhysicalAddress[] | undefined;
    emailAddresses?: EmailAddress[] | undefined;
    phoneNumbers?: PhoneNumber[] | undefined;
    version: number;
}

export class PhysicalAddress implements IPhysicalAddress {
    id!: number;
    contactInfoId!: number;
    contactInfo?: ContactInformation | undefined;
    line1!: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city!: string;
    state!: string;
    postalCode!: string;
    addressType!: AddressType;
    version!: number;

    constructor(data?: IPhysicalAddress) {
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
            this.contactInfoId = _data["contactInfoId"];
            this.contactInfo = _data["contactInfo"] ? ContactInformation.fromJS(_data["contactInfo"]) : <any>undefined;
            this.line1 = _data["line1"];
            this.line2 = _data["line2"];
            this.line3 = _data["line3"];
            this.city = _data["city"];
            this.state = _data["state"];
            this.postalCode = _data["postalCode"];
            this.addressType = _data["addressType"];
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): PhysicalAddress {
        data = typeof data === 'object' ? data : {};
        let result = new PhysicalAddress();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInfoId"] = this.contactInfoId;
        data["contactInfo"] = this.contactInfo ? this.contactInfo.toJSON() : <any>undefined;
        data["line1"] = this.line1;
        data["line2"] = this.line2;
        data["line3"] = this.line3;
        data["city"] = this.city;
        data["state"] = this.state;
        data["postalCode"] = this.postalCode;
        data["addressType"] = this.addressType;
        data["version"] = this.version;
        return data;
    }
}

export interface IPhysicalAddress {
    id: number;
    contactInfoId: number;
    contactInfo?: ContactInformation | undefined;
    line1: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city: string;
    state: string;
    postalCode: string;
    addressType: AddressType;
    version: number;
}

export class EmailAddress implements IEmailAddress {
    id!: number;
    contactInfoId!: number;
    contactInfo?: ContactInformation | undefined;
    address!: string;
    label!: string;
    priority!: number;
    version!: number;

    constructor(data?: IEmailAddress) {
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
            this.contactInfoId = _data["contactInfoId"];
            this.contactInfo = _data["contactInfo"] ? ContactInformation.fromJS(_data["contactInfo"]) : <any>undefined;
            this.address = _data["address"];
            this.label = _data["label"];
            this.priority = _data["priority"];
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): EmailAddress {
        data = typeof data === 'object' ? data : {};
        let result = new EmailAddress();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInfoId"] = this.contactInfoId;
        data["contactInfo"] = this.contactInfo ? this.contactInfo.toJSON() : <any>undefined;
        data["address"] = this.address;
        data["label"] = this.label;
        data["priority"] = this.priority;
        data["version"] = this.version;
        return data;
    }
}

export interface IEmailAddress {
    id: number;
    contactInfoId: number;
    contactInfo?: ContactInformation | undefined;
    address: string;
    label: string;
    priority: number;
    version: number;
}

export class PhoneNumber implements IPhoneNumber {
    id!: number;
    contactInfoId!: number;
    contactInfo?: ContactInformation | undefined;
    countryCode!: string;
    areaCode!: string;
    prefix!: string;
    localNumber!: string;
    label!: string;
    priority!: number;
    version!: number;

    constructor(data?: IPhoneNumber) {
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
            this.contactInfoId = _data["contactInfoId"];
            this.contactInfo = _data["contactInfo"] ? ContactInformation.fromJS(_data["contactInfo"]) : <any>undefined;
            this.countryCode = _data["countryCode"];
            this.areaCode = _data["areaCode"];
            this.prefix = _data["prefix"];
            this.localNumber = _data["localNumber"];
            this.label = _data["label"];
            this.priority = _data["priority"];
            this.version = _data["version"];
        }
    }

    static fromJS(data: any): PhoneNumber {
        data = typeof data === 'object' ? data : {};
        let result = new PhoneNumber();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInfoId"] = this.contactInfoId;
        data["contactInfo"] = this.contactInfo ? this.contactInfo.toJSON() : <any>undefined;
        data["countryCode"] = this.countryCode;
        data["areaCode"] = this.areaCode;
        data["prefix"] = this.prefix;
        data["localNumber"] = this.localNumber;
        data["label"] = this.label;
        data["priority"] = this.priority;
        data["version"] = this.version;
        return data;
    }
}

export interface IPhoneNumber {
    id: number;
    contactInfoId: number;
    contactInfo?: ContactInformation | undefined;
    countryCode: string;
    areaCode: string;
    prefix: string;
    localNumber: string;
    label: string;
    priority: number;
    version: number;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}
