import React, { useEffect, useRef, useState } from "react";
import { Book, PenLine, Camera, MapPin, Calendar, Globe, Tag, User, BookOpen } from "lucide-react";
import { ThemeButton } from "../components/Buttons";
import { bookConditionEnum, bookGenreEnum } from "../constants.js";
import useBookStore from "../zustand/book.store.js";
import { useParams } from "react-router-dom";

const EditBookPage = () => {
    const { id } = useParams(); // 1. Get the ID from route params
    const { allBooks, updateBook } = useBookStore(); // 2. Access allBooks from store

    const inputRefs = useRef({});
    const [isEditing, setIsEditing] = useState(false);

    const [focusedField, setFocusedField] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        condition: "",
        location: "",
        publicationYear: "",
        externalURL: "",
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!id || !allBooks.length) return;

        const foundBook = allBooks.find(b => b._id === id);

        if (foundBook) {
            setBook({
                title: foundBook.title || "",
                author: foundBook.author || "",
                genre: foundBook.genre || "",
                condition: foundBook.condition || "",
                location: foundBook.location || "",
                publicationYear: foundBook.publicationYear || "",
                externalURL: foundBook.externalURL || "",
            });
            setImage(foundBook?.image || null);
        }
    }, [id, allBooks]);

    useEffect(() => {
        if (focusedField && inputRefs.current[focusedField]) {
            inputRefs.current[focusedField].focus();
        }
    }, [book, focusedField]);

    const handleUpdateBook = async (e) => {
        e.preventDefault();

        let images = [];
        images.push(image);

        setIsLoading(true);
        await updateBook(id, book, images);
        setIsLoading(false);

        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setBook({
            title: book.title || "",
            author: book.author || "",
            genre: book.genre || "",
            condition: book.condition || "",
            location: book.location || "",
            publicationYear: book.publicationYear || "",
            externalURL: book.externalURL || "",
        });
        setImage(book?.image || null);
        setIsEditing(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    }

    const handleFocus = (name) => {
        setFocusedField(name);
    };

    // Get today's date
    const today = new Date();
    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);

    const TextInput = ({
        label,
        name,
        value,
        onChange,
        type = "text",
        placeholder,
        Icon,
        required = false,
        endIcon = null,
        onEndIconClick = null,
    }) => (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-blue-600">*</span>}
            </label>
            <div className="relative">
                {Icon &&
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Icon size={18} />
                    </div>
                }
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    readOnly={!isEditing}
                    onChange={onChange}
                    className={`w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none ${isEditing && "focus:ring-2"} focus:ring-blue-500`}
                    placeholder={placeholder}
                    required={required}
                    onFocus={() => handleFocus(name)}
                    ref={el => (inputRefs.current[name] = el)}
                />
                {endIcon && (
                    <div onClick={onEndIconClick}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400">
                        {endIcon}
                    </div>
                )}
            </div>
        </div>
    );

    const SelectInput = ({
        label,
        name,
        value,
        onChange,
        options,
        Icon,
        required = false,
    }) => (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-blue-600">*</span>}
            </label>
            <div className="relative">
                {Icon &&
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Icon size={18} />
                    </div>
                }
                <select
                    id={name}
                    name={name}
                    value={value}
                    readOnly={!isEditing}
                    onChange={onChange}
                    className={`w-full pl-10 py-2 border border-gray-200 rounded-lg focus:outline-none ${isEditing && "focus:ring-2"} focus:ring-blue-500`}
                    required={required}
                    onFocus={() => handleFocus(name)}
                    ref={el => (inputRefs.current[name] = el)}
                >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Edit Book</h1>
                            <p className="text-sm text-gray-500">{formattedDate}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <Book size={20} />
                        </div>
                    </div>

                    {/* Book Banner */}
                    <div className="h-32 bg-gradient-to-r from-sky-100 to-indigo-100 relative" />

                    {/* Book Content */}
                    <div className="px-6 pb-6">
                        <div className="flex items-end justify-between -mt-24 mb-2">
                            <div className="flex items-end">
                                <div className="relative">
                                    <div className="h-36 w-36 rounded-lg border-4 border-white bg-blue-100 flex items-center justify-center text-indigo-600 text-2xl overflow-hidden shadow-lg">
                                        {preview ? (
                                            <img src={preview} alt="Book Cover" className="h-full w-full object-cover" />
                                        ) : image ? (
                                            <img src={image} alt="Book Picture" className="h-full w-full object-contain" />
                                        ) : (
                                            <BookOpen size={40} />
                                        )}
                                    </div>

                                    <label className="absolute bottom-0 right-0 bg-indigo-400 text-white p-2.5 rounded-full shadow-md cursor-pointer hover:bg-indigo-600">
                                        <Camera size={18} />
                                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="ml-4">
                            <h2 className="text-xl font-semibold text-gray-800">{book.title || "Book Title"}</h2>
                            <p className="text-gray-500 text-sm">by {book.author || "Author"}</p>
                        </div>

                        {/* Form Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
                            <TextInput
                                label="Book Title"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                required={true}
                                Icon={BookOpen}
                            />

                            <TextInput
                                label="Author"
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                required={true}
                                Icon={User}
                            />

                            <SelectInput
                                label="Genre"
                                name="genre"
                                value={book.genre}
                                onChange={handleChange}
                                options={bookGenreEnum}
                                required={true}
                                Icon={Tag}
                            />

                            <SelectInput
                                label="Condition"
                                name="condition"
                                value={book.condition}
                                onChange={handleChange}
                                options={bookConditionEnum}
                                required={true}
                                Icon={PenLine}
                            />

                            <TextInput
                                label="Location"
                                name="location"
                                value={book.location}
                                onChange={handleChange}
                                placeholder="Where is this book located?"
                                required={true}
                                Icon={MapPin}
                            />

                            <TextInput
                                label="Publication Year"
                                name="publicationYear"
                                value={book.publicationYear}
                                onChange={handleChange}
                                placeholder="e.g. 2020"
                                Icon={Calendar}
                            />

                            <div className="md:col-span-2">
                                <TextInput
                                    label="External URL"
                                    name="externalURL"
                                    value={book.externalURL}
                                    onChange={handleChange}
                                    placeholder="e.g. Goodreads link"
                                    Icon={Globe}
                                />
                            </div>
                        </div>

                        <div className="mt-2 flex justify-end">
                            {isEditing ? (
                                <div className="flex space-x-3">
                                    <ThemeButton
                                        btnLabel="CANCEL"
                                        onClick={handleCancel}
                                        extraClasses="bg-gray-500"
                                    />
                                    <ThemeButton
                                        btnLabel="SAVE CHANGES"
                                        extraClasses="min-w-40"
                                        isButtonLoading={isLoading}
                                        onClick={handleUpdateBook}
                                    />
                                </div>
                            ) : (
                                <ThemeButton
                                    btnLabel="EDIT BOOK"
                                    onClick={() => setIsEditing(true)}
                                />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBookPage;