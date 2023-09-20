import axios from 'axios';
import queryString from 'query-string';
import { AccessLogInterface, AccessLogGetQueryInterface } from 'interfaces/access-log';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAccessLogs = async (
  query?: AccessLogGetQueryInterface,
): Promise<PaginatedInterface<AccessLogInterface>> => {
  const response = await axios.get('/api/access-logs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAccessLog = async (accessLog: AccessLogInterface) => {
  const response = await axios.post('/api/access-logs', accessLog);
  return response.data;
};

export const updateAccessLogById = async (id: string, accessLog: AccessLogInterface) => {
  const response = await axios.put(`/api/access-logs/${id}`, accessLog);
  return response.data;
};

export const getAccessLogById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/access-logs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAccessLogById = async (id: string) => {
  const response = await axios.delete(`/api/access-logs/${id}`);
  return response.data;
};
