import * as yup from 'yup';

export const storageUnitValidationSchema = yup.object().shape({
  unit_number: yup.number().integer().required(),
  size: yup.string().required(),
  availability_status: yup.boolean().required(),
  rent_price: yup.number().integer().required(),
  last_maintenance_date: yup.date().nullable(),
  business_id: yup.string().nullable().required(),
});
