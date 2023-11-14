import { Document } from "./document.model";
export class UnapprovedMerchant {
    id: string;
    name: string;
    contactNum: string;
    email: string;
    description: string;
    documents: Document[];
    status: string;
}