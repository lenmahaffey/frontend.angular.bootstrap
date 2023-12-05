export class Contact_DTO implements IContact_DTO {
    businessName?: string | undefined;
    competitor?: Competitor_DTO | undefined;
    competitorContacts?: CompetitorContact_DTO[] | undefined;
    contactInformation?: ContactInformation_DTO | undefined;
    customer?: Customer_DTO | undefined;
    customerContacts?: CustomerContact_DTO[] | undefined;
    description?: string | undefined;
    employee?: Employee_DTO | undefined;
    firstName!: string;
    freelancer?: Freelancer_DTO | undefined;
    id!: number;
    isBusiness!: boolean;
    lastName!: string;
    manufacturer?: Manufacturer_DTO | undefined;
    manufacturerContacts?: ManufacturerContact_DTO[] | undefined;
    middleName?: string | undefined;
    preferredName?: string | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    title?: string | undefined;
    user?: User_DTO | undefined;
    vendor?: Vendor_DTO | undefined;
    vendorContacts?: VendorContact_DTO[] | undefined;
    venue?: Venue_DTO | undefined;
    venueContacts?: VenueContact_DTO[] | undefined;

    constructor(data?: IContact_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.businessName = _data["businessName"];
            this.competitor = _data["competitor"] ? Competitor_DTO.fromJS(_data["competitor"]) : <any>undefined;
            if (Array.isArray(_data["competitorContacts"])) {
                this.competitorContacts = [] as any;
                for (let item of _data["competitorContacts"])
                    this.competitorContacts!.push(CompetitorContact_DTO.fromJS(item));
            }
            this.contactInformation = _data["contactInformation"] ? ContactInformation_DTO.fromJS(_data["contactInformation"]) : <any>undefined;
            this.customer = _data["customer"] ? Customer_DTO.fromJS(_data["customer"]) : <any>undefined;
            if (Array.isArray(_data["customerContacts"])) {
                this.customerContacts = [] as any;
                for (let item of _data["customerContacts"])
                    this.customerContacts!.push(CustomerContact_DTO.fromJS(item));
            }
            this.description = _data["description"];
            this.employee = _data["employee"] ? Employee_DTO.fromJS(_data["employee"]) : <any>undefined;
            this.firstName = _data["firstName"];
            this.freelancer = _data["freelancer"] ? Freelancer_DTO.fromJS(_data["freelancer"]) : <any>undefined;
            this.id = _data["id"];
            this.isBusiness = _data["isBusiness"];
            this.lastName = _data["lastName"];
            this.manufacturer = _data["manufacturer"] ? Manufacturer_DTO.fromJS(_data["manufacturer"]) : <any>undefined;
            if (Array.isArray(_data["manufacturerContacts"])) {
                this.manufacturerContacts = [] as any;
                for (let item of _data["manufacturerContacts"])
                    this.manufacturerContacts!.push(ManufacturerContact_DTO.fromJS(item));
            }
            this.middleName = _data["middleName"];
            this.preferredName = _data["preferredName"];
            this.prefix = _data["prefix"];
            this.suffix = _data["suffix"];
            this.title = _data["title"];
            this.user = _data["user"] ? User_DTO.fromJS(_data["user"]) : <any>undefined;
            this.vendor = _data["vendor"] ? Vendor_DTO.fromJS(_data["vendor"]) : <any>undefined;
            if (Array.isArray(_data["vendorContacts"])) {
                this.vendorContacts = [] as any;
                for (let item of _data["vendorContacts"])
                    this.vendorContacts!.push(VendorContact_DTO.fromJS(item));
            }
            this.venue = _data["venue"] ? Venue_DTO.fromJS(_data["venue"]) : <any>undefined;
            if (Array.isArray(_data["venueContacts"])) {
                this.venueContacts = [] as any;
                for (let item of _data["venueContacts"])
                    this.venueContacts!.push(VenueContact_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Contact_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Contact_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["businessName"] = this.businessName;
        data["competitor"] = this.competitor ? this.competitor.toJSON() : <any>undefined;
        if (Array.isArray(this.competitorContacts)) {
            data["competitorContacts"] = [];
            for (let item of this.competitorContacts)
                data["competitorContacts"].push(item.toJSON());
        }
        data["contactInformation"] = this.contactInformation ? this.contactInformation.toJSON() : <any>undefined;
        data["customer"] = this.customer ? this.customer.toJSON() : <any>undefined;
        if (Array.isArray(this.customerContacts)) {
            data["customerContacts"] = [];
            for (let item of this.customerContacts)
                data["customerContacts"].push(item.toJSON());
        }
        data["description"] = this.description;
        data["employee"] = this.employee ? this.employee.toJSON() : <any>undefined;
        data["firstName"] = this.firstName;
        data["freelancer"] = this.freelancer ? this.freelancer.toJSON() : <any>undefined;
        data["id"] = this.id;
        data["isBusiness"] = this.isBusiness;
        data["lastName"] = this.lastName;
        data["manufacturer"] = this.manufacturer ? this.manufacturer.toJSON() : <any>undefined;
        if (Array.isArray(this.manufacturerContacts)) {
            data["manufacturerContacts"] = [];
            for (let item of this.manufacturerContacts)
                data["manufacturerContacts"].push(item.toJSON());
        }
        data["middleName"] = this.middleName;
        data["preferredName"] = this.preferredName;
        data["prefix"] = this.prefix;
        data["suffix"] = this.suffix;
        data["title"] = this.title;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["vendor"] = this.vendor ? this.vendor.toJSON() : <any>undefined;
        if (Array.isArray(this.vendorContacts)) {
            data["vendorContacts"] = [];
            for (let item of this.vendorContacts)
                data["vendorContacts"].push(item.toJSON());
        }
        data["venue"] = this.venue ? this.venue.toJSON() : <any>undefined;
        if (Array.isArray(this.venueContacts)) {
            data["venueContacts"] = [];
            for (let item of this.venueContacts)
                data["venueContacts"].push(item.toJSON());
        }
        return data;
    }
}

export interface IContact_DTO {
    businessName?: string | undefined;
    competitor?: Competitor_DTO | undefined;
    competitorContacts?: CompetitorContact_DTO[] | undefined;
    contactInformation?: ContactInformation_DTO | undefined;
    customer?: Customer_DTO | undefined;
    customerContacts?: CustomerContact_DTO[] | undefined;
    description?: string | undefined;
    employee?: Employee_DTO | undefined;
    firstName: string;
    freelancer?: Freelancer_DTO | undefined;
    id: number;
    isBusiness: boolean;
    lastName: string;
    manufacturer?: Manufacturer_DTO | undefined;
    manufacturerContacts?: ManufacturerContact_DTO[] | undefined;
    middleName?: string | undefined;
    preferredName?: string | undefined;
    prefix?: string | undefined;
    suffix?: string | undefined;
    title?: string | undefined;
    user?: User_DTO | undefined;
    vendor?: Vendor_DTO | undefined;
    vendorContacts?: VendorContact_DTO[] | undefined;
    venue?: Venue_DTO | undefined;
    venueContacts?: VenueContact_DTO[] | undefined;
}

export class Competitor_DTO implements ICompetitor_DTO {
    id!: number;
    contactId!: number;
    contact?: Contact_DTO | undefined;
    contacts?: CompetitorContact_DTO[] | undefined;

    constructor(data?: ICompetitor_DTO) {
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
            this.contactId = _data["contactId"];
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
            if (Array.isArray(_data["contacts"])) {
                this.contacts = [] as any;
                for (let item of _data["contacts"])
                    this.contacts!.push(CompetitorContact_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Competitor_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Competitor_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactId"] = this.contactId;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        if (Array.isArray(this.contacts)) {
            data["contacts"] = [];
            for (let item of this.contacts)
                data["contacts"].push(item.toJSON());
        }
        return data;
    }
}

export interface ICompetitor_DTO {
    id: number;
    contactId: number;
    contact?: Contact_DTO | undefined;
    contacts?: CompetitorContact_DTO[] | undefined;
}

export class CompetitorContact_DTO implements ICompetitorContact_DTO {
    competitorId!: number;
    contactId!: number;
    competitor?: Competitor_DTO | undefined;
    contact?: Contact_DTO | undefined;

    constructor(data?: ICompetitorContact_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.competitorId = _data["competitorId"];
            this.contactId = _data["contactId"];
            this.competitor = _data["competitor"] ? Competitor_DTO.fromJS(_data["competitor"]) : <any>undefined;
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CompetitorContact_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new CompetitorContact_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["competitorId"] = this.competitorId;
        data["contactId"] = this.contactId;
        data["competitor"] = this.competitor ? this.competitor.toJSON() : <any>undefined;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        return data;
    }
}

export interface ICompetitorContact_DTO {
    competitorId: number;
    contactId: number;
    competitor?: Competitor_DTO | undefined;
    contact?: Contact_DTO | undefined;
}

export class ContactInformation_DTO implements IContactInformation_DTO {
    id!: number;
    userId!: number;
    contact?: Contact_DTO | undefined;
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
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
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
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
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
    contact?: Contact_DTO | undefined;
    physicalAddresses?: PhysicalAddress_DTO[] | undefined;
    emailAddresses?: EmailAddress_DTO[] | undefined;
    phoneNumbers?: PhoneNumber_DTO[] | undefined;
}

export class PhysicalAddress_DTO implements IPhysicalAddress_DTO {
    id!: number;
    contactInformationId!: number;
    contactInformation?: ContactInformation_DTO | undefined;
    line1!: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city!: string;
    state!: string;
    postalCode!: string;
    addressType!: AddressType;
    version!: number;

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
            this.contactInformationId = _data["contactInformationId"];
            this.contactInformation = _data["contactInformation"] ? ContactInformation_DTO.fromJS(_data["contactInformation"]) : <any>undefined;
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

    static fromJS(data: any): PhysicalAddress_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new PhysicalAddress_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactInformationId"] = this.contactInformationId;
        data["contactInformation"] = this.contactInformation ? this.contactInformation.toJSON() : <any>undefined;
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

export interface IPhysicalAddress_DTO {
    id: number;
    contactInformationId: number;
    contactInformation?: ContactInformation_DTO | undefined;
    line1: string;
    line2?: string | undefined;
    line3?: string | undefined;
    city: string;
    state: string;
    postalCode: string;
    addressType: AddressType;
    version: number;
}

export enum AddressType {
    Mailing = 0,
    Billing = 1,
    Shipping = 2,
}

export class EmailAddress_DTO implements IEmailAddress_DTO {
    id!: number;
    contactInformationId!: number;
    user?: User_DTO | undefined;
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
            this.user = _data["user"] ? User_DTO.fromJS(_data["user"]) : <any>undefined;
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
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
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
    user?: User_DTO | undefined;
    contactInformation?: ContactInformation_DTO | undefined;
    address: string;
    label: string;
    priority: number;
}

export class User_DTO implements IUser_DTO {
    customer?: Customer_DTO | undefined;
    emailAddress?: EmailAddress_DTO | undefined;
    emailAddressId!: number;
    employee?: Employee_DTO | undefined;
    freelancer?: Freelancer_DTO | undefined;
    id!: number;
    userName!: string;
    version!: number;

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
            this.customer = _data["customer"] ? Customer_DTO.fromJS(_data["customer"]) : <any>undefined;
            this.emailAddress = _data["emailAddress"] ? EmailAddress_DTO.fromJS(_data["emailAddress"]) : <any>undefined;
            this.emailAddressId = _data["emailAddressId"];
            this.employee = _data["employee"] ? Employee_DTO.fromJS(_data["employee"]) : <any>undefined;
            this.freelancer = _data["freelancer"] ? Freelancer_DTO.fromJS(_data["freelancer"]) : <any>undefined;
            this.id = _data["id"];
            this.userName = _data["userName"];
            this.version = _data["version"];
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
        data["customer"] = this.customer ? this.customer.toJSON() : <any>undefined;
        data["emailAddress"] = this.emailAddress ? this.emailAddress.toJSON() : <any>undefined;
        data["emailAddressId"] = this.emailAddressId;
        data["employee"] = this.employee ? this.employee.toJSON() : <any>undefined;
        data["freelancer"] = this.freelancer ? this.freelancer.toJSON() : <any>undefined;
        data["id"] = this.id;
        data["userName"] = this.userName;
        data["version"] = this.version;
        return data;
    }
}

export interface IUser_DTO {
    customer?: Customer_DTO | undefined;
    emailAddress?: EmailAddress_DTO | undefined;
    emailAddressId: number;
    employee?: Employee_DTO | undefined;
    freelancer?: Freelancer_DTO | undefined;
    id: number;
    userName: string;
    version: number;
}

export class Customer_DTO implements ICustomer_DTO {
    id!: number;
    contactId!: number;
    contact?: Contact_DTO | undefined;
    user?: User_DTO | undefined;
    customerContacts?: CustomerContact_DTO[] | undefined;

    constructor(data?: ICustomer_DTO) {
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
            this.contactId = _data["contactId"];
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
            this.user = _data["user"] ? User_DTO.fromJS(_data["user"]) : <any>undefined;
            if (Array.isArray(_data["customerContacts"])) {
                this.customerContacts = [] as any;
                for (let item of _data["customerContacts"])
                    this.customerContacts!.push(CustomerContact_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Customer_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Customer_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactId"] = this.contactId;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        if (Array.isArray(this.customerContacts)) {
            data["customerContacts"] = [];
            for (let item of this.customerContacts)
                data["customerContacts"].push(item.toJSON());
        }
        return data;
    }
}

export interface ICustomer_DTO {
    id: number;
    contactId: number;
    contact?: Contact_DTO | undefined;
    user?: User_DTO | undefined;
    customerContacts?: CustomerContact_DTO[] | undefined;
}

export class CustomerContact_DTO implements ICustomerContact_DTO {
    customerId!: number;
    contactId!: number;
    customer?: Customer_DTO | undefined;
    contact?: Contact_DTO | undefined;

    constructor(data?: ICustomerContact_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.customerId = _data["customerId"];
            this.contactId = _data["contactId"];
            this.customer = _data["customer"] ? Customer_DTO.fromJS(_data["customer"]) : <any>undefined;
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CustomerContact_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerContact_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["customerId"] = this.customerId;
        data["contactId"] = this.contactId;
        data["customer"] = this.customer ? this.customer.toJSON() : <any>undefined;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        return data;
    }
}

export interface ICustomerContact_DTO {
    customerId: number;
    contactId: number;
    customer?: Customer_DTO | undefined;
    contact?: Contact_DTO | undefined;
}

export class Employee_DTO implements IEmployee_DTO {
    id!: number;
    userId?: number | undefined;
    contactId!: number;
    user?: User_DTO | undefined;
    contact?: Contact_DTO | undefined;

    constructor(data?: IEmployee_DTO) {
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
            this.contactId = _data["contactId"];
            this.user = _data["user"] ? User_DTO.fromJS(_data["user"]) : <any>undefined;
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
        }
    }

    static fromJS(data: any): Employee_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Employee_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userId"] = this.userId;
        data["contactId"] = this.contactId;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        return data;
    }
}

export interface IEmployee_DTO {
    id: number;
    userId?: number | undefined;
    contactId: number;
    user?: User_DTO | undefined;
    contact?: Contact_DTO | undefined;
}

export class Freelancer_DTO implements IFreelancer_DTO {
    contact?: Contact_DTO | undefined;
    contactId!: number;
    id!: number;
    user?: User_DTO | undefined;
    userId?: number | undefined;

    constructor(data?: IFreelancer_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
            this.contactId = _data["contactId"];
            this.id = _data["id"];
            this.user = _data["user"] ? User_DTO.fromJS(_data["user"]) : <any>undefined;
            this.userId = _data["userId"];
        }
    }

    static fromJS(data: any): Freelancer_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Freelancer_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        data["contactId"] = this.contactId;
        data["id"] = this.id;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["userId"] = this.userId;
        return data;
    }
}

export interface IFreelancer_DTO {
    contact?: Contact_DTO | undefined;
    contactId: number;
    id: number;
    user?: User_DTO | undefined;
    userId?: number | undefined;
}

export class PhoneNumber_DTO implements IPhoneNumber_DTO {
    id!: number;
    contactInformationId!: number;
    contactInformation?: ContactInformation_DTO | undefined;
    countryCode!: string;
    areaCode!: string;
    prefix!: string;
    localNumber!: string;
    label!: string;
    priority!: number;
    version!: number;

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
            this.contactInformationId = _data["contactInformationId"];
            this.contactInformation = _data["contactInformation"] ? ContactInformation_DTO.fromJS(_data["contactInformation"]) : <any>undefined;
            this.countryCode = _data["countryCode"];
            this.areaCode = _data["areaCode"];
            this.prefix = _data["prefix"];
            this.localNumber = _data["localNumber"];
            this.label = _data["label"];
            this.priority = _data["priority"];
            this.version = _data["version"];
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
        data["contactInformationId"] = this.contactInformationId;
        data["contactInformation"] = this.contactInformation ? this.contactInformation.toJSON() : <any>undefined;
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

export interface IPhoneNumber_DTO {
    id: number;
    contactInformationId: number;
    contactInformation?: ContactInformation_DTO | undefined;
    countryCode: string;
    areaCode: string;
    prefix: string;
    localNumber: string;
    label: string;
    priority: number;
    version: number;
}

export class Manufacturer_DTO implements IManufacturer_DTO {
    id!: number;
    contactId!: number;
    contact?: Contact_DTO | undefined;
    contacts?: ManufacturerContact_DTO[] | undefined;

    constructor(data?: IManufacturer_DTO) {
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
            this.contactId = _data["contactId"];
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
            if (Array.isArray(_data["contacts"])) {
                this.contacts = [] as any;
                for (let item of _data["contacts"])
                    this.contacts!.push(ManufacturerContact_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Manufacturer_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Manufacturer_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactId"] = this.contactId;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        if (Array.isArray(this.contacts)) {
            data["contacts"] = [];
            for (let item of this.contacts)
                data["contacts"].push(item.toJSON());
        }
        return data;
    }
}

export interface IManufacturer_DTO {
    id: number;
    contactId: number;
    contact?: Contact_DTO | undefined;
    contacts?: ManufacturerContact_DTO[] | undefined;
}

export class ManufacturerContact_DTO implements IManufacturerContact_DTO {
    manufacturerId!: number;
    contactId!: number;
    manufacturer?: Manufacturer_DTO | undefined;
    contact?: Contact_DTO | undefined;

    constructor(data?: IManufacturerContact_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.manufacturerId = _data["manufacturerId"];
            this.contactId = _data["contactId"];
            this.manufacturer = _data["manufacturer"] ? Manufacturer_DTO.fromJS(_data["manufacturer"]) : <any>undefined;
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
        }
    }

    static fromJS(data: any): ManufacturerContact_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new ManufacturerContact_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["manufacturerId"] = this.manufacturerId;
        data["contactId"] = this.contactId;
        data["manufacturer"] = this.manufacturer ? this.manufacturer.toJSON() : <any>undefined;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        return data;
    }
}

export interface IManufacturerContact_DTO {
    manufacturerId: number;
    contactId: number;
    manufacturer?: Manufacturer_DTO | undefined;
    contact?: Contact_DTO | undefined;
}

export class Vendor_DTO implements IVendor_DTO {
    id!: number;
    contactId!: number;
    contact?: Contact_DTO | undefined;
    contacts?: VendorContact_DTO[] | undefined;

    constructor(data?: IVendor_DTO) {
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
            this.contactId = _data["contactId"];
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
            if (Array.isArray(_data["contacts"])) {
                this.contacts = [] as any;
                for (let item of _data["contacts"])
                    this.contacts!.push(VendorContact_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Vendor_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Vendor_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactId"] = this.contactId;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        if (Array.isArray(this.contacts)) {
            data["contacts"] = [];
            for (let item of this.contacts)
                data["contacts"].push(item.toJSON());
        }
        return data;
    }
}

export interface IVendor_DTO {
    id: number;
    contactId: number;
    contact?: Contact_DTO | undefined;
    contacts?: VendorContact_DTO[] | undefined;
}

export class VendorContact_DTO implements IVendorContact_DTO {
    vendorId!: number;
    contactId!: number;
    vendor?: Vendor_DTO | undefined;
    contact?: Contact_DTO | undefined;

    constructor(data?: IVendorContact_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.vendorId = _data["vendorId"];
            this.contactId = _data["contactId"];
            this.vendor = _data["vendor"] ? Vendor_DTO.fromJS(_data["vendor"]) : <any>undefined;
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
        }
    }

    static fromJS(data: any): VendorContact_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new VendorContact_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["vendorId"] = this.vendorId;
        data["contactId"] = this.contactId;
        data["vendor"] = this.vendor ? this.vendor.toJSON() : <any>undefined;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        return data;
    }
}

export interface IVendorContact_DTO {
    vendorId: number;
    contactId: number;
    vendor?: Vendor_DTO | undefined;
    contact?: Contact_DTO | undefined;
}

export class Venue_DTO implements IVenue_DTO {
    id!: number;
    contactId!: number;
    contact?: Contact_DTO | undefined;
    contacts?: VenueContact_DTO[] | undefined;

    constructor(data?: IVenue_DTO) {
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
            this.contactId = _data["contactId"];
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
            if (Array.isArray(_data["contacts"])) {
                this.contacts = [] as any;
                for (let item of _data["contacts"])
                    this.contacts!.push(VenueContact_DTO.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Venue_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new Venue_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contactId"] = this.contactId;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        if (Array.isArray(this.contacts)) {
            data["contacts"] = [];
            for (let item of this.contacts)
                data["contacts"].push(item.toJSON());
        }
        return data;
    }
}

export interface IVenue_DTO {
    id: number;
    contactId: number;
    contact?: Contact_DTO | undefined;
    contacts?: VenueContact_DTO[] | undefined;
}

export class VenueContact_DTO implements IVenueContact_DTO {
    venueId!: number;
    contactId!: number;
    venue?: Venue_DTO | undefined;
    contact?: Contact_DTO | undefined;

    constructor(data?: IVenueContact_DTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.venueId = _data["venueId"];
            this.contactId = _data["contactId"];
            this.venue = _data["venue"] ? Venue_DTO.fromJS(_data["venue"]) : <any>undefined;
            this.contact = _data["contact"] ? Contact_DTO.fromJS(_data["contact"]) : <any>undefined;
        }
    }

    static fromJS(data: any): VenueContact_DTO {
        data = typeof data === 'object' ? data : {};
        let result = new VenueContact_DTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["venueId"] = this.venueId;
        data["contactId"] = this.contactId;
        data["venue"] = this.venue ? this.venue.toJSON() : <any>undefined;
        data["contact"] = this.contact ? this.contact.toJSON() : <any>undefined;
        return data;
    }
}

export interface IVenueContact_DTO {
    venueId: number;
    contactId: number;
    venue?: Venue_DTO | undefined;
    contact?: Contact_DTO | undefined;
}

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
    salesItems?: InventorySalesItem_DTO[] | undefined;

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
            if (Array.isArray(_data["salesItems"])) {
                this.salesItems = [] as any;
                for (let item of _data["salesItems"])
                    this.salesItems!.push(InventorySalesItem_DTO.fromJS(item));
            }
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
        if (Array.isArray(this.salesItems)) {
            data["salesItems"] = [];
            for (let item of this.salesItems)
                data["salesItems"].push(item.toJSON());
        }
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
    salesItems?: InventorySalesItem_DTO[] | undefined;
}

export class InventoryItemCategory_DTO implements IInventoryItemCategory_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    version!: number;
    types?: InventoryItemType_DTO[] | undefined;
    inventoryItems?: InventoryItem_DTO[] | undefined;
    salesItems?: SalesItem_DTO[] | undefined;

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
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem_DTO.fromJS(item));
            }
            if (Array.isArray(_data["salesItems"])) {
                this.salesItems = [] as any;
                for (let item of _data["salesItems"])
                    this.salesItems!.push(SalesItem_DTO.fromJS(item));
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
        if (Array.isArray(this.salesItems)) {
            data["salesItems"] = [];
            for (let item of this.salesItems)
                data["salesItems"].push(item.toJSON());
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
    inventoryItems?: InventoryItem_DTO[] | undefined;
    salesItems?: SalesItem_DTO[] | undefined;
}

export class InventoryItemType_DTO implements IInventoryItemType_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    categoryId!: number;
    version!: number;
    category?: InventoryItemCategory_DTO | undefined;
    subTypes?: InventoryItemSubType_DTO[] | undefined;
    inventoryItems?: InventoryItem_DTO[] | undefined;
    salesItems?: SalesItem_DTO[] | undefined;

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
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem_DTO.fromJS(item));
            }
            if (Array.isArray(_data["salesItems"])) {
                this.salesItems = [] as any;
                for (let item of _data["salesItems"])
                    this.salesItems!.push(SalesItem_DTO.fromJS(item));
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
        if (Array.isArray(this.salesItems)) {
            data["salesItems"] = [];
            for (let item of this.salesItems)
                data["salesItems"].push(item.toJSON());
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
    inventoryItems?: InventoryItem_DTO[] | undefined;
    salesItems?: SalesItem_DTO[] | undefined;
}

export class InventoryItemSubType_DTO implements IInventoryItemSubType_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    typeId!: number;
    version!: number;
    type?: InventoryItemType_DTO | undefined;
    inventoryItems?: InventoryItem_DTO[] | undefined;
    salesItems?: SalesItem_DTO[] | undefined;

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
            if (Array.isArray(_data["inventoryItems"])) {
                this.inventoryItems = [] as any;
                for (let item of _data["inventoryItems"])
                    this.inventoryItems!.push(InventoryItem_DTO.fromJS(item));
            }
            if (Array.isArray(_data["salesItems"])) {
                this.salesItems = [] as any;
                for (let item of _data["salesItems"])
                    this.salesItems!.push(SalesItem_DTO.fromJS(item));
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
        if (Array.isArray(this.salesItems)) {
            data["salesItems"] = [];
            for (let item of this.salesItems)
                data["salesItems"].push(item.toJSON());
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
    type?: InventoryItemType_DTO | undefined;
    inventoryItems?: InventoryItem_DTO[] | undefined;
    salesItems?: SalesItem_DTO[] | undefined;
}

export class SalesItem_DTO implements ISalesItem_DTO {
    id!: number;
    name!: string;
    description?: string | undefined;
    categoryId!: number;
    category?: InventoryItemCategory_DTO | undefined;
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
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.description = _data["description"];
            this.categoryId = _data["categoryId"];
            this.category = _data["category"] ? InventoryItemCategory_DTO.fromJS(_data["category"]) : <any>undefined;
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
    category?: InventoryItemCategory_DTO | undefined;
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
    salesItem?: SalesItem_DTO | undefined;

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
            this.salesItem = _data["salesItem"] ? SalesItem_DTO.fromJS(_data["salesItem"]) : <any>undefined;
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
        data["salesItem"] = this.salesItem ? this.salesItem.toJSON() : <any>undefined;
        return data;
    }
}

export interface IInventorySalesItem_DTO {
    inventoryItemId: number;
    salesItemId: number;
    quantity: number;
    inventoryItem?: InventoryItem_DTO | undefined;
    salesItem?: SalesItem_DTO | undefined;
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

