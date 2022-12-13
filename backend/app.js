const express = require("express");
const axios = require("axios");
const app = express("");

app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
    });

    next();
});

app.get("/test", (req, res) => {
    const { type } = req.query;

    console.log(type);

    if (type === "1") {
        console.log("요기");
        res.json({
            test: [1231, 123123, 123123, 123123, 123, 1231, 23123123],
        });
    } else {
        res.json({ test: [555, 555, 555, 555, 55, 555] });
    }
});

app.get("/cctv", async (req, res) => {
    axios.get(
        "https://openapi.its.go.kr:9443/cctvInfo?apiKey=185891a7bc29448b861eb0ff3a718c0d&type=ex&cctvType=1&minX=127.100000&maxX=128.890000&minY=34.100000&maxY=39.100000&getType=json"
    );
    res.send("Test");
});

app.listen(8000, () => {
    console.log("서버 8000");
});
