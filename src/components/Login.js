import React, {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../logo.png";

function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            // 사용자가 입력한 ID와 비밀번호
            const userData = {
                id: username,
                pw: password
            };

            // 서버에 POST 요청
            fetch("http://localhost:3003/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "로그인 성공") {
                        //성공 시
                        onLogin(data.user); // 로그인 상태 변경
                    } else {
                        //실패 시
                        alert("로그인 실패");
                    }
                })
                .catch((error) => {
                    console.error("서버 요청 오류:", error);
                });
        } catch (error) {
            console.error("로그인 요청 실패:", error);
            alert("로그인 요청 실패"); // 실패 메시지 표시
        }
    };

    return (
        <div id="daily-box">
            <div className="Loginbox">
                <div className="LoginLogo">
                    <img src={logo} alt="logo"></img>
                </div>
                <div className="LoginIdPw">
                    <input
                        className="Logininputid"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="사용자명"/>
                    <input
                        className="Logininputpassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"/>
                </div>
                <button className="Loginbtn" onClick={handleLogin}>
                    로그인
                </button>
                <div className="LoginFind">
                    <button className="LoginIdPwFind">
                        <Link to="/idpw" className="LoginbtnLink">
                            ID 찾기 / PW 찾기
                        </Link>
                    </button>
                    <button className="Loginsingnup">
                        <Link to="/signup" className="LoginbtnLink">
                            회원가입
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
