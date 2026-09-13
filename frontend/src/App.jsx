import { useUser } from "@clerk/react";
import "./index.css";
import SessionPage from "./pages/SessionPage.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import ProblemPage from "./pages/ProblemPage.jsx";
function App() {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  // Wait until Clerk has finished checking authentication
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log("isSignedIn:", isSignedIn);

  return (
    <>
      

      <Routes>
                <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
                <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
                <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" replace /> }/>
                <Route path="/problem/:problemId" element={ isSignedIn ? <ProblemPage /> : <Navigate to="/" replace />}/>
                <Route
                  path="/session/:id"
                  element={
                    isSignedIn ? (
                      <SessionPage />
                    ) : (
                      <HomePage redirectUrl={`${location.pathname}${location.search}`} />
                    )
                  }
                />
      
      </Routes>


      <Toaster toastOptions={{duration:3000}}/>
    </>
  );
}

export default App;

//tw, daisyui, react-router, react-hot-toaster, reat-hot-toast,
//todo: react-query aka tanstack query , axios
//! mkdnksandka
//? mkdnksandka
//* mkdnksandka