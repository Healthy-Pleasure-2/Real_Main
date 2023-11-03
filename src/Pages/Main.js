import React, { useState, useEffect } from "react";
import "./styles/main.css";
import PopularRank from "../components/Community/PopularRank";
import getGroupData from "../components/Community/getGroupData";
// 배너
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// 이미지
import notice from "../asset/notice.png";
import FAQ from "../asset/FAQ.png";
import { Link } from "react-router-dom";

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
    autoplaySpeed: 4000,
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
              <h3>Everyday! WE RUN!</h3>
              <h1>Healthy Pleasure</h1>
              <p>건강한 삶을 향한 즐거운 여정, 헬시플레저와 함께!</p>
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
              <h3>목표 달성을 위한 커뮤니티</h3>
              <h1>Healthy Pleasure</h1>
              <p>성취감의 즐거움으로 더 건강하게! 헬시플레저와 함께!</p>
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
              <p>건강한 습관을 즐거운 습관으로 바꾸는 곳, 헬시플레저!</p>
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
              <h3>나만의 건강관리를 공유해보세요</h3>
              <h1>Healthy Pleasure</h1>
              <p>크루들과 함께하는 더욱 즐거운 건강습관 헬씨플레져!</p>
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
              인기 그룹 TOP <span>3</span>
            </h3>
            <p>크루가 많은 상위 커뮤니티</p>
            <p>지금 참가해 보세요.</p>
            <div className="bt2">
              <Link to="/community" className="MianLink">
                <button>More</button>
              </Link>
            </div>
          </div>
        </div>
        <PopularRank groupData={groupData} />
      </div>

      <div className="etc">
        <Link to="/notice1" className="Notice">
          <div className="etc_content">
            <h3>NOTICE</h3>
            <p>다양한 소식, 뉴스, 이벤트등을 확인 할 수 있습니다.</p>
          </div>
          <div className="etc_icon1">
            <img src={notice} alt="공지사항" />
          </div>
        </Link>

        <Link to="/faq" className="Question">
          <div className="etc_content">
            <h3>FAQ</h3>
            <p>궁금한 사항이 있다면 자주 묻는 질문을 확인해 보세요.</p>
          </div>
          <div className="etc_icon2">
            <img src={FAQ} alt="자주묻는질문" />
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Main;
