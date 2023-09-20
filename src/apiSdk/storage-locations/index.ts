import axios from 'axios';
import queryString from 'query-string';
import { StorageLocationInterface, StorageLocationGetQueryInterface } from 'interfaces/storage-location';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getStorageLocations = async (
  query?: StorageLocationGetQueryInterface,
): Promise<PaginatedInterface<StorageLocationInterface>> => {
  const response = await axios.get('/api/storage-locations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createStorageLocation = async (storageLocation: StorageLocationInterface) => {
  const response = await axios.post('/api/storage-locations', storageLocation);
  return response.data;
};

export const updateStorageLocationById = async (id: string, storageLocation: StorageLocationInterface) => {
  const response = await axios.put(`/api/storage-locations/${id}`, storageLocation);
  return response.data;
};

export const getStorageLocationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/storage-locations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStorageLocationById = async (id: string) => {
  const response = await axios.delete(`/api/storage-locations/${id}`);
  return response.data;
};
