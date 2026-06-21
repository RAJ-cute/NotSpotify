import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AlbumDetail from "./pages/AlbumDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArtistDashboard from "./pages/ArtistDashboard";

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="app-main">{children}</main>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/browse"
        element={
          <AppLayout>
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </AppLayout>
        }
      />

      <Route
        path="/albums/:albumId"
        element={
          <AppLayout>
            <ProtectedRoute>
              <AlbumDetail />
            </ProtectedRoute>
          </AppLayout>
        }
      />

      <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
      <Route path="/signup" element={<AppLayout><Signup /></AppLayout>} />

      <Route
        path="/dashboard"
        element={
          <AppLayout>
            <ProtectedRoute requireRole="artist">
              <ArtistDashboard />
            </ProtectedRoute>
          </AppLayout>
        }
      />
    </Routes>
  );
}
