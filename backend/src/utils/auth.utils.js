import fs from "fs";
import jwt from "jsonwebtoken";

import { generateVerificationCode, getExpiryTime, validateEmailFormat } from "./comman.utils.js";
import { sendEmailVerificationCode } from "./emails/sendEmails.js";

/**
 * GENERATES A JSON WEB TOKEN FOR THE GIVEN USER ID, SETS IT AS A COOKIE.
 * 
 * @param {Object} res - THE RESPONSE OBJECT FROM THE EXPRESS.JS SERVER.
 * @param {string} userId - THE ID OF THE USER FOR WHOM THE TOKEN IS GENERATED.
 * 
 * @returns {string} - THE GENERATED JWT TOKEN.
 */
export const generateTokenAndSetCookie = async (res, userId) => {

   // SIGN TOKEN
   const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

   // SET COOKIE
   res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 DAYS
   })

   return token;
}

/**
 * LOGIN INFORMATION VALIDATION
 * 
 * @param {String} userEmail - USER EMAIL ADDRESS
 * @param {String} userPassword - USER PASSWORD
 * 
 * @returns {Object} - RETURNS AN OBJECT WITH `isvalid` boolean & `message` IF INVALID.
 */
export const validateLoginUserInfo = (userEmail, userPassword) => {

   if (!userEmail) // IS EMAIL EMPTY
      return { isvalid: false, message: "Email is required." };

   if (!userPassword) // IS PASSWORD EMPTY
      return { isvalid: false, message: "Password is required." };

   if (!validateEmailFormat(userEmail)) // IS EMAIL VALID
      return { isvalid: false, message: "Invalid email format." };

   if (userPassword.length < 8) // IS PAWWORD LENGHT LESS THAN 8
      return { isvalid: false, message: "Wrong Password" }

   return { isvalid: true }
}

/**
 * SIGNUP INFORMATION VALIDATION
 * 
 * @param {String} userEmail - USER EMAIL ADDRESS
 * @param {String} userPassword - USER PASSWORD
 * @param {String} userConfirmPassword - USER CONFIRM PASSWORD
 *  
 * @returns - RETURNS AN OBJECT WITH `isvalid` boolean & `message` IF INVALID.
 */
export const validateSignUpUserInfo = (email, lastName, firstName, password, confirmPassword) => {

   if (!firstName)
      return { isvalid: false, message: "First Name is Required." };

   if (!lastName)
      return { isvalid: false, message: "Last Name is Required." };

   if (!email)
      return { isvalid: false, message: "Password is Required." };

   if (!password)
      return { isvalid: false, message: "Password is Required." };

   if (!confirmPassword)
      return { isvalid: false, message: "Confirm Password is Required." };

   if (!validateEmailFormat(email))
      return { isvalid: false, message: "Invalid email format." };

   if (password.length < 8)
      return { isvalid: false, message: "Password must be 8 characters long." };

   if (password !== confirmPassword)
      return { isvalid: false, message: "Passwords do not match." };

   return { isvalid: true }
}

/**
 * HANDLE SIGNUP PROCESS IF USER ALREADY EXISTS
 * 
 * @param {Object} existedUser - EXISTED USER FOUND DURING SIGNUP PROCESS
 * @param {String} userPassword - USER PASSWORD
 * 
 * @returns - BOOLEAN (THE EXISTED USER IS VERIFIED OR NOT)
 */
export const handleExistedUserSignUp = async (existedUser, userPassword) => {

   // IF EXISTED USER IS VERIFIED
   if (existedUser.isUserVerified) return true;

   // ELSE IF USER IS NOT VERIFIED BUT THE VERIFICATION CODE IS EXPIRED THAN SEND NEW CODE 
   if (Date.now() > existedUser.verificationCodeExpiresAt) {

      const verificationCode = generateVerificationCode(); // GENERATE VERFICATION CODE

      existedUser.userPassword = userPassword;
      existedUser.emailVerificationCode = verificationCode;
      existedUser.verificationCodeExpiresAt = getExpiryTime(30); // GET EXPIRY TIME

      await existedUser.save();
      await sendEmailVerificationCode(existedUser.userEmail, verificationCode); // SEND EMAIL WITH NEW CODE 
   }

   return false;
}

/**
 * 
 * @param {String} userEmail - USER EMAIL ADDRESS
 * @param {String} verificationCode - SIX DIGIT VERIFICATION CODE
 * 
 * @returns - RETURNS AN OBJECT WITH `isvalid` boolean & `message` IF INVALID.
 */
export const validateVerifyEmailInfo = (userEmail, verificationCode) => {

   if (!userEmail) // IS EMAIL EMPTY
      return { isvalid: false, message: "Email is required." };

   if (!verificationCode) // IS VERIFICATION CODE EMPTY
      return { isvalid: false, message: "Verification code is required." };

   if (!validateEmailFormat(userEmail)) // EMAIL FORMAT IS VALID
      return { isvalid: false, message: "Invalid email format." };

   if (verificationCode.length !== 6) // VERIFICATION CODE IS 6 CHAR LONG
      return { isvalid: false, message: "Invalid verification code." }

   return { isvalid: true }
}

export const deleteUploadedFiles = (files) => {
   if (!files || files.length === 0) return;
   files.forEach(file => {
      try {
         if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
         }
      } catch (err) {
         console.error("Error deleting file:", file.path, err);
      }
   });
};

