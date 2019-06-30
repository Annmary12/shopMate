import * as Yup from 'yup';

/**
 * Validates checkout delivery form
 * @returns {void}
 */
const DeliverySchema = Yup.object().shape({
  firstName: Yup.string().required('firstname is required!'),
  lastName: Yup.string().required('lastname is required'),
  address_1: Yup.string().required('address is required'),
  city: Yup.string().required('city is required'),
  country: Yup.string().required('state is required'),
  postal_code: Yup.string().required('postal code is required'),
  shipping_id:  Yup.string().required('Select shipping option'),
})

export default DeliverySchema;
