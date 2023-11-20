import { Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { GetMockProducts } from '../services/ProductsService'
import RightArrow from '../assests/images/right-arrows.png'
import { Product } from '../types'

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    try {
      GetMockProducts().then((data: Product[]) => setProducts(data))
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="products">
      <div className="products-list">Danh sách sản phẩm</div>
      <Row gutter={[24, 40]}>
        {products.splice(0, 6).map((product: Product, index: number) => (
          <Col className="gutter-row" span={8} key={index}>
            <Card
              className="products-card"
              hoverable
              cover={<img alt="productImage" src={product.image} />}
            >
              <div className="product-title">{product.title}</div>
              <div className="product-content">{product.content}</div>
              <div className="product-detail">
                <div className="product-detail-text">Khám phá ngay</div>
                <img
                  className="product-detail-button"
                  alt="productImage"
                  src={RightArrow}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
