export const validateEmail = (email) => {
  if (email) {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      return "Please enter valid email address.";
    }
  }
};

export const validatePhone = (phone) => {
  if (phone) {
    const pattern = new RegExp(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/);
    if (!pattern.test(phone)) {
      return "Please enter valid phone number.";
    }
  }
};

export const GOOGLE_ADDRESS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
//  "AIzaSyCxMO0g5Vv0ZtSthhrrXMVOYVBcjf4G1hw";
export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  // "pk_test_51JUqxaCQ7rc17WeioiorcontVhfKvvWwCZfTVqCX3pL5hwZ3EARBNTUBUcMeLyeY0znBxOjor0DEHR3JwuWeQFR100oJKWYkin";
