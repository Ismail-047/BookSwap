// REACT
import React, { useState } from "react";
// COMPONENTS
import { ThemeButton } from "./Buttons";
// ZUSTAND
import useComponentStore from "../zustand/componentStore";

function Confirmation() {

    const [isDeleting, setIsDeleting] = useState(false);
    const { confirmationPrompt, setDisplayConfirmation, onYesButtonClick } = useComponentStore();

    const handleDeleteButtonClick = async () => {

        setIsDeleting(true);
        await onYesButtonClick();
        setIsDeleting(false);

        setDisplayConfirmation(false);
    }

    return (
        // BLACK BACKGROUND
        <div className="fixed top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center z-[990]">

            {/* CONFIRM DELETION CONTAINER */}
            <div className="animate-scale1 bg-white w-[90vw] max-w-[90vw] md:max-w-[35vw] p-5 md:px-8 rounded-md shadow-containerShadowBlack">

                {/* HEADING */}
                <h4 className="text-xl font-black text-red-500">
                    CONFIRM YOUR ACTION
                </h4>

                {/* DELETION PROMPT */}
                <p className="font-medium mt-2 mb-6">
                    {confirmationPrompt}
                </p>

                {/* CANCEL & DELETE BUTTONS */}
                <div className="w-full flex items-center justify-end">

                    {/* CANCEL BUTTON */}
                    <ThemeButton
                        onClick={() => setDisplayConfirmation(false)}
                        btnLabel="CANCEL"
                        extraClasses="w-[100px] mr-3"
                    />

                    {/* DELETE BUTTON */}
                    <ThemeButton
                        btnLabel="DELETE"
                        extraClasses="w-[100px] bg-red-500"
                        isButtonLoading={isDeleting}
                        onClick={handleDeleteButtonClick}
                    />

                </div>

            </div>

        </div>
    )
}

export default Confirmation;