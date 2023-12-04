// IMPORTING GLOBAL DEPENDENCIES
import { ToastContainer } from "react-toastify";

// Auth
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "../navigation/navigation";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-phone-input-2/lib/style.css";
import "../assets/styles/Sass/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import SocketIo from "socket.io-client";

// const socket = SocketIo.connect("http://192.168.100.33:3030");
// console.log("🚀 ~ file: App.js:16 ~ socket:", socket);

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
