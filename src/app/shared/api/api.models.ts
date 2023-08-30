export class User implements IUser {
    id!: number;
    mailingAddressId?: number | undefined;
    mailingAddress?: PhysicalAddress | undefined;
    billingAddressId?: number | undefined;
    billingAddress?: PhysicalAddress | undefined;
    shippingAddressId?: number | undefined;
    shippingAddress?: PhysicalAddress | undefined;
    phoneNumber1Id?: number | undefined;
    phoneNumber1?: PhoneNumber | undefined;
    phoneNumber2Id?: number | undefined;
    phoneNumber2?: PhoneNumber | undefined;
    phoneNumber3Id?: number | undefined;
    phoneNumber3?: PhoneNumber | undefined;
    primaryEmailId!: number;
    primaryEmail?: EmailAddress | undefined;
    secondaryEmailId?: number | undefined;
    secondaryEmail?: EmailAddress | undefined;
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
            this.mailingAddressId = _data["mailingAddressId"];
            this.mailingAddress = _data["mailingAddress"] ? PhysicalAddress.fromJS(_data["mailingAddress"]) : <any>undefined;
            this.billingAddressId = _data["billingAddressId"];
            this.billingAddress = _data["billingAddress"] ? PhysicalAddress.fromJS(_data["billingAddress"]) : <any>undefined;
            this.shippingAddressId = _data["shippingAddressId"];
            this.shippingAddress = _data["shippingAddress"] ? PhysicalAddress.fromJS(_data["shippingAddress"]) : <any>undefined;
            this.phoneNumber1Id = _data["phoneNumber1Id"];
            this.phoneNumber1 = _data["phoneNumber1"] ? PhoneNumber.fromJS(_data["phoneNumber1"]) : <any>undefined;
            this.phoneNumber2Id = _data["phoneNumber2Id"];
            this.phoneNumber2 = _data["phoneNumber2"] ? PhoneNumber.fromJS(_data["phoneNumber2"]) : <any>undefined;
            this.phoneNumber3Id = _data["phoneNumber3Id"];
            this.phoneNumber3 = _data["phoneNumber3"] ? PhoneNumber.fromJS(_data["phoneNumber3"]) : <any>undefined;
            this.primaryEmailId = _data["primaryEmailId"];
            this.primaryEmail = _data["primaryEmail"] ? EmailAddress.fromJS(_data["primaryEmail"]) : <any>undefined;
            this.secondaryEmailId = _data["secondaryEmailId"];
            this.secondaryEmail = _data["secondaryEmail"] ? EmailAddress.fromJS(_data["secondaryEmail"]) : <any>undefined;
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
        data["mailingAddressId"] = this.mailingAddressId;
        data["mailingAddress"] = this.mailingAddress ? this.mailingAddress.toJSON() : <any>undefined;
        data["billingAddressId"] = this.billingAddressId;
        data["billingAddress"] = this.billingAddress ? this.billingAddress.toJSON() : <any>undefined;
        data["shippingAddressId"] = this.shippingAddressId;
        data["shippingAddress"] = this.shippingAddress ? this.shippingAddress.toJSON() : <any>undefined;
        data["phoneNumber1Id"] = this.phoneNumber1Id;
        data["phoneNumber1"] = this.phoneNumber1 ? this.phoneNumber1.toJSON() : <any>undefined;
        data["phoneNumber2Id"] = this.phoneNumber2Id;
        data["phoneNumber2"] = this.phoneNumber2 ? this.phoneNumber2.toJSON() : <any>undefined;
        data["phoneNumber3Id"] = this.phoneNumber3Id;
        data["phoneNumber3"] = this.phoneNumber3 ? this.phoneNumber3.toJSON() : <any>undefined;
        data["primaryEmailId"] = this.primaryEmailId;
        data["primaryEmail"] = this.primaryEmail ? this.primaryEmail.toJSON() : <any>undefined;
        data["secondaryEmailId"] = this.secondaryEmailId;
        data["secondaryEmail"] = this.secondaryEmail ? this.secondaryEmail.toJSON() : <any>undefined;
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
    mailingAddressId?: number | undefined;
    mailingAddress?: PhysicalAddress | undefined;
    billingAddressId?: number | undefined;
    billingAddress?: PhysicalAddress | undefined;
    shippingAddressId?: number | undefined;
    shippingAddress?: PhysicalAddress | undefined;
    phoneNumber1Id?: number | undefined;
    phoneNumber1?: PhoneNumber | undefined;
    phoneNumber2Id?: number | undefined;
    phoneNumber2?: PhoneNumber | undefined;
    phoneNumber3Id?: number | undefined;
    phoneNumber3?: PhoneNumber | undefined;
    primaryEmailId: number;
    primaryEmail?: EmailAddress | undefined;
    secondaryEmailId?: number | undefined;
    secondaryEmail?: EmailAddress | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
}

export class PhysicalAddress implements IPhysicalAddress {
    id!: number;
    line1!: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city!: string;
    state!: string;
    postalCode!: string;

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
            this.line1 = _data["line1"];
            this.line2 = _data["line2"];
            this.line3 = _data["line3"];
            this.city = _data["city"];
            this.state = _data["state"];
            this.postalCode = _data["postalCode"];
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
        data["line1"] = this.line1;
        data["line2"] = this.line2;
        data["line3"] = this.line3;
        data["city"] = this.city;
        data["state"] = this.state;
        data["postalCode"] = this.postalCode;
        return data;
    }
}

export interface IPhysicalAddress {
    id: number;
    line1: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city: string;
    state: string;
    postalCode: string;
}

export class PhoneNumber implements IPhoneNumber {
    id!: number;
    countryCode!: string;
    areaCode!: string;
    localNumber!: string;

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
            this.countryCode = _data["countryCode"];
            this.areaCode = _data["areaCode"];
            this.localNumber = _data["localNumber"];
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
        data["countryCode"] = this.countryCode;
        data["areaCode"] = this.areaCode;
        data["localNumber"] = this.localNumber;
        return data;
    }
}

export interface IPhoneNumber {
    id: number;
    countryCode: string;
    areaCode: string;
    localNumber: string;
}

export class EmailAddress implements IEmailAddress {
    id!: number;
    address!: string;

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
            this.address = _data["address"];
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
        data["address"] = this.address;
        return data;
    }
}

export interface IEmailAddress {
    id: number;
    address: string;
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
