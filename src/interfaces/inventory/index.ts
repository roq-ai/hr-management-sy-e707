import { StorageUnitInterface } from 'interfaces/storage-unit';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  item_name: string;
  quantity: number;
  location: string;
  storage_unit_id: string;
  last_updated?: any;
  created_at?: any;
  updated_at?: any;

  storage_unit?: StorageUnitInterface;
  _count?: {};
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  item_name?: string;
  location?: string;
  storage_unit_id?: string;
}
