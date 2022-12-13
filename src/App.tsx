import React from "react";
import Map from "./component/map";

const App = () => {
    return (
        <div>
            <Map />x<button>클릭시 CCTV 정보</button>
            <video width="352" height="198" controls>
                <source src="playlist.m3u8" type="application/x-mpegURL" />
            </video>
        </div>
    );
};

export default App;
