import { Suspense } from 'react'
import { Spin } from 'antd'
import { Routes, Route } from 'react-router-dom'

import { Home } from './pages'
import PrivateRoutes from './routes/ProtectedRoutes'
import { PRIVATE_ROUTES } from './routes/routes'
import { Header, Footer } from './components'

function App() {
  return (
    <div className="msb-app">
      <Header />
      <Suspense fallback={<Spin fullscreen={true} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            {PRIVATE_ROUTES.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
