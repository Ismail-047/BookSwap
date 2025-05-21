import fs from "fs";
import bcryptjs from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
// MODELS
import { User } from "../models/user.model.js";
// UTILS

import {
    validateResetUserPasswordInfo,
} from "../utils/user.utils.js";

import { sendRes } from "../utils/responseHelper.js";

import {
    deleteUploadedFiles,
    generateTokenAndSetCookie,
    handleExistedUserSignUp,
    validateLoginUserInfo,
    validateSignUpUserInfo,
    validateVerifyEmailInfo
} from "../utils/auth.utils.js";

import {
    getExpiryTime,
    generateVerificationCode,
    logError,
    validateEmailFormat
} from "../utils/comman.utils.js";

import {
    sendEmailResetPassLink,
    sendEmailVerificationCode
} from "../utils/emails/sendEmails.js";


export const signupUser = async (req, res) => {
    try {
        const { email, mobileNumber, address, lastName, firstName, password, confirmPassword } = req.body;

        const result = validateSignUpUserInfo(email, lastName, firstName, password, confirmPassword);
        if (!result.isvalid) {
            deleteUploadedFiles(req.files);
            return sendRes(res, 422, result.message);
        }

        let image = [];
        if (req.files && req.files.length > 0) {
            const imageUploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path)
            );

            const uploadedImages = await Promise.all(imageUploadPromises);
            image = uploadedImages.map(img => img.secure_url);
            deleteUploadedFiles(req.files)
        }

        // DOES USER ALREADY EXISTS
        const existedUser = await User.findOne({ email });

        if (existedUser) { // HANDLE CASE IF USER ALREADY EXIST
            if (existedUser.isUserVerified) {
                return sendRes(res, 400, "An account with this email already exists.");
            }
            else {
                await User.findByIdAndDelete({ _id: existedUser._id });
            }
        }

        const emailVerificationCode = generateVerificationCode();
        const newUser = await User.create({
            email,
            address,
            password,
            lastName,
            firstName,
            mobileNumber,
            profilePic: image[0],
            emailVerificationCode: emailVerificationCode,
            verificationCodeExpiresAt: getExpiryTime(30),
        });

        if (!newUser) return sendRes(res, 500, "Error Creating New User.");

        sendEmailVerificationCode(email, emailVerificationCode);

        return sendRes(res, 200, "Registration is almost complete. Please verify your email to proceed.");
    }
    catch (error) {
        console.log("Error" + error);

        deleteUploadedFiles(req.files);
        logError("signupUser (auth controllers)", error);
        return sendRes(res, 500, "Something went wrong on our side. Please try again later.");
    }
};

export const verifyUserEmail = async (req, res) => {
    try {
        const { email, emailVerificationCode } = req.body;

        const result = validateVerifyEmailInfo(email, emailVerificationCode); // VALIDATE INFORMATION
        if (!result.isvalid) return sendRes(res, 422, result.message);

        let user = await User.findOne({ email }); // FIND USER
        if (!user) return sendRes(res, 400, "No account is associated with the provided email address.");

        if (Date.now() > user.verificationCodeExpiresAt) // CHECK FOR EXPIRED VERIFICATION CODE
            return sendRes(res, 400, "Verification code has been sent to your email. Try Signingup Again.");

        const isMatched = await user.compareVerificationCode(emailVerificationCode); // COMPARE VERFICATION CODES
        if (!isMatched) return sendRes(res, 400, "The verification code entered is incorrect. Please try again.");

        user = await User.findOneAndUpdate( // UPDATE `isUserVerified` 
            { email },
            { isUserVerified: true },
            { new: true, select: "-password -isUserVerified -emailVerificationCode -verificationCodeExpiresAt -resetPassToken -resetPassTokenExpiresAt" } // REMOVE RISKY & UNWANTED FIELDS
        );

        generateTokenAndSetCookie(res, user._id); // SET JWT 
        return sendRes(res, 200, "Email Verification Succesfull.", user); // SEND SUCCESS RESPONSE WITH NEW CREATED USER
    }
    catch (error) {
        logError("verifyUserEmail", error); // LOG ERROR
        return sendRes(res, 500, "Something went wrong on our side. Please try again later."); // SEND ERROR RESPONSE
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // VALIDATE RECIEVED INFORMATION
        const result = validateLoginUserInfo(email, password);
        if (!result.isvalid) return sendRes(res, 422, result.message);

        // IS USER EXISTS
        const user = await User.findOne({ email })
            .select("-isUserVerified -emailVerificationCode -verificationCodeExpiresAt -resetPassToken -resetPassTokenExpiresAt");
        if (!user) return sendRes(res, 400, "No account is associated with the provided email address.");

        // CHECK PASSWORD
        const isMatched = await user.comparePassword(password);
        if (!isMatched) return sendRes(res, 400, "The password entered is incorrect.");

        // GENERATE JWT AND SET IN COOKIES
        generateTokenAndSetCookie(res, user._id);

        // EXCLUDE PASSWORD BEFORE SENDING TO FRONTEND
        const userObject = user.toObject();
        delete userObject.password;

        // SEND SUCCESS RESPONSE WITH USER DETAILS
        return sendRes(res, 200, "Login successful. Welcome back!", userObject);
    }
    catch (error) {
        logError("loginUser", error); // LOG ERROR
        return sendRes(res, 500, "Something went wrong on our side. Please try again later."); //SEND ERROR RESPONSE
    }
}

export const sendResetPassLink = async (req, res) => {
    try {
        const { userEmail } = req.body;

        if (!userEmail) return sendRes(res, 422, "User email is required."); // IS EMPTY EMAIL
        if (!validateEmailFormat(userEmail)) return sendRes(res, 422, "Invalid email format."); // IS EMAIL VALID

        if (demoAccounts.includes(userEmail)) // CHECK FOR DEMO ACCOUNTS
            return sendRes(res, 404, "This is a Demo account you can not reset its password.");

        const user = await User.findOne({ userEmail }); // CHECK IF ACCOUNT EXISTS
        if (!user) return sendRes(res, 400, "No account is associated with the provided email address.");

        const token = await bcryptjs.hash(userEmail, 10);
        const resetPassLink = `${process.env.FRONTEND_LINK}/reset-password?token=${token}`;

        sendEmailResetPassLink(userEmail, resetPassLink); // SEND EMAIL

        user.resetPassToken = token;
        user.resetPassTokenExpiresAt = getExpiryTime(60);
        await user.save();

        return sendRes(res, 200, "The link has been sent successfully. Kindly follow the provided link to reset your password."); // RETURN SUCCESS RESPONSE
    }
    catch (error) {
        logError("sendResetPassLink", error); // LOG ERROR
        return sendRes(res, 500, "Something went wrong on our side. Please try again later."); // RETURN ERROR RESPONSE
    }
}

export const resetUserPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmNewPassword } = req.body;

        const validationResult = validateResetUserPasswordInfo(token, newPassword, confirmNewPassword);
        if (!validationResult.isvalid) return sendRes(res, 422, validationResult.message);

        const user = await User.findOne({ resetPassToken: token });
        if (!user) return sendRes(res, 400, authMessages.UserNotFound);

        if (user.resetPassTokenExpiresAt < Date.now())
            return sendRes(res, 400, "Error! The link is expired.");

        user.userPassword = newPassword
        user.resetPassTokenExpiresAt = user.resetPassTokenExpiresAt - 61 * 60 * 1000;
        await user.save();

        return sendRes(res, 200, "Password reset successful.");
    }
    catch (error) {
        logError("resetUserPassword", error);
        return sendRes(res, 500, "Something went wrong on our side. Please try again later.");
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token"); // CLEAR COOKIE
        return sendRes(res, 200, "Logout Successful."); // SEND SUCCESS RESPONSE
    }
    catch (error) {
        logError("logoutUser", error); // LOG ERROR
        return sendRes(res, 500, "Something went wrong on our side. Please try again later."); // SEND ERROR RESPONSE
    }
}

export const checkAuth = async (req, res) => {
    try {
        const { user } = req;
        return sendRes(res, 200, "User found.", user);
    }
    catch (error) {
        logError("checkAuth", error);
        return sendRes(res, 500, "Internal Server Error.");
    }
}