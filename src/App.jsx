import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/produtos" element={<Navigate to="/products" replace />} />
      <Route path="/product/:id" element={<ProductViewPage />} />
      <Route path="/categorias" element={<PlaceholderPage title="Categorias" />} />
      <Route path="/meus-pedidos" element={<PlaceholderPage title="Meus Pedidos" />} />
      <Route path="/login" element={<PlaceholderPage title="Entrar" />} />
      <Route path="/cadastro" element={<PlaceholderPage title="Cadastre-se" />} />
      <Route
        path="*"
        element={<PlaceholderPage title="Página não encontrada" text="O endereço acessado não existe." />}
      />
    </Routes>
  );
}
