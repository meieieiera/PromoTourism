import { MerchantDocument } from "../shared/models/merchantDocument.model";

export interface Merchant {
    name: string;
    contactNum: string;
    email: string;
    description: string;
    documents: MerchantDocument[];
    status: string;
}