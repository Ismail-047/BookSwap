

export const validateResetUserPasswordInfo = (token, newPassword, confirmNewPassword) => {

   if (!token)
      return { isvalid: false, message: "Error! No token provided." };

   if (!newPassword)
      return { isvalid: false, message: "New password is required." };

   if (!confirmNewPassword)
      return { isvalid: false, message: "Confirm new password is required." };

   if (newPassword.length < 8)
      return { isvalid: false, message: "Password must be 8 charachters long." }

   if (newPassword !== confirmNewPassword)
      return { isvalid: false, message: "Both passwords do not match." }

   return { isvalid: true }
}


export const validateContactInfo = (contactInfo) => {

   // CONTACT NAME IS PRESENT
   if (!contactInfo.contactName)
      return { isvalid: false, message: "Contact Name is required." };

   // CONTACT EMAIL IS PRESENT 
   if (!contactInfo.userEmail)
      return { isvalid: false, message: "Contact Email is required." };


   return { isvalid: true }
}

