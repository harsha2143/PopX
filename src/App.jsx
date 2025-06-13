import { useEffect, useState } from "react";
import WelcomePage from "./components/Welcomepage";
import CreateAccountPage from "./components/CreateAccountPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [userData, setUserData] = useState(null);

  // On first load, always reset to 'welcome' page in history and state
  useEffect(() => {
    window.history.replaceState({ page: "welcome" }, "", "");
    setCurrentPage("welcome");

    const onPopState = (event) => {
      const state = event.state;
      if (!state || !["welcome", "create", "login", "profile"].includes(state.page)) {
        setCurrentPage("welcome");
      } else {
        setCurrentPage(state.page);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Handlers to navigate and update history state
  const goToCreate = () => {
    window.history.pushState({ page: "create" }, "", "");
    setCurrentPage("create");
  };

  const goToLogin = () => {
    window.history.pushState({ page: "login" }, "", "");
    setCurrentPage("login");
  };

  const handleCreate = (data) => {
    setUserData(data);
    window.history.pushState({ page: "profile" }, "", "");
    setCurrentPage("profile");
  };

  const handleLogin = (data) => {
    setUserData(data);
    window.history.pushState({ page: "profile" }, "", "");
    setCurrentPage("profile");
  };

  // Pass navigation functions as props to WelcomePage so it can navigate properly
  return (
    <div className=" flex justify-center items-center ">
      {currentPage === "welcome" && (
        <WelcomePage goToCreate={goToCreate} goToLogin={goToLogin} />
      )}
      {currentPage === "create" && <CreateAccountPage onCreate={handleCreate} />}
      {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
      {currentPage === "profile" && <ProfilePage userData={userData} />}
    </div>
  );
}
