import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../api/axios";

export const fetchLeads =
  createAsyncThunk(
    "leads/fetchLeads",

    async (params: any) => {
      const res = await API.get(
        "/leads",
        {
          params,
        }
      );

      return res.data;
    }
  );
const leadSlice = createSlice({
  name: "leads",

  initialState: {
    leads: [],
    loading: false,
    pagination: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchLeads.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchLeads.fulfilled,
      (state, action) => {
        state.loading = false;

        state.leads = action.payload.data;
        state.pagination = action.payload.pagination;
      }
    );

    builder.addCase(
      fetchLeads.rejected,
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default leadSlice.reducer;