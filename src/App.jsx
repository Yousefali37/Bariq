import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import Shop from './pages/Shop'
import Story from './pages/Story'
import AdminLayout from './pages/Admin/Layout'
import AdminLogin from './pages/Admin/Login'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminProducts from './pages/Admin/Products'
import AdminMedia from './pages/Admin/Media'
import { CatalogProvider } from './context/CatalogContext'
import { CurrencyProvider } from './context/CurrencyContext'
import { SavedProvider } from './context/SavedContext'
import { RecentlyViewedProvider } from './context/RecentlyViewedContext'

export default function App() {
  return (
    <CatalogProvider>
      <CurrencyProvider>
        <SavedProvider>
          <RecentlyViewedProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="collections" element={<Navigate to="/shop" replace />} />
                <Route path="piece/:slug" element={<Product />} />
                <Route path="story" element={<Story />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<Legal kind="privacy" />} />
                <Route path="terms" element={<Legal kind="terms" />} />
              </Route>
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="media" element={<AdminMedia />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RecentlyViewedProvider>
        </SavedProvider>
      </CurrencyProvider>
    </CatalogProvider>
  )
}
