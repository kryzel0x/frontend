import { combineReducers } from 'redux';
import { UserSlice } from './user.slice'
import { LoadingSlice } from './loading.slice';

/**COMBINE ALL REDUCERS */
export const reducers = combineReducers({
    loading: LoadingSlice.reducer,
    user: UserSlice.reducer,
});