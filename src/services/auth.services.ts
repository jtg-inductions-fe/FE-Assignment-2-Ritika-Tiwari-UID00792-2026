import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@types';

/** Async thunk action creator
 * fetches a list of mock registered users from the json file
 * returns a rejected promise with a clean error string if the request fails.
 */
export const fetchUsers = createAsyncThunk(
    'auth/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('/mock/users.json');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = (await response.json()) as User[];
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    },
);
