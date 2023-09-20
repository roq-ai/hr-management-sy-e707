interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Guest'],
  tenantRoles: [
    'Business Owner',
    'Storage Manager',
    'Inventory Clerk',
    'Sales Representative',
    'HR Manager',
    'Owner',
    'Employee',
    'Payroll Officer',
  ],
  tenantName: 'Organization',
  applicationName: 'HR Management System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'View storage unit availability',
    'View inventory',
    'View rental prices',
    'View organization information',
  ],
  ownerAbilities: [
    'Manage the business information',
    'Manage the customer information',
    'Manage the payment information',
    'Manage the storage location and units',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/23a7e5d4-17b1-4f4f-964c-0875e2eca1b6',
};
