import React, { useCallback, useState, useMemo, useEffect } from "react";
import Navermap from "./component/Navermap";
import KakaoMap from "./component/KakaoMap";
import axios from "axios";

const App = () => {
    const [test, setTest] = useState("");

    return (
        <div>
            <div>header</div>
            <main style={{ display: "flex", height: "840px" }}>
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
