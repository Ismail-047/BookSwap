export const logError = (context, error) => {
   console.error(`
------------------------------------------------------------------------
[ERROR] Error in "${context}"
   \nERROR MESSAGE: ${error.message}
   \nERROR STACK: ${error.stack}
\nTIMESTAMP: ${new Date().toISOString()}
------------------------------------------------------------------------
`);
}

export const getformatedLastSeen = (date) => {
   const lastSeenDate = new Date(date);
   const now = new Date();

   // Check if the date is today
   const isToday = lastSeenDate.toDateString() === now.toDateString();

   // Check if the date is yesterday
   const yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);
   const isYesterday = lastSeenDate.toDateString() === yesterday.toDateString();

   // Format time as 12-hour format with AM/PM
   const options = { hour: '2-digit', minute: '2-digit', hour12: true };
   const formattedTime = lastSeenDate.toLocaleTimeString('en-US', options);

   if (isToday) {
      return `Last seen today at ${formattedTime}`;
   } else if (isYesterday) {
      return `Last seen yesterday at ${formattedTime}`;
   } else {
      // Show full date if older than yesterday
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return `Last seen on ${lastSeenDate.toLocaleDateString('en-US', options)} at ${formattedTime}`;
   }
}

export const getFormatedTimeSidebarUsers = (date) => {
   const lastSeenDate = new Date(date);
   const now = new Date();

   // Check if the date is yesterday
   const yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);
   const isYesterday = lastSeenDate.toDateString() === yesterday.toDateString();

   // If yesterday, return "Yesterday"
   if (isYesterday) {
      return "Yesterday";
   }
   // If older than yesterday, return DD/MM/YYYY format
   if (lastSeenDate < yesterday) {
      const day = String(lastSeenDate.getDate()).padStart(2, '0');
      const month = String(lastSeenDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = lastSeenDate.getFullYear();
      return `${day}/${month}/${year}`;
   }
   // Otherwise, return the time in HH:MM AM/PM format
   const options = { hour: '2-digit', minute: '2-digit', hour12: true };
   return lastSeenDate.toLocaleTimeString('en-US', options);
}

export const areObjectsEqual = (obj1, obj2) => {
   return Object.keys(obj1).length === Object.keys(obj2).length &&
      Object.keys(obj1).every(key => obj1[key] === obj2[key]);
};

export const fuzzyMatch = (name, query) => {
   let nameIndex = 0;
   let queryIndex = 0;

   while (nameIndex < name.length && queryIndex < query.length) {
      if (name[nameIndex] === query[queryIndex]) {
         queryIndex++;
      }
      nameIndex++;
   }
   return queryIndex === query.length;
};