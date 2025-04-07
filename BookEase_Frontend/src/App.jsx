import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth_Main_Page from "./pages/Auth_Main_Page";
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import PrivetRoute from "./PrivetRoute";
import AuthPrivetRoute from "./AuthPrivetRoute";
import Base_page from "./pages/Base_page";
import { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner";
function App() {
  
   const Dashboard = lazy(()=>import('./Components/Dashboard.jsx'))
   const MyBooks = lazy(()=>import('./Components/MyBooks.jsx'))


  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persist}>
        <Toaster richColors position="top-center" />
          <Router>
            <Routes>
              <Route path="/" element={<AuthPrivetRoute><Auth_Main_Page /></AuthPrivetRoute>} />
              <Route path='/dashboard' element={<PrivetRoute><Base_page /></PrivetRoute>} >
                <Route index element={<Suspense fallback={<Spinner />}><Dashboard/></Suspense>} />
                <Route path="/dashboard/mybooks" element={<Suspense fallback={<Spinner />}><MyBooks/></Suspense>} />


              </Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
