import { StorageUnitInterface } from 'interfaces/storage-unit';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  storage_unit?: StorageUnitInterface[];
  user?: UserInterface;
  _count?: {
    storage_unit?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
