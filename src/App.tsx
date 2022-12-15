import React from "react";
import Navermap from "./component/Navermap";
import KakaoMap from "./component/KakaoMap";

const App = () => {
    return (
        <div>
            <div>header</div>
            <main style={{ display: "flex", height: "840px" }}>
                <div>
                    <div>
                        <input />
                    </div>

                    <div>
                        <input />
                    </div>
                    <div>body</div>
                </div>

                <KakaoMap />
            </main>

            <div>밑에내용</div>

            {/* <button>클릭시 CCTV 정보</button>
            <video width="352" height="198" controls>
                <source src="playlist.m3u8" type="application/x-mpegURL" />
            </video> */}
        </div>
    );
};

export default App;
