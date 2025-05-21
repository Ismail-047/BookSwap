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