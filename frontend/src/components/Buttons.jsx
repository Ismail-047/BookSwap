// REACT
import React from "react";
// ICONS
import { Loader } from "lucide-react";

function ThemeButton({
    Icon,
    onClick,
    btnLabel,
    isButtonLoading,
    isButtonDisabled,
    extraClasses,
}) {
    return (
        <button type="submit" onClick={onClick}
            className={`flex items-center justify-center gap-2.5 bg-indigo-600 font-bold h-[40px] text-white rounded hover:ring-red-300  hover:ring-2 transition-all duration-300 ease-in-out px-5 disabled:opacity-70
            ${extraClasses}`}
            disabled={isButtonDisabled || isButtonLoading ? true : false}
        >
            {isButtonLoading ? (
                <Loader className="text-xl animate-spin" />
            ) : (
                <> {Icon && <Icon />} {btnLabel}</>
            )}
        </button>
    )
}
export { ThemeButton };
