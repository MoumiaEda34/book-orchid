import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk to fetch book data from a REST API endpoint
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch("http://localhost:8000/books"); // Updated URL to fetch from localhost
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await response.json();
  return data; // Assuming the JSON structure matches your app
});

// Create a slice for books
const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Update state with fetched books
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default booksSlice.reducer;
