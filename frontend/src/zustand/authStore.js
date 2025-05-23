// PACKAGES
import { create } from "zustand";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
// LIBRARY
import axiosInstance from "../lib/axios";
// UTILITIES
import { logError } from "../utils/comman.utils";

const BASE_URL = "http://localhost:3000";

const useAuthStore = create((set, get) => ({

   socket: null,
   authUser: null,
   isAuthenticated: false,
   usersLastSeen: [],
   onlineUsers: [],

   setAuthUser: (authUser) => (set({ authUser })),

   signupUser: async (userData, images, navigateTo) => {
      try {
         const user = new FormData();
         for (const [key, value] of Object.entries(userData)) {
            user.append(key, value);
         }
         images.forEach(image => {
            user.append("image", image);
         });
         const response = await axiosInstance.post("/api/v1/auth/signup", user,
            { headers: { "Content-Type": "multipart/form-data" }, }
         );
         sessionStorage.setItem("email", userData?.email);
         toast.success(response?.data?.message);
         navigateTo("/verify-email");
      } catch (error) {
         logError("signupUser function (zustand)", error); // LOG ERROR
         toast.error(error.response?.data?.message || "Internal Server Error.");
      }
   },

   /* ------------------------------------------------------------------------------------------------------ */

   // CHECK FOR AUTHENTICATED USER
   isCheckingAuth: false,
   checkAuth: async () => {
      set({ isCheckingAuth: true }); // START LOADING
      try {
         const response = await axiosInstance.get("/api/v1/auth/check-auth"); // GET REQUEST
         set({ authUser: response.data.data, isAuthenticated: true });
         console.log(response.data.data);
         get().connectSocket(); // <-- Add this line
         // UPDATE STATE
      } catch {
         // logError("checkAuth function (zustand)", error);
         set({ authUser: null, isAuthenticated: false }) // UPDATE STATES
      } finally {
         set({ isCheckingAuth: false }); // STOP LOADING 
      }
   },

   // LOGIN USER 
   loginUser: async (email, password, navigateTo) => {
      try {
         const response = await axiosInstance.post("/api/v1/auth/login", { email, password, }); // POST REQUEST
         set({ authUser: response.data.data, isAuthenticated: true });
         get().connectSocket();
         toast.success(response?.data?.message); // SET USER ON SUCCESS LOGIN
         navigateTo("/explore"); // NAVIGATE TO EXPLORE PAGE
      } catch (error) {
         logError("loginUser function (zustand)", error); // LOG ERROR
         toast.error(error.response?.data?.message || "Internal Server Error"); // ALERT ERROR
      }
   },

   verifyUserEmail: async (email, emailVerificationCode, navigateTo) => {
      try {
         const response = await axiosInstance.patch("/api/v1/auth/verify-email", { email, emailVerificationCode });
         set({ authUser: response.data.data, isAuthenticated: true });
         toast.success(response?.data?.message);
         navigateTo("/explore"); // NAVIGATE TO EXPLORE PAGE
      } catch (error) {
         logError("verifyUserEmail function (zustand)", error); // LOG ERROR
         toast.error(error.response?.data?.message || "Internal Server Error."); // ALERT ERROR
      }
   },

   // LOGOUT USER
   isLogingOutUser: false,
   logoutUser: async () => {
      set({ isLogingOutUser: true }); // START LOADING
      try {
         const response = await axiosInstance.get("/api/v1/auth/logout"); // GET REQUEST
         toast.success(response?.data?.message); // ALERT SUCCESS
         set({ isAuthenticated: false, authUser: null }); // UPDATE STATES
         await get().disconnectSocket();
         window.location.reload(); // RELOAD PAGE
      } catch (error) {
         logError("logoutUser function (zustand)", error); // ALERT ERROR
         toast.error(error.response?.data?.message || "Internal Server Error."); // LOG ERROR
      }
      finally {
         set({ isLogingOutUser: false }); // STOP LOADING
      }
   },

   // RESET USER PASSWORD
   isResettingPassword: false,
   resetUserPassword: async (newPassword, confirmNewPassword, token) => {
      set({ isResettingPassword: true }); // START LOADING
      try {
         const response = await axiosInstance.patch("/api/v1/auth/reset-password", { // PATCH REQUEST 
            newPassword, confirmNewPassword, token
         });
         toast.success(response?.data?.message); // ALERT SUCCESS
         window.location.href("/"); // NAVIGATE TO LOGIN PAGE
      } catch (error) {
         logError("resetUserPassword function (zustand)", error); // LOG ERROR
         toast.error(error.response?.data?.message || "Internal Server Error."); // ALERT ERROR
      } finally {
         set({ isResettingPassword: false }); // STOP LOADING
      }
   },

   // REQUEST FOR PASSWORD RESET
   isRequestingPasswordReset: false,
   requestPasswordReset: async (userEmail) => {
      set({ isRequestingPasswordReset: true }); // START LOADING
      try {
         const response = await axiosInstance.post("/api/v1/auth/request-reset-password", { userEmail }); // POST REQUEST
         toast.success(response?.data?.message); // ALERT SUCCESS
      } catch (error) {
         logError("sendResetPasswordLink function (zustand)", error); // LOG ERROR
         toast.error(error.response?.data?.message || "Internal Server Error"); // ALERT ERROR
      } finally {
         set({ isRequestingPasswordReset: false }); // STOP LOADING
      }
   },

   // DELETE USER ACCOUNT
   isDeletingUserAccount: false,
   deleteUser: async () => {
      set({ isDeletingUserAccount: true }); // START LOADING
      try {
         await axiosInstance.delete("/api/v1/auth/delete-user"); // DELETE REQUEST
         set({ authUser: null, isAuthenticated: false }); // UPDATE STATE
         await get().disconnectSocket();
         window.location.reload(); // RELOAD PAGE
      } catch (error) {
         logError("deleteUser function (zustand)", error); // LOG ERROR
         toast.error(error.response?.data?.message || "Internal Server Error."); // ALERT ERROR
      } finally {
         set({ isDeletingUserAccount: false }); // STOP LOADING
      }
   },

   /*----------------------------- SOCKETS-----------------------------*/
   // CONNECTS SOCKETS
   connectSocket: async () => {

      // If user is not authenticated or we are already connected to the backend socket return 
      const { isAuthenticated } = get();
      if (!isAuthenticated || get().socket?.connected) return;

      // Connect to the backend socket and set its state
      const socket = io(BASE_URL, {
         query: { userId: get().authUser?._id, }
      });
      socket.connect();

      socket.on("onlineUsers", (userIds) => {
         set({ onlineUsers: userIds })
      })

      socket.on("usersLastSeen", (users) => {
         set({ usersLastSeen: users })
      })

      set({ socket });
   },

   // DISCONNECT SOCKETS
   disconnectSocket: async () => {
      // If connected, than only try to disconnect
      if (get().socket?.connected) get().socket.disconnect();
   },

   stopListeningNewMessages: () => {
      const { socket } = useAuthStore.getState();
      if (socket) {
         socket.off("newMessage");
      }
   },

}));

export default useAuthStore;