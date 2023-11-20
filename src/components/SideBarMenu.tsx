import React, { useMemo } from 'react'
import type { MenuProps } from 'antd'
import { ConfigProvider, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { getUserInfo } from '../utils/common'
import { LogoutAccount } from '../services/AuthenService'

import UserIcon from '../assests/images/user-menu.svg'
import ActiveUserIcon from '../assests/images/user-menu-active.svg'
import ProductIcon from '../assests/images/product-menu.svg'
import ActiveProductIcon from '../assests/images/product-menu-active.svg'
import LogoutIcon from '../assests/images/log-out.svg'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

export function SideBarMenu() {
  const userInfo = getUserInfo()
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const sidebarItems = useMemo(() => {
    return [
      getItem(
        'Thông tin tài khoản',
        'accountInfo',
        <img
          src={pathname === '/account-info' ? ActiveUserIcon : UserIcon}
          alt="down"
        />
      ),
      getItem(
        'Thông tin sản phẩm',
        'productInfo',
        <img
          src={pathname === '/product-info' ? ActiveProductIcon : ProductIcon}
          alt="down"
        />
      ),
      getItem('Đăng xuất', 'logout', <img src={LogoutIcon} alt="down" />),
    ]
  }, [pathname])

  const onClickSideMenu: MenuProps['onClick'] = (event) => {
    if (event.key === 'accountInfo') {
      navigate('/account-info')
    } else if (event.key === 'productInfo') {
      navigate('/product-info')
    } else {
      LogoutAccount()
      navigate('/')
    }
  }

  const selectedItem = useMemo(() => {
    if (pathname === '/account-info') {
      return 'accountInfo'
    } else {
      return 'productInfo'
    }
  }, [pathname])

  return (
    <>
      <div className="sidebar-user">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: '#FEF7F3',
              itemSelectedColor: '#F4600C',
            },
          },
        }}
      >
        <Menu
          className="side-menu"
          onClick={onClickSideMenu}
          selectedKeys={[selectedItem]}
          mode="inline"
          style={{ width: '100%' }}
          items={sidebarItems}
        />
      </ConfigProvider>
    </>
  )
}
