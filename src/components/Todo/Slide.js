import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

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

function SimpleSlider({ sessiondata }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (sessiondata === false) {
      axios
        .get("/group.json")
        .then((result) => {
          // 데이터가 정상적으로 로드됨
          setData(result.data.group);
        })
        .catch((error) => {
          console.error("데이터를 가져오지 못함", error);
        });
    } else {
      const userid = sessiondata;
      // 데이터 가져오는 방식: 비동기
      axios
        .get(`http://localhost:3003/mygroup/${userid}`)
        .then((response) => {
          const responseData = response.data;
          setData(responseData);
        })
        .catch((error) => {
          console.error("데이터를 가져오지 못함", error);
        });
    }
  }, [sessiondata]);

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
    return <p className="slide_nodataGroup">참여 그룹이 없습니다.</p>;
  }
  // 목표 달성 클릭시 초록색으로 변경
  const handleItemClick = (GoalItem) => {
    setSelectedItem(GoalItem);
  };
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
              <Link to={`/GroupPage/${item.id}`}>
                <button className="goal_btn1">소통하기</button>
              </Link>
              <button
                className={selectedItem === "item" ? "selected" : ""}
                onClick={() => handleItemClick("item")}
              >
                목표달성
              </button>
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
