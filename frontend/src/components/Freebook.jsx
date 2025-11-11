import React from "react";
import list from "../../public/list.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";

const Freebook = () => {
  const filterData = list.filter((data) => data.category === "Free");

  var settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <h1 className="font-semibold text-xl pb-2">Free Offecred Course</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.oluptate
          fugiat nulla, magni possimus dolore? Eum eaque laboriosam alias
          accusamus nam. Quod deleniti quibusdam inventore illum maxime
          aspernatur! Pariatur in molestiae quia repellenduss ea quae fugiat.
        </p>

        <div>
          <Slider {...settings}>
            {filterData.map((items) => (
              <Cards item={items} key={items.id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Freebook;
