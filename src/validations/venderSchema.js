import * as Yup from 'yup';

export const vendorSchema = Yup.object().shape({
  vendor_code: Yup.string()
    .required('Vendor code is required'),

  vendor_name: Yup.string()
    .required('Vendor name is required'),

  vendor_type: Yup.string()
    .nullable(), 

  email: Yup.string()
    .email('Invalid email format')
    .nullable(), 

  phone_number: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
    .nullable(), 

  website: Yup.string()
    .url('Invalid website URL')
    .nullable(),

  status: Yup.string()
    .oneOf(['Active', 'Inactive', 'Blacklisted'], 'Invalid status')
    .default('Active'),

  notes: Yup.string()
    .nullable(), 
});
