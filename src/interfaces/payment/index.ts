import { GetQueryInterface } from 'interfaces';

export interface PaymentInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface PaymentGetQueryInterface extends GetQueryInterface {
  id?: string;
}
