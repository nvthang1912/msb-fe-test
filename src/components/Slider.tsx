import { Carousel } from 'antd'
import { CarouselItem } from '../components'

export function Slider() {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }

  return (
    <div className="slider">
      <Carousel className="slider-image" afterChange={onChange}>
        <CarouselItem
          title={<>Trải nghiệm sống cực chất cho<br />dân văn phòng</>}
          content={<>Lương từ 8 triệu/tháng, nhận ngay tới<br />200 triệu VND</>}
          buttonTitle={<>Khám phá ngay</>}
        />
        <CarouselItem
          title={<>Trải nghiệm sống cực chất cho<br />dân văn phòng</>}
          content={<>Lương từ 8 triệu/tháng, nhận ngay tới<br />200 triệu VND</>}
          buttonTitle={<>Khám phá ngay</>}
        />
        <CarouselItem
          title={<>Trải nghiệm sống cực chất cho<br />dân văn phòng</>}
          content={<>Lương từ 8 triệu/tháng, nhận ngay tới<br />200 triệu VND</>}
          buttonTitle={<>Khám phá ngay</>}
        />
        <CarouselItem
          title={<>Trải nghiệm sống cực chất cho<br />dân văn phòng</>}
          content={<>Lương từ 8 triệu/tháng, nhận ngay tới<br />200 triệu VND</>}
          buttonTitle={<>Khám phá ngay</>}
        />
        <CarouselItem
          title={<>Trải nghiệm sống cực chất cho<br />dân văn phòng</>}
          content={<>Lương từ 8 triệu/tháng, nhận ngay tới<br />200 triệu VND</>}
          buttonTitle={<>Khám phá ngay</>}
        />
      </Carousel>
    </div>
  )
}
