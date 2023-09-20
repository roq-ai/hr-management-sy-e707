import { GetQueryInterface } from 'interfaces';

export interface StorageLocationInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface StorageLocationGetQueryInterface extends GetQueryInterface {
  id?: string;
}
