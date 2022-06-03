export const validate = (values) => {

  let err = {};
  var reg = /^(\w+[\.\-]?)@(\w+)\.([a-z]{2,3})$/;
  var passwordReg = /^[a-zA-Z0-9\W]{8,20}$/;
 
    if (!values.email) {
      err.email = "Email is required!";
    } else if (!reg.test(values.email)) {
      err.email = "You have entered an invalid Email address!"
    };
    if (!values.firstName) {
      err.firstName = "FirstName is required!";
    };
    if (!values.lastName) {
      err.lastName = "LastName is required!";
    };
    if (!values.password) {
      err.password = "Password is required!";
    } else if (!passwordReg.test(values.password)) {
      err.password = "Password have latest 8 characters & less than 20 characters";
    }
     
  if (!values.country) {
    err.country="Country is required!"
  }
  if (!values.region) {
    err.region="Region is required!"
  }
  
    if (!values.confirmPassword) {
      err.confirmPassword = "ConfirmPassword is required!";
    }
    else if (values.password !== values.confirmPassword) {
      err.confirmPassword = "Password doesn't match";
    }
    if (!values.image) {
      err.image = "Image file is required!"
    }
    
    return err;
  
  
}
  
export const LoginValidate = (values) => {
  let err = {};
   var reg = /^(\w+[\.\-]?)@(\w+)\.([a-z]{2,3})$/;
  var passwordReg = /^[a-zA-Z0-9\W]{8,20}$/;
   
     if (!values.email) {
      err.email = "Email is required!";
    } else if (!reg.test(values.email)) {
      err.email = "You have entered an invalid Email address!"
  };
   if (!values.password) {
      err.password = "Password is required!";
    } else if (!passwordReg.test(values.password)) {
      err.password = "Password have latest 8 characters & less than 20 characters";
   }
  return err;
}