export const validateBookInfo = (title, author, genre, condition, location) => {
    if (!title || !title.trim()) {
        return { isvalid: false, message: "Book title is required." };
    }
    if (!author || !author.trim()) {
        return { isvalid: false, message: "Author name is required." };
    }
    if (!genre || !genre.trim()) {
        return { isvalid: false, message: "Book genre is required." };
    }
    if (!condition || !condition.trim()) {
        return { isvalid: false, message: "Book condition is required." };
    }
    if (!location || !location.trim()) {
        return { isvalid: false, message: "Location is required." };
    }
    return { isvalid: true };
};