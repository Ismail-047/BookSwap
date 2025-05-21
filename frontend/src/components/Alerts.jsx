// REACT
import React from "react";
// ICONS
import { FiInfo } from "react-icons/fi";
import { BiError } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { FaRegCircleCheck } from "react-icons/fa6";
// ZUSTAND 
// COMPONENTS
import useComponentStore from "../zustand/componentStore";

function AlertMessage({
   id,
   alertType,
   removeAlert,
   alertMessage,
}) {
   return (
      <div className={`animate-alertAnimation flex transition-all duration-500 ease-in-out ring-2 px-3 py-2 sm:py-3 sm:px-5 sm:pr-9 rounded w-[70vw] md:w-auto md:max-w-[35vw] relative

         ${alertType === "ERROR" && "text-red-800 ring-red-800 bg-red-300"} 
         ${alertType === "INFO" && "text-blue-400 ring-blue-800 bg-blue-300"} 
         ${alertType === "SUCCESS" && "text-green-800 ring-green-800 bg-green-400"}`}
      >
         {alertType === "INFO" && <FiInfo className="text-xl flex-shrink-0 inline" />}
         {alertType === "ERROR" && <BiError className="text-2xl flex-shrink-0" />}
         {alertType === "SUCCESS" && <FaRegCircleCheck className="text-xl flex-shrink-0" />}

         <p className="pl-2 break-words max-w-[80vw] inline">
            {alertMessage}
         </p>

         <button onClick={() => removeAlert(id)}
            className="absolute top-2 right-2 "
         >
            <ImCross />
         </button>
      </div>
   )
}
function AlertsContainer() {
   const { alerts, removeAlert } = useComponentStore();

   return (
      <div className="fixed top-6 left-[50%] translate-x-[-50%] flex flex-col gap-2 z-[1000]">

         {alerts.map(({ id, alertType, alertMessage }) => (
            <AlertMessage
               id={id}
               key={id}
               alertType={alertType}
               removeAlert={removeAlert}
               alertMessage={alertMessage}
            />
         ))}

      </div>
   )
}


export { AlertsContainer };