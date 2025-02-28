import Carousel from 'react-bootstrap/Carousel';
import coverImg from "@/assets/cover_image.png";
function CarouselCard() {
  return (
    <Carousel style={{ width: "100%", height: "350px" }}>
      <Carousel.Item>
        <img src={coverImg} height={"350px"} />

      </Carousel.Item>
      <Carousel.Item>
        <img src={coverImg} height={"350px"} />

      </Carousel.Item>
      <Carousel.Item>
        <img src={coverImg} height={"350px"} />

      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCard;