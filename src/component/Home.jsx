import { Link } from "react-router-dom";
import SliderComponent from "react-slick";
import Feature from "./Feature";
// import Homepage from "./Homepage/Homepage";

import Near from "./Near";
import Banner from "./Banner";
import Stats from "./Stats";
import Footer from "./Footer";

const Slider = SliderComponent.default || SliderComponent;

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // bật mũi tên
    cssEase: "ease-in-out",
  };
  const slides = [
    "./listhouse.jpg",
    "./listhouse1.jpg",
    "./listhouse2.jpg",
    "./listhouse3.jpg",
    "./listhouse4.jpg",
    "./listhouse7.jpg",
    "./listhouse8.jpg",
  ];

  return (
    <>
      {/* SLIDER */}
      <section>
        <div className="hero-wrapper">
          {/* SLIDER CHỈ CHẠY ẢNH */}
          <Slider {...settings} className="hero-slider">
            {slides.map((img, index) => (
              <div key={index}>
                <div
                  className="hero-bg"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
            ))}
          </Slider>

          {/* OVERLAY */}
          <div className="overlay" />

          {/* CONTENT CỐ ĐỊNH */}
          <div className="hero-content">
            <h1>
              FIND YOUR <br /> LUXURY DREAM HOME
            </h1>
            <button className="cta">Browse Properties</button>
          </div>

          {/* SEARCH CỐ ĐỊNH */}
        </div>
      </section>

      <Feature />
      <Stats />
      {/* <Homepage /> */}
      <Near />

      <Banner />
      {/* <Admin /> */}
    </>
  );
}
