// IMPORTING GLOBAL DEPENDENCIES
import { ToastContainer } from "react-toastify";

// Auth
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from "../navigation/navigation";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-phone-input-2/lib/style.css";
import "../assets/styles/Sass/globals.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          theme="dark"
          position="bottom-left"
          closeOnClick={true}
          pauseOnHover={false}
        />
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
