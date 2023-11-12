import { MerchantDocument } from "./merchantDocument.model";

export class UnapprovedMerchant{
    name: string;
    contactNum: string;
    email: string;
    description: string;
    documents: MerchantDocument[];
    status: string;
    _id:string;
  static _id: string;
}
