export class User implements IUser {
    id!: number;
    contactInfoId!: number;
    contactInfo?: ContactInfo | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    firstName!: string;
    middleName?: string | undefined;
    lastName!: string;

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
            this.contactInfo = _data["contactInfo"] ? ContactInfo.fromJS(_data["contactInfo"]) : <any>undefined;
            this.prefix = _data["prefix"];
            this.suffix = _data["suffix"];
            this.firstName = _data["firstName"];
            this.middleName = _data["middleName"];
            this.lastName = _data["lastName"];
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
        return data;
    }
}

export interface IUser {
    id: number;
    contactInfoId: number;
    contactInfo?: ContactInfo | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
}

export class ContactInfo implements IContactInfo {
    id!: number;
    userId!: number;
    physicalAddresses?: PhysicalAddress[] | undefined;
    emailAddresses?: EmailAddress[] | undefined;
    phoneNumbers?: PhoneNumber[] | undefined;

    constructor(data?: IContactInfo) {
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
        }
    }

    static fromJS(data: any): ContactInfo {
        data = typeof data === 'object' ? data : {};
        let result = new ContactInfo();
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

export interface IContactInfo {
    id: number;
    userId: number;
    physicalAddresses?: PhysicalAddress[] | undefined;
    emailAddresses?: EmailAddress[] | undefined;
    phoneNumbers?: PhoneNumber[] | undefined;
}

export class PhysicalAddress implements IPhysicalAddress {
    id!: number;
    contactInfoId!: number;
    line1!: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city!: string;
    state!: string;
    postalCode!: string;
    addressType!: AddressType;

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
            this.line1 = _data["line1"];
            this.line2 = _data["line2"];
            this.line3 = _data["line3"];
            this.city = _data["city"];
            this.state = _data["state"];
            this.postalCode = _data["postalCode"];
            this.addressType = _data["addressType"];
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

export interface IPhysicalAddress {
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

export class EmailAddress implements IEmailAddress {
    id!: number;
    contactInfoId!: number;
    address!: string;
    label!: string;
    priority!: number;

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
            this.address = _data["address"];
            this.label = _data["label"];
            this.priority = _data["priority"];
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
        data["address"] = this.address;
        data["label"] = this.label;
        data["priority"] = this.priority;
        return data;
    }
}

export interface IEmailAddress {
    id: number;
    contactInfoId: number;
    address: string;
    label: string;
    priority: number;
}

export class PhoneNumber implements IPhoneNumber {
    id!: number;
    contactInfoId!: number;
    countryCode!: string;
    areaCode!: string;
    prefix!: string;
    localNumber!: string;
    label!: string;
    priority!: number;

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
            this.countryCode = _data["countryCode"];
            this.areaCode = _data["areaCode"];
            this.prefix = _data["prefix"];
            this.localNumber = _data["localNumber"];
            this.label = _data["label"];
            this.priority = _data["priority"];
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
        data["countryCode"] = this.countryCode;
        data["areaCode"] = this.areaCode;
        data["prefix"] = this.prefix;
        data["localNumber"] = this.localNumber;
        data["label"] = this.label;
        data["priority"] = this.priority;
        return data;
    }
}

export interface IPhoneNumber {
    id: number;
    contactInfoId: number;
    countryCode: string;
    areaCode: string;
    prefix: string;
    localNumber: string;
    label: string;
    priority: number;
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
