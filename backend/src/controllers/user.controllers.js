import { Newsletter } from "../models/newsletters.model.js";
import { deleteUploadedFiles } from "../utils/auth.utils.js";
import cloudinary from "../utils/cloudinary.js";
import { logError } from "../utils/comman.utils.js";
import { sendRes } from "../utils/responseHelper.js";

export const updateUserProfile = async (req, res) => {
    try {
        const user = req.user;

        const { email, firstName, lastName, address, mobileNumber } = req.body;
        console.log(req.files);

        let images = [];
        if (req.files && req.files.length > 0) {
            const imageUploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path)
            );
            const uploadedImages = await Promise.all(imageUploadPromises);
            images = uploadedImages.map(img => img.secure_url);
            deleteUploadedFiles(req.files);
        }

        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.address = address || user.address;
        user.mobileNumber = mobileNumber || user.mobileNumber;
        if (images.length > 0) user.profilePic = images[0];

        const updatedUser = await user.save();

        return sendRes(res, 200, "User profile updated successfully.", updatedUser);
    }
    catch (error) {
        deleteUploadedFiles(req.files);
        logError("updateUserProfile", error);
        return sendRes(res, 500, "Something went wrong on our side. Please! try again.");
    }
}

export const subscribeToNewsletters = async (req, res) => {
    try {
        const { email } = req.body;

        const isAlreadySubscribed = await Newsletter.findOne({ email });
        if (isAlreadySubscribed) return sendRes(res, 400, "This Email Is Already Registered.");

        await Newsletter.create({ email });

        return sendRes(res, 200, "Subscription Successfull. Thanks For Joining Us.");
    }
    catch (error) {
        logError("subscribeToNewsletters", error);
        return sendRes(res, 500, "Something went wrong on our side. Please! try again.");
    }
}

export const unsubscribeToNewsletters = async (req, res) => {
    try {
        const { email } = req.body;

        const deletedEmail = await Newsletter.findOneAndDelete({ email });

        if (!deletedEmail) return sendRes(res, 400, "No Subscription Found.");

        return sendRes(res, 200, "Unsubscribed Successfully.");
    }
    catch (error) {
        logError("unsubscribeToNewsletters", error);
        return sendRes(res, 500, "Something went wrong on our side. Please! try again.");
    }
}