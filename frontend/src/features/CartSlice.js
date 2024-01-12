import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await axios.get("/carts");
  return response.data;
});

export const inputCart = createAsyncThunk("cart/inputCart", async (data) => {
  await axios.post("/carts", data);
  const response = await axios.get("/carts");
  return response.data;
});

export const updateCart = createAsyncThunk("cart/updateCart", async (data) => {
  await axios.put(`/carts/${data.id}`, data);
  const response = await axios.get("/carts");
  return response.data;
});

export const delCart = createAsyncThunk("cart/delCart", async (data) => {
  await axios.delete(`/carts/${data}`);
  const cart = await axios.get("/carts");
  return cart.data;
});

export const updCart = createAsyncThunk("cart/updCart", async (data) => {
  data.totalPrice = data.qty * data.price;
  await axios.put(`/carts/${data.id}`, data);
  const cart = await axios.get("/carts");
  return cart.data;
});

export const saveOrder = createAsyncThunk("cart/saveOrder", async (data) => {
  await axios.post("/orders", data);
  axios.get("/carts").then((cart) => {
    const data = cart.data;
    data.map(async (item) => {
      try {
        await axios.delete(`/carts/${item.id}`);
      } catch (error) {
        return null;
      }
    });
  });
  const response = await axios.get("/carts");
  return response.data;
});

export const setDetail = createAsyncThunk("cart/setDetail", async (data) => {
  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    loading: false,
    error: null,
    dataEdit: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      })
      // input cart
      .addCase(inputCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(inputCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(inputCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      })
      // update cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      })
      // save order
      .addCase(saveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(saveOrder.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      })
      // set detail
      .addCase(setDetail.fulfilled, (state, action) => {
        state.dataEdit = action.payload;
      })
      // delete cart
      .addCase(delCart.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      // update cart
      .addCase(updCart.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default cartSlice.reducer;
