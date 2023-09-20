import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
}
