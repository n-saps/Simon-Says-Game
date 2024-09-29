let userSeq=[];
let gameSeq=[];
let btns=["red", "green", "blue", "pink"];
let highestScore=0;

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game has started");
        started=true;
        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function levelUp(){
    userSeq=[];
    h2.innerText=`level ${level}`
    level++;

    let ranIdx=Math.floor(Math.random() * 3);
    let ranCol=btns[ranIdx];
    let ranBtn=document.querySelector(`.${ranCol}`);
    gameSeq.push(ranCol);
    // console.log(gameSeq);

    btnFlash(ranBtn);
}


function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(()=>{
                levelUp();
            },500);
        }
    }else{
        highestScore=Math.max(highestScore, level);
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> Highest score is ${highestScore} <br> Press any key to Restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
        }, 100);
        gameReset();
    }
}

function btnPress(){
    // console.log("Button was pressed");
    let btn=this;
    let userCol=btn.getAttribute("id");
    userSeq.push(userCol);
    // console.log(userSeq);
    btnFlash(btn);

    checkAns(userSeq.length-1);

}

let allBtns=document.querySelectorAll(".box");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function gameReset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
 