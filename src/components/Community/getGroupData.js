const getGroupData = async () => {
  const remoteUrl = "http://localhost:3003/group"; // 원격 서버 엔드포인트 URL

  try {
    const response = await fetch(remoteUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // JSON 데이터를 변수에 저장
    return data; // 데이터를 반환
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // 에러를 다시 throw하여 호출자에게 전파
  }
};

export default getGroupData;
