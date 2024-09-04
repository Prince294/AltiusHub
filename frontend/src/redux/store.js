import { configureStore } from '@reduxjs/toolkit';
import LoadingReducer from './reducer/LoadingReducer';
import LoginReducer from './reducer/LoginReducer';
import ErrorTickerReducer from './reducer/ErrorTickerReducer';
import SuccessTickerReducer from './reducer/SuccessTickerReducer';

export default configureStore({
  reducer: {
    loading: LoadingReducer,
    login: LoginReducer,
    ErrorTicker: ErrorTickerReducer,
    SuccessTicker: SuccessTickerReducer,
  },
})