import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "../zustand/authStore";
import { Mail, Lock, User, Phone, MapPin, Camera, Pencil, ArrowRight, UserRoundPlus } from "lucide-react";
import { ThemeButton } from "../components/Buttons";
import useUserStore from "../zustand/userStore";
import Intro from "../components/Intro";

const ProfilePage = () => {

  const { authUser } = useAuthStore();
  const { updateUserProfile } = useUserStore();

  const inputRefs = useRef({});
  const [focusedField, setFocusedField] = useState(null);

  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    email: authUser?.email || "",
    address: authUser?.address || "",
    lastName: authUser?.lastName || "",
    firstName: authUser?.firstName || "",
    mobileNumber: authUser?.mobileNumber || "",
  });
  const [profilePic, setProfilePic] = useState(authUser?.profilePic);

  useEffect(() => {
    if (focusedField && inputRefs.current[focusedField]) {
      inputRefs.current[focusedField].focus();
    }
  }, [currentUser, focusedField]);

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();

    let images = [];
    images.push(profilePic);

    setIsLoading(true);
    await updateUserProfile(currentUser, images);
    setIsLoading(false);

    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setCurrentUser({
      email: authUser?.email || "",
      address: authUser?.address || "",
      lastName: authUser?.lastName || "",
      firstName: authUser?.firstName || "",
      mobileNumber: authUser?.mobileNumber || "",
    });
    setProfilePic(authUser?.profilePic || "");
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  }

  const handleFocus = (name) => {
    setFocusedField(name);
  };

  // Get today"s date
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
    disabled = false
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
          onChange={onChange}
          className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
          onFocus={() => handleFocus(name)}
          ref={el => (inputRefs.current[name] = el)}
          disabled={disabled}
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

  return (
    <>
      <Intro
        heading={`${currentUser?.firstName + " " + currentUser?.lastName}'s Profile`}
        description="Manage your profile information and preferences."
      />

      <div className="min-h-screen bg-gray-50">

        <div className="animate-themeAnimationLg max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Welcome, {currentUser.firstName}</h1>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-500 overflow-hidden">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.firstName && currentUser.lastName ?
                      `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}` : ""}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Banner */}
            <div className="h-32 bg-gradient-to-r from-sky-100 to-indigo-100 relative" />

            {/* Profile Content */}
            <div className="px-6 pb-6">

              <div className="flex items-end justify-between -mt-16 mb-2">

                <div className="flex items-end">

                  <div className="relative">

                    <div className="h-24 w-24 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-500 text-2xl overflow-hidden shadow-lg">
                      {profilePic ? (
                        <img src={preview || profilePic} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <div className="font-bold">
                          {currentUser.firstName && currentUser.lastName ?
                            `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}` : ""}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-indigo-400 text-white p-2.5 rounded-full shadow-md cursor-pointer hover:bg-indigo-600">
                        <Pencil size={18} />
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                      </label>
                    )}

                  </div>

                </div>

              </div>

              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{currentUser.firstName} {currentUser.lastName}</h2>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
              </div>

              {/* Form Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">

                <TextInput label="First Name"
                  name="firstName"
                  value={currentUser.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required={true}
                  disabled={!isEditing}
                  Icon={User}
                />

                <TextInput label="Last Name"
                  name="lastName"
                  value={currentUser.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required={true}
                  disabled={!isEditing}
                  Icon={User}
                />

                <TextInput label="Email Address"
                  name="email"
                  value={currentUser.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={true}
                  Icon={Mail}
                />

                <TextInput label="Mobile Number"
                  name="mobileNumber"
                  value={currentUser.mobileNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  disabled={!isEditing}
                  Icon={Phone}
                />

                <div className="md:col-span-2">
                  <TextInput
                    label="Address"
                    name="address"
                    value={currentUser.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country"
                    disabled={!isEditing}
                    Icon={MapPin}
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
                      onClick={handleUpdateUserProfile}
                    />
                  </div>
                ) : (
                  <ThemeButton
                    btnLabel="EDIT PROFILE"
                    onClick={() => setIsEditing(true)}
                  />
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ProfilePage;