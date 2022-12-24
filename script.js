 
 
let flage = true;
let interval = null;
let img1 = document.querySelector(".rock");
let img2 = document.querySelector(".paper");
let img3 = document.querySelector(".ss");
let c1 = "rock";
let c2 = "paper";
let c3 = "ss";
let clickAudio = new Audio("sound/select.wav");
let winAudio = new Audio("sound/win.wav");
let overAudio = new Audio("sound/lose.mp3");
let com;
let user;
let hs = JSON.parse(localStorage.getItem("hs"));

showScore();

const swap = ()=>{
    let tmp = img1.src;
    let t1 = c1;
    img1.src = img3.src;
    c1 = c3;
    img1.setAttribute("class",c1);
    // console.log(c1,img1.src);
    img3.src = img2.src;
    c3 = c2;
    img3.setAttribute("class",c3);
    img2.src = tmp;
    c2 = t1;
    img2.setAttribute("class",c2);
}

function intervalMan(flage,swap){
    if(flage)
    {
         interval = setInterval(()=>{swap()}, 1200); 
    }
    else
    {
        clearInterval(interval);
    }
}

// computer game logic.

function Generate(){
    
    let a = Math.random() * 100;
    a = Math.floor(a);
    if(a>=0 && a<=33)
    {
        com = "rock";
    }
    else if(a>=34 && a<=66)
    {
        com = "paper";
    }
    else
    {
        com = "seissor";
    }
    console.log(com);
}

function showScore(){
    let uscore = localStorage.getItem("uscore");
    let cscore = localStorage.getItem("cscore");
    if(uscore===null && cscore===null)
    {
        document.getElementById("uscore").innerText = 0;
        document.getElementById("cscore").innerText = 0;
       
    }
    else if(uscore===null)
    {
        
        document.getElementById("uscore").innerText = 0;
        document.getElementById("cscore").innerText = cscore;
    }
    else if(cscore===null)
    {
     
        document.getElementById("uscore").innerText = uscore;
        document.getElementById("cscore").innerText = 0;
    }
    else
    {
      
        document.getElementById("uscore").innerText = uscore;
        document.getElementById("cscore").innerText = cscore;
    }
    if(hs===null)
    {
        document.getElementById("hs").innerText = 0;
    }
    else
    {
        document.getElementById("hs").innerText = hs;
    }
}

//to change the score
function scorChange(id)
{   
    let score;
    if(id==="uscore")
    {
        if(localStorage.getItem("uscore")===null)
        {
            score = 0;
        }
        else
        {
            score = JSON.parse(localStorage.getItem("uscore"));
        }
        score = score + 10;
        localStorage.setItem("uscore",score);
        if(score>hs)
        {
            localStorage.setItem("hs",score);
            hs = score;
        }
    }
    else
    {
        if(localStorage.getItem("cscore")===null)
        {
            score = 0;
        }
        else
        {
            score = JSON.parse(localStorage.getItem("cscore"));
        }
        score = score + 10;
        localStorage.setItem("cscore",score);
    }
    document.getElementById(`${id}`).innerText = score; 
    document.getElementById("hs").innerHTML = hs;
}
//to change the h3 for win lose and tie.
function Win()
{
    document.getElementById("h3").setAttribute("hidden","hidden"); 
    winAudio.currentTime = 0;
    winAudio.play();
    document.getElementById("winLose").removeAttribute("hidden");
    document.getElementById("wl").innerText = "Win";
    document.getElementById("wl").style = "color:green;";
    scorChange("uscore");
}
function Lose()
{
    overAudio.currentTime = 0;
    overAudio.play();
    document.getElementById("h3").setAttribute("hidden","hidden");
    document.getElementById("winLose").removeAttribute("hidden");
    document.getElementById("wl").innerText = "Lose"; 
    document.getElementById("wl").style = "color:red;"; 
    scorChange("cscore");
}
function Tie()
{
    document.getElementById("h3").setAttribute("hidden","hidden");
    document.getElementById("tie").removeAttribute("hidden");
    document.getElementById("tie").innerText = "Game Tie";    
}

//for display winner or losser

function WinLoss(){
    // for removing other part of card
    if(user==="urock")
    {
        document.querySelector(".upaper").setAttribute("hidden","hideen");
        document.querySelector(".uss").setAttribute("hidden","hideen");
    }
    else if(user==="upaper")
    {
        document.querySelector(".urock").setAttribute("hidden","hideen");
        document.querySelector(".uss").setAttribute("hidden","hideen");
    }
    else{
        document.querySelector(".urock").setAttribute("hidden","hideen");
        document.querySelector(".upaper").setAttribute("hidden","hideen");
    }
   if(com==="rock")
   {
    document.querySelector(".paper").setAttribute("hidden","hideen");
    document.querySelector(".ss").setAttribute("hidden","hideen");
   }
   else if(com==="paper")
   {
       document.querySelector(".rock").setAttribute("hidden","hideen");
       document.querySelector(".ss").setAttribute("hidden","hideen");
   }
   else{
       document.querySelector(".rock").setAttribute("hidden","hideen");
       document.querySelector(".paper").setAttribute("hidden","hideen");
   }

   // for choose winner and losser
   if(com==="rock" && user==="urock")
   {
       Tie();
   }
   else if(com==="rock" && user==="upaper")
   {
     Win();   
   }
   else if(com==="rock" && user==="uss")
   {
     Lose();
   }
   if(com==="paper" && user==="urock")
   {
      Lose();
   }
   else if(com==="paper" && user==="upaper")
   {
    Tie();
   }
   else if(com==="paper" && user==="uss")
   {
    Win();
   }
   if(com==="seissor" && user==="urock")
   {
      Win();
   }
   else if(com==="seissor" && user==="upaper")
   {
    Lose();
   }
   else if(com==="seissor" && user==="uss")
   {
    Tie();
   }
   
   
   // after 3 second all will be normal . 
   setTimeout(() => {
        winAudio.pause();
        overAudio.pause();
        document.querySelector(".rock").removeAttribute("hidden"); 
        document.querySelector(".urock").removeAttribute("hidden"); 
        document.querySelector(".paper").removeAttribute("hidden");
        document.querySelector(".upaper").removeAttribute("hidden");
        document.querySelector(".ss").removeAttribute("hidden");
        document.querySelector(".uss").removeAttribute("hidden");

        document.getElementById("h3").removeAttribute("hidden");
        document.getElementById("winLose").setAttribute("hidden","hidden"); 
        document.getElementById("tie").setAttribute("hidden","hidden");
    }, 2000);
}



// on click event for user input
let cc = (e)=>{
    Generate(); 
        e.setAttribute("style","cursor:not-allowed;");
        flage=false;
        intervalMan(flage,swap); 
        user = e.getAttribute("class");
        console.log(user);
        WinLoss();
        setTimeout(() => {
            intervalMan(true,swap); 
            e.setAttribute("style","cursor:pointer;");
        }, 2000);
}

let imgs = document.querySelectorAll("#user button");
console.log(imgs);
imgs.forEach((e)=>{
    e.addEventListener("click",()=>{
        clickAudio.currentTime = 0;
        clickAudio.play();
        setTimeout(() => {
            clickAudio.pause();
        }, 300);
        Generate(); 
        e.setAttribute("style","cursor:not-allowed;");
        e.setAttribute("disabled","disabled");
        flage=false;
        intervalMan(flage,swap); 
        user = e.getAttribute("class");
        console.log(user);
        WinLoss();
        setTimeout(() => {
            intervalMan(true,swap); 
            e.setAttribute("style","cursor:pointer;");
            e.removeAttribute("disabled");
        }, 2000);
         
    }) 
})

// for restart the game 


let rbtn = document.getElementById("rbtn");
rbtn.addEventListener("click",()=>{
    clickAudio.currentTime = 0;
    clickAudio.play();
    localStorage.removeItem("uscore");
    localStorage.removeItem("cscore");
    showScore();
});


intervalMan(flage,swap);