import { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Drawer,
  Space,
  Row,
  Col,
  Select,
  Radio,
  Checkbox,
} from 'antd'
import Close from '../assests/images/close.png'
import TextArea from 'antd/es/input/TextArea'
import { GetCityList, GetDistrictList } from '../services/CityService'
import { City, District } from '../types'

interface IConsultRequestProps {
  isOpen: boolean
  setIsOpen: (data: boolean) => void
}

const { Option } = Select

export function ConsultRequest({ isOpen, setIsOpen }: IConsultRequestProps) {
  const [selectedCityCode, setSelectedCityCode] = useState<number>()
  const [listCity, setListCity] = useState<City[]>([])
  const [listDistrict, setListDistrict] = useState<District[]>([])
  const [form] = Form.useForm()

  const onClose = () => {
    setIsOpen(false)
  }

  const submit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
      })
      .catch(() => { })
  }

  const validateName = () => {
    const nameValue = form.getFieldValue('name') || ''
    const name = nameValue.split(' ')

    if (name.length === 1 && name[0] === '') return Promise.resolve()

    if (name.length > 1) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }

  const fetchCityList = async () => {
    const cityList = await GetCityList()
    setListCity(cityList)
  }

  const fetchDistrictList = async (city: string) => {
    const data: City = await GetDistrictList(city)
    setListDistrict(data.districts)
  }

  const handleChangeSelect = (value: number) => {
    setSelectedCityCode(value)
  } 

  useEffect(() => {
    fetchCityList()
  }, [])

  useEffect(() => {
    if (selectedCityCode) fetchDistrictList(selectedCityCode.toString())
  }, [selectedCityCode])

  return (
    <Drawer
      className="consult-request"
      title="Yêu cầu tư vấn"
      width={500}
      onClose={onClose}
      closable={false}
      open={isOpen}
      extra={
        <Space>
          <img
            className="product-detail-button"
            alt=""
            src={Close}
            onClick={onClose}
          />
        </Space>
      }
    >
      <Form name="consult-form" form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <div className="input-label">Thông tin khách hàng</div>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Vui lòng nhập họ tên' },
                {
                  validator: validateName,
                  message:
                    'Vui lòng nhập họ và tên đầy đủ, có dấu cách ở giữa và chỉ chứa dấu nháy đơn.',
                },
              ]}
            >
              <Input type="text" placeholder="Nhập họ và tên" maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please select an owner' }]}
            >
              <Select placeholder="Chọn thành phố" onChange={handleChangeSelect}>
                {listCity.map((city: City, index: number) => <Option value={city.code} key={index}>{city.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="district"
              rules={[{ required: true, message: 'Please choose the type' }]}
            >
              <Select placeholder="Chọn quận huyện">
              {listDistrict.map((district: District, index: number) => <Option value={district.code} key={index}>{district.name}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <div className="radio-label">Giới tính</div>
            <Form.Item
              name="sex"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
            >
              <Radio.Group>
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="input-label">Sản phẩm cần tư vấn</div>
            <Form.Item
              name="product"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn sản phẩm cần tư vấn',
                },
              ]}
            >
              <Checkbox.Group style={{ width: '100%', height: '100px' }}>
                <Row>
                  <Col span={12}>
                    <Checkbox value="A">Thẻ tín dụng</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="B">Mua trước trả sau</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="C">Vay Linh hoạt</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="D">Tài khoản</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="E">Tiền nhanh</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="info"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn sản phẩm cần tư vấn',
                },
              ]}
            >
              <TextArea placeholder="Nhập thông tin" rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <div className="submit-button" onClick={submit}>
          Xác nhận
        </div>
      </Form>
    </Drawer>
  )
}
