import { getUserInfo } from '../utils/common'

export const AccountInfo = () => {
  const userInfo = getUserInfo()

  return (
    <div className="account-info-container">
      <div className="account-info-title">Thông tin chung</div>
      <div className="account-info-content">
        <div className="flex">
          <div className="w-120 mr-16 info-key">Họ và tên</div>
          <div className="info-value">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
        </div>
        <div className="flex mt-16 mb-16">
          <div className="w-120 mr-16 info-key">Số CMND/CCCD</div>
          <div className="info-value">0123456789</div>
        </div>
        <div className="flex">
          <div className="w-120 mr-16 info-key">Số điện thoại</div>
          <div className="info-value">0987654321</div>
        </div>
      </div>
    </div>
  )
}
