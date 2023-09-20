import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  item_name: yup.string().required(),
  quantity: yup.number().integer().required(),
  location: yup.string().required(),
  last_updated: yup.date().nullable(),
  storage_unit_id: yup.string().nullable().required(),
});
