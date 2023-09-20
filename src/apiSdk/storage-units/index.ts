import axios from 'axios';
import queryString from 'query-string';
import { StorageUnitInterface, StorageUnitGetQueryInterface } from 'interfaces/storage-unit';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getStorageUnits = async (
  query?: StorageUnitGetQueryInterface,
): Promise<PaginatedInterface<StorageUnitInterface>> => {
  const response = await axios.get('/api/storage-units', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createStorageUnit = async (storageUnit: StorageUnitInterface) => {
  const response = await axios.post('/api/storage-units', storageUnit);
  return response.data;
};

export const updateStorageUnitById = async (id: string, storageUnit: StorageUnitInterface) => {
  const response = await axios.put(`/api/storage-units/${id}`, storageUnit);
  return response.data;
};

export const getStorageUnitById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/storage-units/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStorageUnitById = async (id: string) => {
  const response = await axios.delete(`/api/storage-units/${id}`);
  return response.data;
};
