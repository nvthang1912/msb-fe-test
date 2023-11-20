import { Modal, Form, Input } from 'antd'
import { LoginRequest } from '../types/User'

interface ILoginProps {
  isOpen: boolean
  confirmLoading: boolean
  setIsOpen: (data: boolean) => void
  onLogin: (data: LoginRequest) => void
}

export function Login({ isOpen, confirmLoading, setIsOpen, onLogin }: ILoginProps) {
  const [form] = Form.useForm()

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onLogin(values)
      })
      .catch(() => {})
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Modal
        title="Đăng nhập"
        className="modal-login"
        open={isOpen}
        centered
        width={343}
        maskClosable={false}
        closeIcon={null}
        confirmLoading={confirmLoading}
        cancelButtonProps={{ style: { width: '48%', marginRight: '2%' } }}
        okButtonProps={{ style: { width: '48%', marginLeft: '2%' } }}
        okText="Đăng nhập"
        cancelText="Đóng"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="login"
          layout="vertical"
          initialValues={{
            username: '',
            password: '',
          }}
          autoComplete="off"
        >
          <Form.Item<LoginRequest>
            label="Tên tài khoản"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên tài khoản!' },
            ]}
            style={{ marginBottom: 15 }}
          >
            <Input
              placeholder="Nhập tên tài khoản"
              style={{ fontSize: '16px' }}
            />
          </Form.Item>

          <Form.Item<LoginRequest>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              style={{ fontSize: '16px' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
