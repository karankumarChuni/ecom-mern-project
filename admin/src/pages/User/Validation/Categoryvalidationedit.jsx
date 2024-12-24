import * as Yup from "yup";

export const Categoryvalidationedit = Yup.object({
  first_name: Yup.string().label("First Name").min(2).max(19),
  last_name: Yup.string().label("Last Name").min(2).max(19),
  email: Yup.string().label("Email ID").min(2).max(19).email(),
  mobile: Yup.string().label("Mobile No").min(2).max(19),
  address: Yup.string().label("Address").min(2).max(19),
  country: Yup.string().label("Country").min(4),
  state: Yup.string().label("State").min(4),
  city: Yup.string().label("City").min(4),
  pincode: Yup.string().label("PinCode").min(4),
  status: Yup.string(),
  type: Yup.string().oneOf(["Admin", "User"], "Invalid Type"),
});
