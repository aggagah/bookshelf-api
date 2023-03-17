import {
    createBook,
    viewBook,
    detailBook,
    editBook,
    deleteBook,
} from "./handler.js";

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: createBook,
    },

    {
        method: "GET",
        path: "/books",
        handler: viewBook,
    },

    {
        method: "GET",
        path: "/books/{bookId}",
        handler: detailBook,
    },

    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: editBook,
    },

    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBook,
    },
];

export default routes;
