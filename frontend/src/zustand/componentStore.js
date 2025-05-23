import { create } from "zustand";

const useComponentStore = create((set) => ({

    // DELETION CONFIRMATION
    confirmationPrompt: "",
    onYesButtonClick: () => { },
    displayConfirmation: false,
    setDisplayConfirmation: (displayConfirmation) => (set({ displayConfirmation })),

    confirmDeletion: (confirmationPrompt, onYesButtonClick) => {
        set({ confirmationPrompt });
        set({ onYesButtonClick });
        set({ displayConfirmation: true });
    },


    bookToRequest: null,
    setBookToRequest: (bookToRequest) => set({ bookToRequest }),

    disMessageModal: false,
    setDisMessageModal: (disMessageModal) => set({ disMessageModal }),
}));

export default useComponentStore;