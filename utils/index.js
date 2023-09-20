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

export const deleteEmptyObjectFields = (object) => {
  Object.keys(object).forEach((item) => {
    if (object[item] === "") {
      delete object[item];
    }
  });
};

export const b64toBlob = (dataURI) => {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
};

export const testRoute = () => {
  const token = localStorage.getItem("token");
  const loginAs = localStorage.getItem("loginAs");
  return {
    isPrivate: !!loginAs && !!token,
    isProtected: !!token && !loginAs,
  };
};
