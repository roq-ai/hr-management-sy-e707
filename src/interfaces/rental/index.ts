import { UserInterface } from 'interfaces/user';
import { StorageUnitInterface } from 'interfaces/storage-unit';
import { GetQueryInterface } from 'interfaces';

export interface RentalInterface {
  id?: string;
  start_date: any;
  end_date: any;
  total_cost: number;
  user_id: string;
  storage_unit_id: string;
  payment_status: boolean;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  storage_unit?: StorageUnitInterface;
  _count?: {};
}

export interface RentalGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  storage_unit_id?: string;
}
