import { InventoryInterface } from 'interfaces/inventory';
import { MaintenanceInterface } from 'interfaces/maintenance';
import { RentalInterface } from 'interfaces/rental';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface StorageUnitInterface {
  id?: string;
  unit_number: number;
  size: string;
  availability_status: boolean;
  rent_price: number;
  business_id: string;
  last_maintenance_date?: any;
  created_at?: any;
  updated_at?: any;
  inventory?: InventoryInterface[];
  maintenance?: MaintenanceInterface[];
  rental?: RentalInterface[];
  organization?: OrganizationInterface;
  _count?: {
    inventory?: number;
    maintenance?: number;
    rental?: number;
  };
}

export interface StorageUnitGetQueryInterface extends GetQueryInterface {
  id?: string;
  size?: string;
  business_id?: string;
}
