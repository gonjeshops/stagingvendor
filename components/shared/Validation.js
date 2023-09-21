export const shipppingDetailValidation = (values) => {
  let errors = {};

  if (!values.address) {
    errors.address = "This field is required.";
  }

  if (!values.apt) {
    errors.apt = "This field is required.";
  }
  if (!values.city) {
    errors.city = "This field is required.";
  }
  if (!values.province) {
    errors.province = "This field is required.";
  }
  if (!values.postcode) {
    errors.postcode = "This field is required.";
  }

  return errors;
};

export const checkoutValidation = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Please enter your email Address.";
  }
  if (typeof values.email !== "undefined") {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(values.email)) {
      errors.email = "Please enter valid email address.";
    }
  }
  if (!values.address) {
    errors.address = "This field is required.";
  }

  if (!values.apt) {
    errors.apt = "This field is required.";
  }

  if (!values.state) {
    errors.state = "This field is required.";
  }

  if (!values.username) {
    errors.username = "This field is required.";
  }
  if (!values.city) {
    errors.city = "This field is required.";
  }
  if (!values.phonenumber) {
    errors.phonenumber = "This field is required.";
  }
  if (!values.postcode) {
    errors.postcode = "This field is required.";
  }

  return errors;
};

export const billingValidation = (values) => {
  let errors = {};

  if (!values.state) {
    errors.state = "This field is required.";
  }
  if (!values.address) {
    errors.address = "This field is required.";
  }
  if (!values.apt) {
    errors.apt = "This field is required.";
  }

  if (!values.city) {
    errors.city = "This field is required.";
  }
  if (!values.phonenumber) {
    errors.phonenumber = "This field is required.";
  }
  if (!values.postcode) {
    errors.postcode = "This field is required.";
  }

  return errors;
};

export const walletValidation = (values) => {
  let errors = {};

  if (!values.coupon_code) {
    errors.coupon_code = "This field is required.";
  }
  return errors;
};
