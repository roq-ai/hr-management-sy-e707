import * as yup from 'yup';

export const rentalValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  total_cost: yup.number().integer().required(),
  payment_status: yup.boolean().required(),
  user_id: yup.string().nullable().required(),
  storage_unit_id: yup.string().nullable().required(),
});
