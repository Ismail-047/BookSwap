/**
 * Sends a standardized JSON response to the client.
 *
 * @param {Object} res - The response object (from Express).
 * @param {number} status - The HTTP status code to send in the response.
 * @param {boolean} success - A boolean indicating whether the request was successful or not.
 * @param {string} message - A message that provides details about the request's outcome.
 * @param {Object | null} [data=null] - Optional data to include in the response. If no data is provided, it defaults to null.
 * 
 * @returns {Object} The response object with the appropriate status and body, in JSON format.
 */
export const sendRes = async (res, status, message, data = null) => {
   const response = { message };
   if (data) response.data = data;
   return res.status(status).json(response);
}  