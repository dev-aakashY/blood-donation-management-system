import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import FindDonor from "./pages/FindDonor.jsx";
import RegisterDonor from "./pages/RegisterDonor.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function useAuth() {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("pd_token"));
}

function ProtectedRoute({ children }) {
  const authed = useAuth();
  const location = useLocation();
  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function NavBar() {
  const navigate = useNavigate();
  const authed = useAuth();

  const logout = () => {
    localStorage.removeItem("pd_token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary text-white flex items-center justify-center font-display text-lg">PD</div>
          <div>
            <p className="font-display text-slate-900 text-lg">PulseDrop</p>
            <p className="text-xs text-slate-500">Blood donation network</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm font-semibold">
          <NavLink
            to="/find"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${isActive ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary"}`
            }
          >
            Find donors
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${isActive ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary"}`
            }
          >
            Register donor
          </NavLink>
          {!authed && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ${isActive ? "text-primary bg-primary/10" : "text-slate-600 hover:text-primary"}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `primary-btn px-3 py-2 ${isActive ? "ring-2 ring-primary/50" : ""}`
                }
              >
                Sign up
              </NavLink>
            </>
          )}
          {authed && (
            <button className="ghost-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-1 bg-gradient-to-r from-primary via-accent to-primary/70" aria-hidden />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/find"
            element={(
              <ProtectedRoute>
                <FindDonor />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/register"
            element={(
              <ProtectedRoute>
                <RegisterDonor />
              </ProtectedRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
