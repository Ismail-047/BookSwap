import React, { useEffect, useState } from "react";
import { Images, Camera } from "lucide-react";
import toast from "react-hot-toast";

function SelectUserProfileImage({
    setProfileImage
}) {

    const [error, setError] = useState(false);
    const [profileImageURL, setProfileImageURL] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);
            setProfileImageURL(URL.createObjectURL(file));
        }
    };

    return (
        <div className="demo">

            <div className="flex flex-col items-center justify-center space-y-3">

                <div className="relative h-24 w-24">

                    <div className={`h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100 ${profileImageURL ? "" : "border-dashed"} ${error ? "border-red-400" : "border-gray-300 "}`}>
                        {profileImageURL ? (
                            <img src={profileImageURL} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <Camera className={`h-8 w-8 ${error ? "text-red-400" : "text-gray-400"}`} />
                        )}
                    </div>

                    <label htmlFor="profile-upload" className="absolute -bottom-1 -right-1 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer">
                        <Images className="h-5 w-5 text-white" />
                        <input
                            id="profile-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                        />
                    </label>

                </div>

                <p className="text-xs text-gray-500">Upload profile picture</p>
            </div>

        </div>
    )
}

export default SelectUserProfileImage;