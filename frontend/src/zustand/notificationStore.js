import { create } from "zustand";

export const useNotificationStore = create((set) => ({

    notifications: [],
    unreadNotifications: [],

    setNotifications: (notifications) => set({ notifications }),
    setUnreadNotifications: (unreadNotifications) => set({ unreadNotifications }),
}));
