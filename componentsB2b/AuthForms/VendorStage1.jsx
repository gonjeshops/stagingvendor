import { useState, useEffect } from "react";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri"; // Import icons

const VendorStage1 = ({ formData, setFormData, setisForm1Valid }) => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
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
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;

    if (formData.fname.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fname: "First Name is required",
      }));
      valid = false;
    }

    if (formData.lname.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lname: "Last Name is required",
      }));
      valid = false;
    }

    if (formData.email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      valid = false;
    }

    if (formData.password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      valid = false;
    }

    if (formData.cpassword.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpassword: "Confirm Password is required",
      }));
      valid = false;
    } else if (formData.password !== formData.cpassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpassword: "Passwords do not match",
      }));
      valid = false;
    }

    setisForm1Valid(valid);
  };

  return (
    <form className="space-y-3 pt-4 px-3">
      <div className="">
        <label htmlFor="fname" className="block text-sm">
          First Name
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
        {errors.fname && (
          <p className="text-red-500 text-sm">{errors.fname}</p>
        )}
      </div>

      <div className="">
        <label htmlFor="lname" className="block w-full text-sm">
          Last Name
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
        {errors.lname && (
          <p className="text-red-500 text-sm">{errors.lname}</p>
        )}
      </div>

      <div className="">
        <label htmlFor="email" className="block text-sm">
          Email Address
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
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div className="grid sm:flex  gap-2 w-full  ">

        <div className="w-full relative">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type={showPassword==='p' ? "text" : "password"}
            name="password"
            id="password"
            placeholder="*****"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  border-gray-400   focus:border-green-400"
          />
          {showPassword==='p' ? (
            <RiEyeCloseFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={()=>setShowPassword('')}
            />
          ) : (
            <RiEyeFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={()=>setShowPassword('p')}
            />
          )}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="w-full relative">
          <label htmlFor="cpassword" className="text-sm">
           Confirm Password
          </label>
          <input
            type={showPassword==='cp' ? "text" : "password"}
            name="cpassword"
            id="cpassword"
            placeholder="*****"
            value={formData.cpassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md  border-gray-400   focus:border-green-400"
          />
          {showPassword==='cp' ? (
            <RiEyeCloseFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={()=>setShowPassword('')}
            />
          ) : (
            <RiEyeFill
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={()=>setShowPassword('cp')}
            />
          )}
          {errors.cpassword && (
            <p className="text-red-500 text-sm">{errors.cpassword}</p>
          )}
        </div>

        

        
      </div>
    </form>
  );
};

export default VendorStage1;
