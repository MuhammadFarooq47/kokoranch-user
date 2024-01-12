import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import storage from redux-persist


const persistConfig = {
  key: 'root',
  storage, // Use the imported storage here
  
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...[thunk]))
);

const persistor = persistStore(store);

export { store, persistor };
