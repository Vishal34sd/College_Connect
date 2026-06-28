import { Routes, Route, Navigate } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-950 transition-colors duration-300">
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateTaskPage />} />
          <Route path="/edit/:id" element={<EditTaskPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
