import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Article from './pages/Article'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Journal from './pages/Journal'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import Shop from './pages/Shop'
import Story from './pages/Story'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<Shop />} />
        <Route path="piece/:slug" element={<Product />} />
        <Route path="story" element={<Story />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal kind="privacy" />} />
        <Route path="terms" element={<Legal kind="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
