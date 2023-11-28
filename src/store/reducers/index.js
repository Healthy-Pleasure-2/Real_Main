// src/store/reducers/index.js
import { combineReducers } from 'redux';
import counterReducer from './counterReducer'; // 예시 리듀서 파일

const rootReducer = combineReducers({
  counter: counterReducer,
  // 다른 리듀서들을 여기에 추가
});

export default rootReducer;
