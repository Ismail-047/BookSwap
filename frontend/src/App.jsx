// PACKAGES
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// COMPONENTS
import Header from "./components/Header";
import Footer from "./components/layout/Footer";
import Confirmation from "./components/Confirmation";
// ZUSTAND
import useAuthStore from "./zustand/authStore";
import useBookStore from "./zustand/book.store";
import useComponentStore from "./zustand/componentStore";
// PAGES
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyBooks from "./pages/MyBooks";
import Explore from "./pages/Explore";
import Login from "./pages/Auth/Login";
import Wishlist from "./pages/Wishlist";
import Signup from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequests";
import AddNewBook from "./pages/AddNewBook";
import EditBookPage from "./pages/EditBookPage";
import ViewBooksPage from "./pages/ViewBooksPage";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import BookRequest from "./components/BookRequest";
import BookDetailPage from "./pages/BookDetailPage";
import MainLoadingPage from "./pages/MainLoadingPage";
import ResetPassword from "./components/Auth/ResetPassword";
import RequestPasswordReset from "./pages/Auth/RequestPasswordReset";
import NotificationPage from "./pages/NotificatioPage";

const App = () => {

  const { displayConfirmation } = useComponentStore();
  const { allBooks, setLoggedInUserBooks, getAllBooks, bookToRequest } = useBookStore();
  const { authUser, checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    if (isAuthenticated)
      getAllBooks();
  }, [isAuthenticated, getAllBooks]);

  useEffect(() => {
    const userBooks = allBooks.filter(book => book?.owner?._id === authUser?._id);
    setLoggedInUserBooks(userBooks);
  }, [allBooks, authUser?._id, setLoggedInUserBooks]);

  if (isCheckingAuth) return (<MainLoadingPage />);

  return (
    <>

      <Header />

      {displayConfirmation && <Confirmation />}
      {bookToRequest && <BookRequest />}

      <Toaster position="top-right"
        toastOptions={{
          style: { background: "#333", color: "#fff", },
          duration: 3000,
        }}
      />

      <Routes>

        <Route path="/"
          element={isAuthenticated ? <Explore /> : <Home />}
        />
        <Route path="login"
          element={isAuthenticated ? <Navigate to={"/"} replace /> : <Login />}
        />
        <Route path="/signup"
          element={isAuthenticated ? <Navigate to={"/"} replace /> : <Signup />}
        />
        <Route path="/verify-email"
          element={isAuthenticated ? <Navigate to={"/"} replace /> : <VerifyEmail />}
        />
        <Route path="books/:id"
          element={isAuthenticated ? <BookDetailPage /> : <Navigate to={"/"} replace />}
        />
        <Route path="edit-book/:id"
          element={isAuthenticated ? <EditBookPage /> : <Navigate to={"/"} replace />}
        />
        <Route path="/add-new-book"
          element={isAuthenticated ? <AddNewBook /> : <Navigate to={"/"} replace />}
        />
        <Route path="/books"
          element={<ViewBooksPage />}
        />
        <Route path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to={"/"} replace />}
        />
        <Route path="my-books"
          element={isAuthenticated ? <MyBooks /> : <Navigate to={"/"} replace />}
        />
        <Route path="my-requests"
          element={isAuthenticated ? <MyRequests /> : <Navigate to={"/"} replace />}
        />
        <Route path="wishlist"
          element={isAuthenticated ? <Wishlist /> : <Navigate to={"/"} replace />}
        />
        <Route path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to={"/"} replace />}
        />

        <Route path="/notifications"
          element={isAuthenticated ? <NotificationPage /> : <Navigate to={"/"} replace />}
        />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/request-password-reset" element={<RequestPasswordReset />} />
        <Route path="/explore" element={<Explore />} />

        {/* <Route
          path="*"
          element={}
        /> */}
      </Routes>

      <Footer />

    </>
  );
};

export default App;