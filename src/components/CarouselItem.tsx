interface ICarouselItemProps {
  title: React.ReactNode
  content: React.ReactNode
  buttonTitle: React.ReactNode
}

export function CarouselItem({ title, content, buttonTitle }: ICarouselItemProps) {
  return (
    <div className='slider-item'>
      <div className='sitem-title'>{title}</div>
      <div className='sitem-content'>{content}</div>
      <div className='sitem-button'>{buttonTitle}</div>
    </div>
  )
}
