/*소스명 : getGroupData.js
작성자 : 정은정
이 페이지 용도 : 그룹 커뮤니티
생성일자(수정일자) : 10/16*/

const request = async (url) => {
  try {
    const respose = await fetch(url);
    if (respose.ok) {
      const data = await respose.json();
      return data.group;
    }
    const errData = await respose.json();
    throw errData;
  } catch (e) {
    console.log(e);
  }
};

// 비동기식으로 데이터를 가져오는 함수(함수앞에 async를 붙여주고 내부에서 await를 사용해야함)
// fetch API를 사용하여 데이터를 가져옴

const getGroupData = async () => {
  const result = await request("/group.json");
  return result;
};

export default getGroupData;
