import axios from 'axios';
import queryString from 'query-string';
import { SecurityInterface, SecurityGetQueryInterface } from 'interfaces/security';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSecurities = async (
  query?: SecurityGetQueryInterface,
): Promise<PaginatedInterface<SecurityInterface>> => {
  const response = await axios.get('/api/securities', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSecurity = async (security: SecurityInterface) => {
  const response = await axios.post('/api/securities', security);
  return response.data;
};

export const updateSecurityById = async (id: string, security: SecurityInterface) => {
  const response = await axios.put(`/api/securities/${id}`, security);
  return response.data;
};

export const getSecurityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/securities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSecurityById = async (id: string) => {
  const response = await axios.delete(`/api/securities/${id}`);
  return response.data;
};
