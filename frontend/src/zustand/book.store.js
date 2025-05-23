import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { logError } from "../utils/comman.utils";

const useBookStore = create((set) => ({

    allBooks: [],

    loggedInUserBooks: [],
    setLoggedInUserBooks: (loggedInUserBooks) => set({ loggedInUserBooks }),

    searchResults: [],
    setSearchResults: (searchResults) => set({ searchResults }),

    bookToRequest: null,
    setBookToRequest: (bookToRequest) => set({ bookToRequest }),

    bookRequests: [],
    setBookRequests: (bookRequests) => set({ bookRequests }),

    bookReviews: [],
    setBookReviews: (bookReviews) => set({ bookReviews }),

    isGettingAllBooks: false,
    getAllBooks: async () => {
        set({ isGettingAllBooks: true });
        try {
            const response = await axiosInstance.get("/api/v1/books/get-all-books");
            set({ allBooks: response.data.data });
        }
        catch (error) {
            logError("getAllBooks", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        } finally {
            set({ isGettingAllBooks: false });
        }
    },

    addNewBook: async (bookData, images) => {
        try {
            const book = new FormData();
            for (const [key, value] of Object.entries(bookData)) {
                book.append(key, value);
            }
            images.forEach(image => {
                book.append("image", image);
            });
            console.log(book);

            const response = await axiosInstance.post("/api/v1/books/add-new-book", book,
                { headers: { "Content-Type": "multipart/form-data" }, }
            );
            set((prevState) => ({
                ...prevState,
                loggedInUserBooks: [...prevState.loggedInUserBooks, response.data.data]
            }));

            toast.success(response?.data?.message);
        }
        catch (error) {
            logError("addNewBook", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    deleteBookById: async (bookId) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/books/delete-book/${bookId}`);

            set((prevState) => ({
                ...prevState,
                loggedInUserBooks: prevState.loggedInUserBooks.filter(book => book._id !== bookId),
                allBooks: prevState.allBooks.filter(book => book._id !== bookId)
            }));

            toast.success(response?.data?.message);
        }
        catch (error) {
            logError("deleteBookById", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    updateBook: async (id, bookData, images) => {
        try {
            const book = new FormData();
            for (const [key, value] of Object.entries(bookData)) {
                book.append(key, value);
            }
            images.forEach(image => {
                book.append("image", image);
            });
            console.log(book);

            const response = await axiosInstance.patch(`/api/v1/books/update-book/${id}`, book,
                { headers: { "Content-Type": "multipart/form-data" }, }
            );
            set((prevState) => ({
                ...prevState,
                loggedInUserBooks: prevState.loggedInUserBooks.filter(book => book._id !== id),
                allBooks: prevState.allBooks.filter(book => book._id !== id)
            }));
            toast.success(response?.data?.message);
        }
        catch (error) {
            logError("updateBook", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    createBookRequest: async (bookId, message) => {
        try {
            const response = await axiosInstance.post(`/api/v1/books/request-book/${bookId}`, {
                message
            });

            toast.success(response?.data?.message);
        } catch (error) {
            logError("createBookRequest", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    cancelBookRequest: async (requestId) => {
        try {
            const response = await axiosInstance.post(`/api/v1/books/cancel-request/${requestId}`);
            toast.success(response?.data?.message);
        } catch (error) {
            logError("cancelBookRequest", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    getBookRequests: async () => {
        try {
            const response = await axiosInstance.get("/api/v1/book-requests");

            set({ bookRequests: response?.data?.data || [] });
            toast.success(response?.data?.message);
        } catch (error) {
            logError("getBookRequests", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    updateBookRequestStatus: async (requestId, status) => {
        try {
            const response = await axiosInstance.patch(`/api/v1/books/update-book-request-status/${requestId}`, {
                status
            });

            set((prevState) => ({
                bookRequests: prevState.bookRequests.map((req) =>
                    req._id === requestId ? { ...req, status } : req
                )
            }));

            toast.success(response?.data?.message);
        } catch (error) {
            logError("updateBookRequestStatus", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    addReview: async (bookId, rating, comment) => {
        if (!bookId) {
            toast.error("Book ID is required.");
            return;
        }
        if (rating === 0) {
            toast.error("Please provide a rating.");
            return;
        }
        try {
            const response = await axiosInstance.post(`/api/v1/books/add-review/${bookId}`, {
                rating,
                comment
            });

            toast.success(response?.data?.message);
        } catch (error) {
            logError("addReview", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    getReviewsForBook: async (bookId) => {
        try {
            const response = await axiosInstance.get(`/api/v1/books/get-reviews/${bookId}`);

            set({ bookReviews: response?.data?.data || [] });
            toast.success(response?.data?.message);
        } catch (error) {
            logError("getReviewsForBook", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

}));

export default useBookStore;