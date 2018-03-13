var imgNum=new Array();
var tileNum = new Array();
var tileElement, click = 0, best = 0, emptyTile = 0;
var sec = 60, time;

function getRandomNum(upperLimit, lowerLimit) {
    return Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
}

function generateImageNum(){
	var i=0,y;
	for(i=0;i<8;i++){
		y=getRandomNum(8,1);
		if (imgNum.length == 0) {
		    imgNum[i] = y;
		}
		else {
		    if (imgNum.indexOf(y)!=-1) {
		        i--;
		    }
		    else {
		        imgNum[i] = y;
		    }
		}
	}
	
}

function generateTileNum() {
    var i = 0, y,flag;
    for (i = 0; i < 16; i++) {
        y = getRandomNum(16, 1);
        if (tileNum.indexOf(y) == -1) {
            tileNum[i] = y;
        }
        else {
            y++;
            flag = true;
            while (flag) {
                if (y <= 16 && tileNum.indexOf(y)==-1) {
                    tileNum[i] = y;
                    flag = false;
                }
                else if (y > 16) {
                    y = 1;
                }
                else {
                    y++;
                }
            }
        }
    }
}


function renderImage() {
    var i=0,j=0,p=0,img=1;
    for (i = 0; i < 16; i++) {
        p = document.getElementById(tileNum[i].toString());
        p.style.backgroundImage = "url('images/" + img + ".jpg')";
        p.style.backgroundSize = "100%";
        img++;
        if (img == 9) {
            img = 1;
        }
    }
}

var ele1, ele2, img, img1;

var pawan = pawan || {};
pawan.showImage = function (elementId) {
    var count = 0, traverse;
    click++;
    //e = e || window.event;        //we can do like this also by using window.onclick listener but then this func will execute if we click anywhere else also.
    //e = e.target || e.srcElement;
    //if (e.className === 'tile') {  
    //    tileElement = e;
    //}
    for (traverse = 1; traverse < 17; traverse++) {
        if (document.getElementById(traverse.toString()).style.backgroundImage) {
            count++;
        }
    }
    if (count % 2 == 0) {
        var snd = new Audio("sounds/tada.wav"); // buffers automatically when created
        snd.play();
        img = tileNum.indexOf(Number(elementId)) % 8 + 1;
        tileElement = document.getElementById(elementId.toString());
        tileElement.classList.add("renderImage");
        tileElement.style.backgroundImage = "url('images/" + img + ".jpg')";
        tileElement.style.backgroundSize = "100%";

        ele1 = tileElement;
        
    }
    if (count % 2 == 1) {
        var snd = new Audio("sounds/tada.wav"); // buffers automatically when created
        snd.play();
        img1 = tileNum.indexOf(Number(elementId)) % 8 + 1;
        tileElement = document.getElementById(elementId.toString());
        tileElement.classList.add("renderImage");
        tileElement.style.backgroundImage = "url('images/" + img1 + ".jpg')";
        tileElement.style.backgroundSize = "100%";
        ele2 = tileElement;
        emptyTile++;
        setTimeout(function () {

            if (img != img1) {
                ele1.classList.remove("renderImage");
                ele2.classList.remove("renderImage");
                ele1.style.backgroundImage = "";
                ele2.style.backgroundImage = "";
                emptyTile--;
            }
            //else {
            //    ele1.detachEvent("onclick", pawan.showImage());
            //    ele2.detachEvent("onclick", pawan.showImage());
            //}
        }, 400);
    }
    document.getElementById('click').innerHTML = click;
    if (emptyTile === 8) {
        calculateBest();
    }
}


function calculateBest() {
    if (best == 0) {
        best = click;
    }
    if (click < best) {
        best = click;
    }
    document.getElementById('best').innerHTML = best;
    clearInterval(time);
    alert("Congratulations!!\nYou have completed before time.");
}


function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
        reset();
    }
}

function reset() {
    var element;
    tileNum.length = 0;
    generateTileNum();
    clearInterval(time);
    click = 0, sec = 60; emptyTile = 0;
    document.getElementById('click').innerHTML = click;
    for (i = 1; i < 17; i++) {
        element = document.getElementById(i.toString());
        element.style.backgroundImage = "";
       // element.attachEvent("onclick", pawan.showImage);
    }
    time = setInterval(myTimer, 1000);
}

window.onload = function () {
    best = 0;
    reset();
	document.getElementById('best').innerHTML = best;
}