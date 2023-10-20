import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import axios from "axios";

const StyledSlider = styled(Slider)`
  border: 1px solid #7B7B7B;
  border-radius:15px;
  padding:15px;
  height: 100%;
  width: 85%;
  posittion:absolute;
  left:50%;
  transform: translateX(-50%);
  background-color: #fff;box-shadow: 3px 3px 7px rgb(131, 131, 131)
  box-shadow: 3px 3px 7px rgb(131, 131, 131);
`;

export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // 데이터를 저장할 배열
    };
  }

  componentDidMount() {
    // 데이터를 비동기적으로 가져옵니다.
    axios
      .get("/group.json")
      .then((result) => {
        // 데이터가 정상적으로 로드됨
        this.setState({ data: result.data.group });
      })
      .catch((error) => {
        console.error("데이터를 가져오지 못함", error);
      });
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    // 데이터를 로드하고 있다면, 데이터가 로드될 때까지 대기
    if (this.state.data.length === 0) {
      return <p>Loading...</p>;
    }

    // 데이터가 있는 경우 데이터를 매핑하여 렌더링
    return (
      <div className="todo_slider_container">
        <StyledSlider {...settings}>
          {this.state.data.map((item, index) => {
            return (
              <>
                <div className="todo_group_content" key={index}>
                  <p className="todo_group_creteria">그룹명</p>
                  <p className="todo_group_data">{item.name}</p>
                  <p className="todo_group_creteria">카테고리</p>
                  <p className="todo_group_data">
                    {item.category}
                  </p>
                  <p className="todo_group_creteria">목표</p>
                  <p className="todo_group_data">{item.goal}</p>
                </div>
                <p className="todo_page_count">
                  {item.id}/{this.state.data.length}
                </p>
              </>
            );
          })}
        </StyledSlider>
      </div>
    );
  }
}
