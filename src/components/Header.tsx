import { Avatar, Dropdown, Menu, message } from 'antd'
import type { MenuProps } from 'antd'
import React, { CSSProperties, useMemo, useState } from 'react'
import MSBLogo from '../assests/images/msb-logo.png'
import Phone from '../assests/images/phone.png'
import ArrowDown from '../assests/images/down.png'
import { Login } from '../components'
import { getToken, getUserInfo } from '../utils/common'
import { LoginAccount, LogoutAccount } from '../services/AuthenService'
import { useNavigate } from 'react-router-dom'
import { LoginRequest, LoginResponse } from '../types/User'
import { ConsultRequest } from '../components'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  style?: CSSProperties,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    style,
  } as MenuItem
}

export const Header = () => {
  const [isOpenModalLogin, setIsOpenModalLogin] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [isOpenConsultRequest, setIsOpenConsultRequest] =
    useState<boolean>(false)

  const accessToken = getToken()
  const userInfo = getUserInfo()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const userItems: MenuProps['items'] = [
    {
      label: 'Quản lý tài khoản',
      key: 'accountInfo',
      onClick: () => {
        navigate('/account-info')
      },
    },
    {
      label: 'Đăng xuất',
      key: 'logout',
      onClick: () => {
        LogoutAccount()
        navigate('/')
      },
    },
  ]

  const items = useMemo(() => {
    return [
      getItem(
        'Sản phẩm',
        'sub1',
        <img className="header-submenu-icon" src={ArrowDown} alt="down" />,
        {},
        [
          getItem('Thẻ tín dụng', 'sub2', null, {}, [
            getItem('Option 1', '7'),
            getItem('Option 2', '8'),
          ]),
          getItem('Vay', 'sub3', null, {}, [
            getItem('MSB Mastercard mDigi', '9'),
            getItem('MSB Mastercard Super Free', '10'),
            getItem('MSB Visa Online', '11'),
            getItem('MSB Visa Travel', '12'),
            getItem('MSB Visa Signature', '13'),
          ]),
          getItem('Bảo hiểm', '5'),
        ]
      ),
      getItem(
        'So sánh',
        'sub4',
        <img className="header-submenu-icon" src={ArrowDown} alt="down" />,
        {},
        [getItem('Option 3', '3'), getItem('Option 4', '4')]
      ),
      getItem('Câu hỏi thường gặp', 'faq'),
      getItem('Đăng nhập', 'login', null, {
        display: accessToken ? 'none' : 'inline-block',
      }),
      getItem('1900 6083', 'tel', <img src={Phone} alt="phone" />),
    ]
  }, [accessToken])

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'login') {
      setIsOpenModalLogin(true)
    }
  }
  const onHandleLogin = async (values: LoginRequest) => {
    setConfirmLoading(true)
    try {
      const result: LoginResponse | any = await LoginAccount(values)
      messageApi.open({
        type: 'success',
        content: 'Đăng nhập thành công',
      })
      const userResponeInfo = { ...result }
      delete userResponeInfo.token
      localStorage.setItem('ACCESS_TOKEN', result.token)
      localStorage.setItem('USER', JSON.stringify(userResponeInfo))
      navigate('/account-info')
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Tài khoản hoặc mật khẩu không đúng',
      })
    } finally {
      setConfirmLoading(false)
      setIsOpenModalLogin(false)
    }
  }

  const onClickConsultantRequest = () => {
    setIsOpenConsultRequest(true)
  }

  return (
    <>
      {contextHolder}
      <header>
        <div className="header-content">
          <img
            src={MSBLogo}
            alt="Frame1"
            className="msb-logo"
            onClick={() => navigate('/')}
          />
          <div className="navigation-menu">
            <Menu
              onClick={onClick}
              mode="horizontal"
              items={items}
              disabledOverflow={true}
            />
            <div className="consult-request-header" onClick={onClickConsultantRequest}>
              Yêu cầu tư vấn
            </div>
            {accessToken && (
              <>
                <div className="user-border" />
                <Dropdown menu={{ items: userItems }} className="user-dropdown">
                  <div className="user">
                    <div className="user-avatar">
                      <Avatar size={32} src={userInfo.image} />
                    </div>
                    <div className="user-name">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
                    <img className="mt-3" src={ArrowDown} alt="down" />
                  </div>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </header>
      {isOpenModalLogin && (
        <Login
          isOpen={isOpenModalLogin}
          confirmLoading={confirmLoading}
          setIsOpen={setIsOpenModalLogin}
          onLogin={onHandleLogin}
        />
      )}
      {isOpenConsultRequest && (
        <ConsultRequest
          isOpen={isOpenConsultRequest}
          setIsOpen={setIsOpenConsultRequest}
        />
      )}
    </>
  )
}
