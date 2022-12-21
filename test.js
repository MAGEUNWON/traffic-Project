let node = [
    {
        x: 127.3851102,
        y: 36.3467019,
    },
    {
        x: 127.38599,
        y: 36.3466674,
    },
    {
        x: 127.3874491,
        y: 36.3466846,
    },
    {
        x: 127.3860222,
        y: 36.3463044,
    },
    {
        x: 127.3874384,
        y: 36.3462785,
    },
    {
        x: 127.385121,
        y: 36.3459588,
    },
    {
        x: 127.3860007,
        y: 36.3459588,
    },
    {
        x: 127.3874491,
        y: 36.3459501,
    },
    {
        x: 127.3851532,
        y: 36.3450427,
    },
    {
        x: 127.3859685,
        y: 36.3450168,
    },
    {
        x: 127.3851424,
        y: 36.3441699,
    },
    {
        x: 127.3859793,
        y: 36.3441613,
    },
    {
        x: 127.3859685,
        y: 36.3436601,
    },
    {
        x: 127.3873955,
        y: 36.343323,
    },
    {
        x: 127.3850995,
        y: 36.3431675,
    },
    {
        x: 127.3857969,
        y: 36.3430551,
    },
    {
        x: 127.3871916,
        y: 36.3426922,
    },
]; // node 데이터
let link = [
    [0, 1],
    [0, 5],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 4],
    [3, 6],
    [4, 7],
    [5, 6],
    [5, 8],
    [6, 7],
    [6, 9],
    [7, 13],
    [8, 9],
    [8, 10],
    [9, 11],
    [10, 11],
    [10, 14],
    [11, 12],
    [12, 13],
    [12, 15],
    [13, 16],
    [14, 15],
    [15, 16],
]; // link 데이터
function test(obj1, obj2) {
    let 위도_차이 = obj1["y"] - obj2["y"];
    let 경도_차이 = obj1["x"] - obj2["x"];
    // console.log("위도 차이 : " + 위도_차이);
    // console.log("경도 차이 : " + 경도_차이);
    let 위도 = (obj1["y"] + obj2["y"]) / 2;
    let 위도반지름 = Math.cos((Math.PI * 위도) / 180) * 6400;
    let 위도둘레 = 위도반지름 * 2 * Math.PI;
    //? 위도마다 경도 1도당 거리가 달라지기때문에 따로 위도반지름을 설정함.
    let 위도_거리 = (위도_차이 * 40000) / 360;
    let 경도_거리 = (경도_차이 * 위도둘레) / 360;
    //? 전체 360도중 위도 차이만큼의 거리를 계산해야하니 * 차이 / 360
    let 거리 = Math.sqrt(위도_거리 ** 2 + 경도_거리 ** 2);
    //? 대각선길이(전체 거리) = 루트(가로**2 + 세로**2)
    // console.log(`거리 : ${거리.toFixed(2)}km`);
    return Number((거리 * 1000).toFixed(0));
} // 거리 계산 함수
const data = link.map((item) => {
    let newItem = {
        start: item[0],
        end: item[1],
        length: test(node[item[0]], node[item[1]]),
    };
    return newItem;
});
const navi = (start, end) => {
    const route = [];
    //경로 데이터를 집어넣을 배열 생성.
    function find(start, end) {
        const nodeArr = [];
        //근접 노드를 집어넣을 배열 생성.
        link.map((item, index) => {
            if (item.includes(start)) {
                let link = data[index];
                let obj = {
                    length: link.length,
                };
                if (link.start === start) {
                    obj.end = link.end;
                } else {
                    obj.end = link.start;
                }
                nodeArr.push(obj);
            }
        });
        // start 지점을 포함한 link들을 찾아서 nodeArr에 추가
        const endLength = nodeArr.map((item) => {
            return test(node[item.end], node[end]);
        });
        // nodeArr에 있는 노드들과 최종도착지의 직선거리를 배열로 생성
        let nearNode = nodeArr[endLength.indexOf(Math.min(...endLength))];
        route.push(nearNode);
        // endLength에서 가장 작은 거리를 추출해서 그 node를 nearNode로 등록 후 route에 넣기.
        if (nearNode.end === end) {
            console.log(route);
            let length = 0;
            route.map((item) => {
                length += item.length;
            });
            console.log(`이동거리 : ${length}m`);
            // 만약 nearNode가 최종도착지라면 경로와 거리 반환.
        } else {
            find(nearNode.end, end);
            // 아니라면 한칸 이동한곳을 start로 지정 후 다시 함수 시작.
        }
    }
    find(start, end);
};
navi(3, 10);
