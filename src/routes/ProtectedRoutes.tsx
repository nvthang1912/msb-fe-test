import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken } from '../utils/common'
import { SideBarMenu } from '../components'
import { Suspense, useMemo } from 'react'
import { Breadcrumb, ConfigProvider, Spin } from 'antd'

const ProtectedRoutes = () => {
  const accessToken = getToken()
  const location = useLocation()
  const { pathname } = location

  const breadcrumb = useMemo(() => {
    return [
      {
        title: 'Trang chủ',
        href: '/',
      },
      {
        title:
          pathname === '/account-info'
            ? 'Thông tin tài khoản'
            : 'Thông tin sản phẩm',
      },
    ]
  }, [pathname])

  return accessToken ? (
    <div className="account-layout">
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              lastItemColor: '#F4600C',
            },
          },
        }}
      >
        <Breadcrumb
          className="account-layout-breadcrumb"
          separator=">"
          items={breadcrumb}
        />
      </ConfigProvider>
      <div className="account-layout-container">
        <div className="account-layout-sidebar">
          <SideBarMenu />
        </div>
        <div className="account-layout-content">
          <Suspense fallback={<Spin fullscreen={true} />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  )
}

export default ProtectedRoutes
