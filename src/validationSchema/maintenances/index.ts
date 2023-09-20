import * as yup from 'yup';

export const maintenanceValidationSchema = yup.object().shape({
  maintenance_date: yup.date().required(),
  maintenance_type: yup.string().required(),
  description: yup.string().nullable(),
  cost: yup.number().integer().required(),
  storage_unit_id: yup.string().nullable().required(),
});
