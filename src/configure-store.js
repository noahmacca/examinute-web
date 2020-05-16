import { createStore } from 'redux';
import { dataPageReducer } from './components/DataPage/reducer';

export const store = createStore(dataPageReducer);
