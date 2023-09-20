const mapping: Record<string, string> = {
  'access-logs': 'access_log',
  customers: 'customer',
  inventories: 'inventory',
  maintenances: 'maintenance',
  organizations: 'organization',
  payments: 'payment',
  rentals: 'rental',
  securities: 'security',
  'storage-locations': 'storage_location',
  'storage-units': 'storage_unit',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
