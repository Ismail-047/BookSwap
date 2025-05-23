import { Conversation } from "../models/conversation.model.js";
import { Newsletter } from "../models/newsletters.model.js";
import { deleteUploadedFiles } from "../utils/auth.utils.js";
import cloudinary from "../utils/cloudinary.js";
import { logError } from "../utils/comman.utils.js";
import { sendRes } from "../utils/responseHelper.js";
import { Notification } from "../models/notification.model.js";

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

export const getUserChatHistory = async (req, res) => {
    try {
        const user = req.user;

        const conversations = await Conversation.find({ participants: user._id })
            .populate("participants", "firstName lastName profilePic")
            .sort({ lastMessageAt: -1 });

        const recentChats = conversations.map((conversation) => {
            const otherUser = conversation.participants.find(
                (participant) => participant._id.toString() !== user._id.toString()
            );

            if (!otherUser) return null;

            return {
                _id: otherUser._id,
                firstName: otherUser.firstName,
                lastName: otherUser.lastName,
                profilePic: otherUser.profilePic,
                lastMessage: conversation.lastMessageContent,
                lastMessageTime: conversation.lastMessageAt,
            };
        }).filter(Boolean);

        return sendRes(res, 200, "Recent chats fetched successfully", recentChats);

    } catch (error) {
        logError("getUserChatHistory", error);
        return sendRes(res, 500, "Something went wrong on our side. Please try again later.");
    }
};


export const getAllNotifications = async (req, res) => {
    try {
        const user = req.user;

        const notifications = await Notification.find({ to: user._id });

        console.log(notifications);
        return sendRes(res, 200, "Notifications fetched successfully", notifications);
    }
    catch (error) {
        logError("getAllNotifications", error);
        return sendRes(res, 500, "Something went wrong on our side. Please try again later.");
    }
}
