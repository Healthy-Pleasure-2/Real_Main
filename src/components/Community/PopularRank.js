import React, { useState, useEffect, useMemo } from "react";
import "../../Pages/styles/Community.css";

function PopularRank() {
  const initialGroups = useMemo(() => [1, 2, 3, 4, 5], []); // 초기 그룹 목록
  const [groups, setGroups] = useState(initialGroups);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 화면 가로 폭이 변경될 때 업데이트
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // 그룹을 동적으로 조절
    const newGroupsCount = Math.floor(windowWidth / 350);
    const newGroups = initialGroups.slice(0, newGroupsCount);
    setGroups(newGroups);
  }, [windowWidth, initialGroups]);

  return (
    <div className="popularRank">
      {groups.map((group) => (
        <div className="Rgroup" key={group}>
          <div className="item">
            <img
              className="cardimg"
              src="https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg"
              alt="그룹 "
            />
            <div className="cardcontent">
              <h1 className="Groupname">차 1한잔의 여유</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default PopularRank;
