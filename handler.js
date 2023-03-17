import books from "./db.js";
import { nanoid } from "nanoid";

// menyimpan buku
export const createBook = (request, h) => {
    try {
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = request.payload;

        const id = nanoid(16);
        const numberYear = Number(year);
        const numberPageCount = Number(pageCount);
        const numberReadPage = Number(readPage);
        const finished = numberPageCount === numberReadPage ? true : false;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        if (!name) {
            const response = h.response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku",
            });

            response.code(400);
            return response;
        }
        if (numberReadPage > numberPageCount) {
            const response = h.response({
                status: "fail",
                message:
                    "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
            });
            response.code(400);
            return response;
        }
        const newBook = {
            id,
            name,
            year: numberYear,
            author,
            summary,
            publisher,
            pageCount: numberPageCount,
            readPage: numberReadPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        };

        books.push(newBook);
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: newBook.id,
            },
        });

        response.code(201);
        return response;
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

// menampilkan seluruh buku
export const viewBook = (request, h) => {
    // tidak perlu diberi pengkondisian data books kosong, karena value dari key books di bawah ini, otomatis mengambil value dari array books database.
    // jika array tersebut kosong, maka value dari key books akan otomatis []
    try {
        const response = h.response({
            status: "success",
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        });

        response.code(200);
        return response;
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

export const detailBook = (request, h) => {
    try {
        const { bookId } = request.params;

        const data = books.filter((item) => item.id === bookId);
        if (data.length > 0) {
            const response = h.response({
                status: "success",
                data: {
                    book: data[0],
                },
            });

            response.code(200);
            return response;
        }

        const response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan",
        });

        response.code(404);
        return response;
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

export const editBook = (request, h) => {
    try {
        const { bookId } = request.params;
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = request.payload;

        const numberYear = Number(year);
        const numberPageCount = Number(pageCount);
        const numberReadPage = Number(readPage);

        const data = books.filter((item) => item.id === bookId);
        if (data.length > 0) {
            if (!name) {
                const response = h.response({
                    status: "fail",
                    message: "Gagal memperbarui buku. Mohon isi nama buku",
                });

                response.code(400);
                return response;
            }

            if (numberReadPage > numberPageCount) {
                const response = h.response({
                    status: "fail",
                    message:
                        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
                });
                response.code(400);
                return response;
            }

            data[0].name = name;
            data[0].year = numberYear;
            data[0].author = author;
            data[0].summary = summary;
            data[0].publisher = publisher;
            data[0].pageCount = numberPageCount;
            data[0].readPage = numberReadPage;
            data[0].reading = reading;

            const response = h
                .response({
                    status: "success",
                    message: "Buku berhasil diperbarui",
                })
                .code(200);
            return response;
        } else {
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Id tidak ditemukan",
            });

            response.code(404);
            return response;
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

export const deleteBook = (request, h) => {
    try {
        const { bookId } = request.params;

        const findBookIndex = books.findIndex((book) => book.id === bookId);
        if (findBookIndex > -1) {
            books.splice(findBookIndex, 1);

            return h
                .response({
                    status: "success",
                    message: "Buku berhasil dihapus",
                })
                .code(200);
        }

        return h
            .response({
                status: "fail",
                message: "Buku gagal dihapus. Id tidak ditemukan",
            })
            .code(404);
    } catch (error) {
        return h.response(error.message).code(500);
    }
};
