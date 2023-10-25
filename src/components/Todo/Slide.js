import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const StyledSlider = styled(Slider)`
  border: 1px solid #386641;
  border-radius: 15px;
  padding: 15px;
  height: 85%;
  width: 85%;
  margin: 0 auto;
  background-color: #fff;
  // box-shadow: 3px 3px 7px rgb(131, 131, 131);
`;

function SimpleSlider() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // 데이터를 비동기적으로 가져옵니다.
    axios
      .get("/group.json")
      .then((result) => {
        // 데이터가 정상적으로 로드됨
        setData(result.data.group);
      })
      .catch((error) => {
        console.error("데이터를 가져오지 못함", error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (currentSlide) => {
      // 슬라이드가 변경될 때 페이지 번호 업데이트
      setCurrentPage(currentSlide + 1);
    },
  };

  // 데이터를 로드하고 있다면, 데이터가 로드될 때까지 대기
  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  // 데이터가 있는 경우 데이터를 매핑하여 렌더링
  return (
    <div className="todo_slider_container">
      <StyledSlider {...settings}>
        {data.map((item, index) => (
          <div className="todo_group_content" key={index}>
            <div className="todo_group_content1">
              <img className="todo_group_data" src={item.img} />
            </div>

            <div className="todo_group_content2">
              <p className="todo_group_data_name">{item.name}</p>
              <p className="todo_group_data_goal">{item.goal}</p>
              <button>댓글달기</button>
            </div>
          </div>
        ))}
      </StyledSlider>
      <p className="todo_page_count">
        {currentPage}/{data.length}
      </p>
    </div>
  );
}

export default SimpleSlider;

const NextArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className="todo_nextbtn">
      〉
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className="todo_prevbtn">
      〈
    </button>
  );
};
