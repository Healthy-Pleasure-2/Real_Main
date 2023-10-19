// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

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
    this.state.data = [];
  }

  componentDidMount() {
    // 데이터를 비동기적으로 가져옵니다.
    axios
      .get("/group.json")
      .then((result) => {
        this.setState(result.data);
      })
      .catch((error) => {
        console.error("데이터를 가져오지 못함", error);
      });
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    if (!this.state.data || !this.state.data.length) {
      // 데이터가 없거나 데이터의 길이가 0이면 없는 거니까 즉 불러오기 실패한 경우 소속된 그룹이 없다는 메세지 출력
      return <p>아직 소속된 그룹이 없습니다.</p>;
    }
    // 데이터가 있는 경우 데이터를 매핑하여 렌더링
    return (
      <div className="slider_container">
        {console.log(this.state)}
        <StyledSlider {...settings}>
          {this.state.map((item, index) => {
            return (
              <div className="group_content" key={index}>
                <div>{console.log(this.state)}</div>
                <p className="group_title group_neam">그룹명</p>
                <p className="group_data title_data">{item.name}</p>
                <p className="group_title group_category">카테고리</p>
                <p className="group_data category_data">{item.category}</p>
                <p className="group_title group_goal">목표</p>
                <p className="group_data goal_data">{item.goal}</p>
              </div>
            );
          })}
        </StyledSlider>
      </div>
    );
  }
}
