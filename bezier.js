let obj = document.getElementById("obj");
// 두 조절점을 잇는 선분을 그린다. 선 분의 시작점에서 t 떨어진 곳에 새로운 점을 찍는다.
let t = 0;
// t 값 증가량 
let t_incrase = 0.002;

// 조절점 


// let parent = document.getElementById("mainBlock2");
// let p1 = document.getElementById("p1")
// p1.style.left = 0 + "px";
// p1.style.bottom = 500 + "px";
// let p2 = document.getElementById("p2")
// p2.style.left = 500 + "px";
// p2.style.bottom = 330 + "px";
// let p3 = document.getElementById("p3")
// p3.style.left = 0 + "px";
// p3.style.bottom = 0 + "px";
// let p4 = document.getElementById("p4")
// p4.style.left = 370 + "px";
// p4.style.bottom = 0 + "px";

let parent = document.getElementById("mainBlock2");
let p1 = document.getElementById("p1")
p1.style.left = 0 + "px";
p1.style.bottom = parent.offsetHeight + "px";
let p2 = document.getElementById("p2")
p2.style.left = 1100 + "px";
p2.style.bottom = (parent.offsetHeight / 3 * 2) + "px";
let p3 = document.getElementById("p3")
p3.style.left = 0 + "px";
p3.style.bottom = (parent.offsetHeight / 3) + "px";
let p4 = document.getElementById("p4")
p4.style.left = 700 + "px";
p4.style.bottom = 0 + "px";

moveElement();


// obj 가 베지어 곡선을 그리며 이동하도록 한다 
function moveElement() {
    if (t > 1) {
        t = 0;
        // return;
    }

    let points = [
        [p1.style.left, p1.style.bottom],
        [p2.style.left, p2.style.bottom],
        [p3.style.left, p3.style.bottom],
        [p4.style.left, p4.style.bottom]
    ];

    let newPoints = dfs(points, t);
    // console.log("newPoints = " + newPoints);
    obj.style.left = newPoints[0];
    obj.style.bottom = newPoints[1];
    t += t_incrase;
    requestAnimationFrame(moveElement); // Move element recursively
}


// n개의 점을 이어 n-1개의 선분 만들고 
// 각 선분의 t값에 비례하는 곳에 점을 찍는다 
// 즉 재귀함수 한번 호출마다 점의 갯수는 1씩 줄어들고 점의 갯수가 1이되면 
// 그 점의 위치가 다음 위치가 된다  
function dfs(points, t) {
    if (points.length == 1) {
        return points[0];
    }

    newPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        newPoints.push(GetPos(points[i], points[i + 1], t));
    }

    return dfs(newPoints, t);
}

function GetPos(p1, p2, m) {
    n = 1 - m;

    x = (m * parseFloat(p2[0]) + n * parseFloat(p1[0])) / (m + n);
    y = (m * parseFloat(p2[1]) + n * parseFloat(p1[1])) / (m + n);

    return [x + "px", y + "px"];
}