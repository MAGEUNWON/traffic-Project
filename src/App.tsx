import React from "react";
import Navermap from "./component/Navermap";
import KakaoMap from "./component/KakaoMap";

const App = () => {
    return (
        <div>
            <KakaoMap />
            {/* <button>클릭시 CCTV 정보</button>
            <video width="352" height="198" controls>
                <source src="playlist.m3u8" type="application/x-mpegURL" />
            </video> */}
        </div>
    );
};

export default App;
