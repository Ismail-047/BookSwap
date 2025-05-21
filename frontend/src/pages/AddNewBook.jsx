import React, { useEffect, useRef, useState } from "react";
import { BookOpen, MapPin, Link2, Upload, User, Calendar, X, Check } from "lucide-react";
import Intro from "../components/Intro";
import { ThemeButton } from "../components/Buttons";
import useBookStore from "../zustand/book.store";

const AddNewBook = () => {
  const { addNewBook } = useBookStore();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
    genre: "",
    condition: "",
    location: "",
    externalURL: "",
    description: "",
  });

  const inputRefs = useRef({});
  const [focusedField, setFocusedField] = useState(null);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [bookImage, setBookImage] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  const genreOptions = [
    "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Mystery",
    "Thriller", "Romance", "Biography", "History", "Self-Help",
    "Business", "Technology", "Science", "Poetry", "Other"
  ];

  const conditionOptions = [
    "New", "Like New", "Very Good", "Good", "Fair", "Poor"
  ];

  useEffect(() => {
    if (focusedField && inputRefs.current[focusedField]) {
      inputRefs.current[focusedField].focus();
    }
  }, [bookData, focusedField]);


  const handleFocus = (name) => {
    setFocusedField(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, bookData[name]);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    switch (name) {
      case "title":
        if (!value.trim()) fieldErrors.title = "Title is required";
        else delete fieldErrors.title;
        break;
      case "author":
        if (!value.trim()) fieldErrors.author = "Author is required";
        else delete fieldErrors.author;
        break;
      case "genre":
        if (!value) fieldErrors.genre = "Genre is required";
        else delete fieldErrors.genre;
        break;
      case "condition":
        if (!value) fieldErrors.condition = "Condition is required";
        else delete fieldErrors.condition;
        break;
      case "location":
        if (!value.trim()) fieldErrors.location = "Location is required";
        else delete fieldErrors.location;
        break;
      case "externalURL":
        if (value && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(value)) {
          fieldErrors.externalURL = "Please enter a valid URL";
        } else {
          delete fieldErrors.externalURL;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const validateForm = () => {
    const requiredFields = ["title", "author", "genre", "condition", "location"];
    let formIsValid = true;
    let newErrors = {};
    let newTouched = {};

    requiredFields.forEach(field => {
      newTouched[field] = true;
      if (!bookData[field]) {
        formIsValid = false;
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (bookData.externalURL && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(bookData.externalURL)) {
      formIsValid = false;
      newErrors.externalURL = "Please enter a valid URL";
    }

    setErrors(newErrors);
    setTouched(newTouched);
    return formIsValid;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let images = [];
    images.push(bookImage);

    setIsLoading(true);
    await addNewBook(bookData, images);
    setIsLoading(false);

  };

  const Input = ({ label, name, type, placeholder, required = false, icon }) => (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={bookData[name] || ""}
          onChange={handleChange}
          onFocus={() => handleFocus(name)}
          ref={el => (inputRefs.current[name] = el)}
          onBlur={handleBlur}
          className={`${icon ? "pl-10" : "pl-4"} outline-none w-full px-4 py-3 rounded-lg border ${touched[name] && errors[name]
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            } shadow-sm transition duration-200 bg-white`}
        />
      </div>
      {touched[name] && errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  const Select = ({ label, name, options, required = false }) => (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={bookData[name] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full px-4 py-3 rounded-lg border ${touched[name] && errors[name]
          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
          : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          } shadow-sm transition duration-200 bg-white`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option?.toUpperCase().trim()}>
            {option}
          </option>
        ))}
      </select>
      {touched[name] && errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  const TabButton = ({ id, label, active, onClick, icon }) => (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${active
        ? "bg-indigo-100 text-indigo-800"
        : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <>
      <Intro
        heading="Add a New Book"
        description="Let the community read your book and help you improve it."
      />
      <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-xl overflow-hidden my-10">
        <form onSubmit={handleSubmit}
          className="p-8"
        >

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            <TabButton
              id="details"
              label="Book Details"
              active={activeTab === "details"}
              onClick={setActiveTab}
              icon={<BookOpen className="h-4 w-4" />}
            />
            <TabButton
              id="media"
              label="Media & Description"
              active={activeTab === "media"}
              onClick={setActiveTab}
              icon={<Upload className="h-4 w-4" />}
            />
            <TabButton
              id="location"
              label="Location & Links"
              active={activeTab === "location"}
              onClick={setActiveTab}
              icon={<MapPin className="h-4 w-4" />}
            />
          </div>

          {activeTab === "details" && (
            <div className="space-y-1 animate-fadeIn">
              <div className="bg-indigo-50 p-5 rounded-lg mb-6 border border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-800 mb-2">Book Information</h3>
                <p className="text-sm text-indigo-600">Enter the basic details about your book</p>
              </div>

              <Input
                label="Title"
                name="title"
                type="text"
                placeholder="Enter book title"
                required
                icon={<BookOpen className="h-5 w-5 text-indigo-400" />}
              />

              <Input
                label="Author"
                name="author"
                type="text"
                placeholder="Enter author name"
                required
                icon={<User className="h-5 w-5 text-indigo-400" />}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Publication Year"
                  name="publishYear"
                  type="text"
                  placeholder="e.g., 2023"
                  icon={<Calendar className="h-5 w-5 text-indigo-400" />}
                />

                <Select
                  label="Genre"
                  name="genre"
                  options={genreOptions}
                  required
                />
              </div>

              <Select
                label="Condition"
                name="condition"
                options={conditionOptions}
                required
              />
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-1 animate-fadeIn">
              <div className="bg-indigo-50 p-5 rounded-lg mb-6 border border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-800 mb-2">Media & Description</h3>
                <p className="text-sm text-indigo-600">Upload an image and describe your book</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Image
                </label>
                <div className={`mt-1 p-8 border-2 rounded-lg ${preview ? "border-indigo-300 bg-indigo-50" : "border-dashed border-gray-300 bg-gray-50"
                  } flex flex-col items-center justify-center transition duration-200`}>
                  {preview ? (
                    <div className="relative mb-4 group">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-48 w-auto object-contain rounded-lg shadow-md transition-all duration-200 group-hover:shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
                        <button
                          onClick={() => {
                            setPreview(null);
                            setBookData(prev => ({ ...prev }));
                            setBookImage(null)
                          }}
                          className="bg-white p-2 rounded-full shadow-lg"
                        >
                          <X className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-indigo-400" />
                      <p className="mt-2 text-sm text-gray-600 font-medium">Drag and drop an image or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG (Max: 5MB)</p>
                    </div>
                  )}
                  <label className="mt-4">
                    <span className={`px-4 py-2 rounded-md text-sm font-medium ${preview
                      ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                      } cursor-pointer transition duration-200 inline-block shadow-sm hover:shadow`}>
                      {preview ? "Change Image" : "Select Image"}
                    </span>
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

            </div>
          )}

          {activeTab === "location" && (
            <div className="space-y-1 animate-fadeIn">
              <div className="bg-indigo-50 p-5 rounded-lg mb-6 border border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-800 mb-2">Location & Links</h3>
                <p className="text-sm text-indigo-600">Provide location and additional link information</p>
              </div>

              <Input
                label="Location"
                name="location"
                type="text"
                placeholder="Enter your city or neighborhood"
                required
                icon={<MapPin className="h-5 w-5 text-indigo-400" />}
              />

              <Input
                label="External URL"
                name="externalURL"
                type="text"
                placeholder="Enter book URL (e.g., Amazon link, Goodreads page)"
                icon={<Link2 className="h-5 w-5 text-indigo-400" />}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t mt-6">
            <div className="flex mb-4 sm:mb-0">
              {activeTab !== "details" && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "media") setActiveTab("details");
                    if (activeTab === "location") setActiveTab("media");
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700 mr-2"
                >
                  Back
                </button>
              )}

              {activeTab !== "location" && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "details") setActiveTab("media");
                    if (activeTab === "media") setActiveTab("location");
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                >
                  Next
                </button>
              )}
            </div>

            {activeTab === "location" && (
              <ThemeButton
                btnLabel="ADD BOOK"
                isButtonLoading={isLoading}
                extraClasses="min-w-24"
              />
            )}
          </div>

        </form>

        <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      </div>
    </>

  );
};

export default AddNewBook;