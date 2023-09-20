import { GetQueryInterface } from 'interfaces';

export interface AccessLogInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface AccessLogGetQueryInterface extends GetQueryInterface {
  id?: string;
}
