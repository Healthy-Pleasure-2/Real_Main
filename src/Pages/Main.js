/* 
-소스명 : main.js
-작성자 : 김장훈
-이 페이지 용도 : 메인페이지
-생성일자(수정일자) : 231016
--------------------------------------------------------------------------------------------------------------
-로그
231016 김장훈 - 최초작성
231020 이진경 - 수정
231027 이진경 - 캐러셀 추가
*/

import React, { useState, useEffect } from "react";
import "./styles/main.css";
import PopularRank from "../components/Community/PopularRank";
import getGroupData from "../components/Community/getGroupData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faComments } from "@fortawesome/free-solid-svg-icons";
// 배너
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Main() {
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      const result = await getGroupData();
      setGroupData(result);
    };
    fetchGroupData();
  }, []);

  // 캐러셀 세팅값
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrow: false,
  };

  return (
    <div className="main">
      {/* 메인 배너 */}
      <Slider {...settings} dotsClass="test-css">
        <div className="banner">
          <div className="banner_inner">
            <div className="banner_image"></div>
            <div className="banner_title">
              <h3>목표 달성을 위한 커뮤니티</h3>
              <h1>Healthy Pleasure</h1>
              <p>커뮤니티를 통해 크루들과 함께하는 즐겁고 지속적인 건강관리</p>
              <div className="bt1">
                <button>Show Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="banner2">
          <div className="banner_inner">
            <div className="banner_image"></div>
            <div className="banner_title">
              <h3>나만의 건강관리를 공유해보세요</h3>
              <h1>Healthy Pleasure</h1>
              <p>커뮤니티를 통해 크루들과 함께하는 즐겁고 지속적인 건강관리</p>
              <div className="bt1">
                <button>Show Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="banner3">
          <div className="banner_inner">
            <div className="banner_image"></div>
            <div className="banner_title">
              <h3>오늘도 다함께 GO! GO!</h3>
              <h1>Healthy Pleasure</h1>
              <p>커뮤니티를 통해 크루들과 함께하는 즐겁고 지속적인 건강관리</p>
              <div className="bt1">
                <button>Show Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="banner4">
          <div className="banner_inner">
            <div className="banner_image"></div>
            <div className="banner_title">
              <h3>Everyday! WE RUN!</h3>
              <h1>Healthy Pleasure</h1>
              <p>커뮤니티를 통해 크루들과 함께하는 즐겁고 지속적인 건강관리</p>
              <div className="bt1">
                <button>Show Now</button>
              </div>
            </div>
          </div>
        </div>
      </Slider>

      <div className="rank">
        <div className="title">
          <div className="title_inner">
            <h3>
              TOP <span>3</span>
            </h3>
            <p>크루가 많은 상위 커뮤니티</p>
            <p>지금 참가해 보세요.</p>
            <div className="bt2">
              <button>More</button>
            </div>
          </div>
        </div>
        <PopularRank groupData={groupData} />
      </div>

      <div className="etc">
        <div className="Notice">
          <div className="etc_content">
            <h3>NOTICE</h3>
            <p>다양한 소식, 뉴스, 이벤트등을 볼 수 있습니다.</p>
          </div>
          <div className="etc_icon1">
            {/* <FontAwesomeIcon icon={faBullhorn} /> */}
          </div>
        </div>

        <div className="Question">
          <div className="etc_content">
            <h3>FAQ</h3>
            <p>다양한 소식, 뉴스, 이벤트등을 볼 수 있습니다.</p>
          </div>
          <div className="etc_icon2">
            {/* <FontAwesomeIcon icon={faComments} />{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
