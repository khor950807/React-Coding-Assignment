import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnimeDetails from "./pages/AnimeDetails";
import AnimeListPage from "./pages/AnimeListPage";
import MyFavouritePage from "./pages/MyFavouritePage";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/anime" replace />} />
          <Route path="/anime" element={<AnimeListPage />} />
          <Route path="/my-favourite" element={<MyFavouritePage />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="*" element={<Navigate to="/anime" replace />} />
        </Routes>
      </Layout>

    </BrowserRouter>
  )
}

export default App
