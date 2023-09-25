import { useState, useEffect } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri"; // Import icons

const VendorStage1 = ({ formData, setFormData, setisForm1Valid }) => {
  const [showPassword, setShowPassword] = useState(false); 
  const [showCPassword, setShowCPassword] = useState(false); 
  const [pwderror, setPwderror] = useState("");
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (formData.fname.trim() === "") {
      newErrors.fname = "First Name is required";
      valid = false;
    } else {
      newErrors.fname = "";
    }

    if (formData.lname.trim() === "") {
      newErrors.lname = "Last Name is required";
      valid = false;
    } else {
      newErrors.lname = "";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
	  if (!strongPasswordPattern.test(formData.password)) {
      newErrors.password = "Password includes minimum of 6 characters, uppercase, lowercase, and numbers";
      valid = false;
    } else {
      newErrors.password = ''
    }

    if (formData.cpassword.trim() === "" || formData.password !== formData.cpassword) {
      newErrors.cpassword = "Passwords do not match";
      valid = false;
    } else {
      newErrors.cpassword = "";
    }

    setisForm1Valid(valid);
    setErrors(newErrors);
  };

  return (
    <form className="space-y-3 pt-4 px-3">
      <div className="">
        <label htmlFor="fname" className="block text-sm">
          First Name{errors.fname && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="John"
          value={formData.fname}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
        />
        
      </div>

      <div className="">
        <label htmlFor="lname" className="block w-full text-sm">
          Last Name {errors.lname &&<span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name="lname"
          id="lname"
          placeholder="Doe"
          value={formData.lname}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
        />
       
      </div>

      <div className="">
        <label htmlFor="email" className="block text-sm">
          Email Address {errors.email && <span className="text-red-500">*</span>}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md border-gray-400 focus:border-green-400"
        />
      </div>

      <div className="grid sm:flex gap-2 w-full  ">

        <div className="w-full relative">
          <label htmlFor="password" className="text-sm">
            Password {errors.password && <span className="text-red-500">*</span>}
          </label>
          <input
            type={showPassword === 'p' ? "text" : "password"}
            name="password"
            id="password"
            placeholder="*****"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  border-gray-400   focus:border-green-400"
          />
         
          {showPassword === 'p' ? (
            <RiEyeCloseFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword('')}
            />
          ) : (
            <RiEyeFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword('p')}
            />
          )}
        </div>

        <div className="w-full relative">
          <label htmlFor="cpassword" className="text-sm">
            Confirm Password  {errors.cpassword && <span className="text-red-500">*</span>}
          </label>
          <input
            type={showCPassword === 'cp' ? "text" : "password"}
            name="cpassword"
            id="cpassword"
            placeholder="*****"
            value={formData.cpassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  border-gray-400   focus:border-green-400"
          />
          {/* {errors.cpassword && (
            <p className="text-red-500 text-sm">{errors.cpassword}</p>
          )} */}
          {showCPassword === 'cp' ? (
            <RiEyeCloseFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowCPassword('')}
            />
          ) : (
            <RiEyeFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowCPassword('cp')}
            />
          )}
        </div>
        
      </div>
      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
    </form>
  );
};

export default VendorStage1;
