import { createStore } from 'redux';
import { countReducer } from './components/counter/reducer';

export const store = createStore(countReducer);