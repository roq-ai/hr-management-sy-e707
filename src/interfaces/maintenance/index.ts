import { StorageUnitInterface } from 'interfaces/storage-unit';
import { GetQueryInterface } from 'interfaces';

export interface MaintenanceInterface {
  id?: string;
  maintenance_date: any;
  maintenance_type: string;
  description?: string;
  cost: number;
  storage_unit_id: string;
  created_at?: any;
  updated_at?: any;

  storage_unit?: StorageUnitInterface;
  _count?: {};
}

export interface MaintenanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  maintenance_type?: string;
  description?: string;
  storage_unit_id?: string;
}
