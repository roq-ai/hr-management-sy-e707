import { GetQueryInterface } from 'interfaces';

export interface SecurityInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface SecurityGetQueryInterface extends GetQueryInterface {
  id?: string;
}
