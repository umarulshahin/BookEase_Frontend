import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth_Main_Page from "./pages/Auth_Main_Page";
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Dashboard from "./Components/Dashboard";
import PrivetRoute from "./PrivetRoute";
import AuthPrivetRoute from "./AuthPrivetRoute";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persist}>
        <Toaster richColors position="top-center" />
          <Router>
            <Routes>
              <Route path="/" element={<AuthPrivetRoute><Auth_Main_Page /></AuthPrivetRoute>} />
              <Route path='/dashboard' element={<PrivetRoute><Dashboard /></PrivetRoute>} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
