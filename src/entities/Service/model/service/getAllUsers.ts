import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServiceApi } from 'entities/Service/api';

export const getAllUsers = createAsyncThunk('getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await ServiceApi.getAllUser();
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getAllChats = createAsyncThunk('getAllChats', async (_, { rejectWithValue }) => {
    try {
        const response = await ServiceApi.getAllGroups();
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
