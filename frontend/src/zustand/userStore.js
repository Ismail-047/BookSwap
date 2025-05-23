// PACKAGES
import { create } from "zustand";
// LIBRARY
import axios from "../lib/axios";
// ZUSTAND
import useAuthStore from "./authStore";
// UTILS
import { logError } from "../utils/comman.utils";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const { setAuthUser } = useAuthStore.getState();

const useUserStore = create((set, get) => ({

   userChats: [],
   recentChats: [],

   userToChatWith: "",
   setUserToChatWith: (userToChatWith) => (set({ userToChatWith })),

   isGettingChats: false,
   getChatBetweenUsers: async (id) => {
      set({ isGettingChats: true });
      try {
         const response = await axios.get(`/api/v1/message/get-chat-between-users/${id}`);
         set({ userChats: response.data.data });
      } catch (error) {
         logError("getChatBetweenUsers (userStore)", error);
         toast.error(error.response?.data?.message || "Internal Server Error");
      } finally {
         set({ isGettingChats: false });
      }
   },

   isGettingSidebarChats: false,
   getUsersSidebarChats: async () => {
      set({ isGettingSidebarChats: true });
      try {
         const response = await axiosInstance.get("/api/v1/user/get-user-chat-history");
         set({ recentChats: response.data.data });

      } catch (error) {
         logError("getUsersSidebarChats (userStore)", error);
         // toast.error(error.response?.data?.message || "Internal Server Error");
      } finally {
         set({ isGettingSidebarChats: false });
      }
   },

   sendMessage: async (message) => {
      const { userToChatWith } = get();
      try {
         await axiosInstance.post("/api/v1/message/send-message", {
            recieverId: userToChatWith._id,
            chatMessage: message
         });
         set({ userChats: [...get().userChats, message] });
      } catch (error) {
         logError("sendMessage (userStore)", error);
         toast.error(error.response?.data?.message || "Internal Server Error.");
      }
   },

   listenToNewMessages: () => {
      const { userToChatWith } = get();
      if (!userToChatWith) return;

      const { socket, authUser } = useAuthStore.getState();

      socket.on("newMessage", (newMessage) => {
         console.log(newMessage);

         if (
            newMessage.senderId === userToChatWith._id ||
            newMessage.recieverId === userToChatWith._id
         ) {
            set({ userChats: [...get().userChats, newMessage] });
         }

         const { recentChats } = get();
         const updatedChats = recentChats.map(chat => {
            if (
               chat._id === newMessage.senderId ||
               chat._id === newMessage.recieverId
            ) {
               return {
                  ...chat,
                  lastMessageAt: newMessage.createdAt,
                  lastMessageContent: newMessage.chatMessage,
               };
            }
            return chat;
         });

         set({ recentChats: updatedChats });
      });
   },


   createConversation: async (userId) => {
      try {
         const response = await axiosInstance.post(`/api/v1/message/create-conversation/${userId}`);
         console.log(response.data.data);
      } catch (error) {
         logError("createConversation", error);
         toast.error(error.response?.data?.message || "Internal Server Error");
      }
   },

   // USER WISHLIST
   userWishlist: JSON.parse(localStorage.getItem("wishlist")) || [],

   // TOTAL NUMBER OF ITEMS IN WISHLIST
   wishlistItemsCount: () => get().userWishlist?.length,

   emptyWishList: () => {
      set({ userWishlist: [] });
      localStorage.setItem("wishlist", "[]");
   },

   // ADD AN ITEM TO WISHLIST
   addBookToWishlist: async (bookId) => {
      try {
         let updatedWishlist = [...get().userWishlist];
         const existingItem = updatedWishlist.find((item) => (item === bookId));

         if (existingItem) {
            return;
         } else {
            updatedWishlist.push(bookId);
         }
         localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
         set({ userWishlist: updatedWishlist });
         toast.success("Book added to wishlist");
      } catch (error) {
         logError("addBookToCart (zustand)", error);
         toast.error(error.response?.data?.message || "Internal Server Error"); // ALERT ERROR
      }
   },

   // REMOVE AN ITEM FROM WISHLIST
   removeBookFromWishlist: async (bookId) => {
      try {
         let updatedWishlist = [...get().userWishlist];

         updatedWishlist = updatedWishlist.filter((id) => (id !== bookId));

         localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

         set({ userWishlist: updatedWishlist });
         toast.success("Book removed from wishlist");
      } catch (error) {
         logError("addBookToCart (zustand)", error);
         toast.error(error.response?.data?.message || "Internal Server Error"); // ALERT ERROR

      }
   },

   updateUserProfile: async (userData, images) => {
      try {
         const user = new FormData();
         for (const [key, value] of Object.entries(userData)) {
            user.append(key, value);
         }
         images.forEach(image => {
            user.append("image", image);
         });
         console.log(user);

         const response = await axiosInstance.patch("/api/v1/user/update-user-profile", user,
            { headers: { "Content-Type": "multipart/form-data" }, }
         );
         setAuthUser(response?.data?.data);
         toast.success(response?.data?.message);
      }
      catch (error) {
         logError("updateUserProfile", error); // LOG ERROR
         toast.error(error.response?.data?.message || "Internal Server Error"); // ALERT ERROR
      }
   },

   subscribeToNewsletters: async (email) => {
      try {
         const response = await axiosInstance.post("/api/v1/user/subscribe-to-newsletters", { email });
         toast.success(response?.data?.message);
      } catch (error) {
         logError("subscribeToNewsletters", error);
         toast.error(error.response?.data?.message || "Internal Server Error.");
      }
   },

}));
export default useUserStore;