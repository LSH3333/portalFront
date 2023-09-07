
let parent = document.getElementById("mainBlock2");

// 이동 오브젝트들 
let obj = document.getElementById("obj");
let imgObj = document.getElementById("imgObj");
// 최초 투명하도록 설정하고 무빙 시작시 1로 변경 
imgObj.style.opacity = 0; 

let obj2 = document.getElementById("obj2");
let imgObj2 = document.getElementById("imgObj2");
imgObj2.style.opacity = 0;

let obj3 = document.getElementById("obj3");
let imgObj3 = document.getElementById("imgObj3");
imgObj3.style.opacity = 0;

let obj4 = document.getElementById("obj4");
let imgObj4 = document.getElementById("imgObj4");
imgObj4.style.opacity = 0;

// 두 조절점을 잇는 선분을 그린다. 선 분의 시작점에서 t 떨어진 곳에 새로운 점을 찍는다.
// t 값 증가량 
let t_incrase = 0.002;

// 4개 조절점 사용 
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


StartMoving();

function StartMoving() {
    let timeout = 170;

    let t = 0;
    imgObj.style.opacity = 1;
    moveElement(obj, imgObj, t);

    setTimeout(function() {
        let t2 = 0;
        imgObj2.style.opacity = 1;
        moveElement(obj2, imgObj2, t2);
    }, 1 * timeout); 

    setTimeout(function() {
        let t3 = 0;
        imgObj3.style.opacity = 1;
        moveElement(obj3, imgObj3, t3);
    }, 2 * timeout); 

    setTimeout(function() {
        let t4 = 0;
        imgObj4.style.opacity = 1;
        moveElement(obj4, imgObj4, t4);
    }, 3 * timeout); 
}



// obj 가 베지어 곡선을 그리며 이동하도록 한다 
function moveElement(obj, imgObj, t) {
    if (t > 1) {
        // t 값 초기화해서 반복하도록함
        t = 0;
    }

    let points = [
        [p1.style.left, p1.style.bottom],
        [p2.style.left, p2.style.bottom],
        [p3.style.left, p3.style.bottom],
        [p4.style.left, p4.style.bottom]
    ];

    let newPoints = dfs(points, t);
    Rotate(obj, imgObj, newPoints[0], newPoints[1])
    obj.style.left = newPoints[0];
    obj.style.bottom = newPoints[1];
    t += t_incrase;

    requestAnimationFrame(function() {
        moveElement(obj, imgObj, t); // Move element recursively
    });
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

function Rotate(obj, imgObj, nextX, nextY) {
    let p1x = parseFloat(obj.style.left), p1y = parseFloat(obj.style.bottom);
    let p2x = parseFloat(nextX), p2y = parseFloat(nextY);

    // angle in radians
    var angleRadians = Math.atan2(p2y - p1y, p2x - p1x);

    // angle in degrees
    var angleDeg = Math.atan2(p2y - p1y, p2x - p1x) * 180 / Math.PI;
    angleDeg = 90 - angleDeg;
    
    // Apply the rotation to the arrow  
    imgObj.style.transform = 'rotate(' + angleDeg + 'deg)';
}