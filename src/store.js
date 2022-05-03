import { createStore } from 'redux';
import reducer from './toast/store/reducer/toastReducer';

export const store = createStore(reducer);

export default store;