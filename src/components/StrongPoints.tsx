import DocumentFile from '../assests/images/document-file.png'
import DocumentCheck from '../assests/images/document-check.png'
import DocumentReplace from '../assests/images/document-replace.png'

export function StrongPoints() {
  return (
    <div className='strong-points'>
      <div className='reason'>Vì sao nên<br />chọn chúng tôi</div>
      <div className='strong-point'>
        <img src={DocumentFile} alt="DocumentFile" />
        <div className='sp-content'>100% online</div>
        <div className='sp-detail'>Đăng ký và nộp hồ sơ trực tuyến</div>
      </div>
      <div className='strong-point'>
        <img src={DocumentCheck} alt="DocumentFile" />
        <div className='sp-content'>Phê duyệt siêu tốc</div>
        <div className='sp-detail'>Duyệt hồ sơ nhanh trong 5 phút</div>
      </div>
      <div className='strong-point'>
        <img src={DocumentReplace} alt="DocumentFile" />
        <div className='sp-content'>Sử dụng linh hoạt</div>
        <div className='sp-detail'>Dễ dàng chuyển đổi linh hoạt giữa các sản phẩm</div>
      </div>
    </div>
  )
}
