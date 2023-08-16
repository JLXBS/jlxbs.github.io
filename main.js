const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const height=canvas.height;
const width=canvas.width;

var ball_v=0;
var ball_x=width/2;

var target=width/2;

var e=0;
var sige=0;
var laste=0;
var de=0;
var dT=0;
var lastT=0;

var Kp=0;
var Ki=0;
var Kd=0;

var g=0;

var move_flag=0;

function clearctx(){
    ctx.clearRect(0,0,width,height);
}
function drawtarget(){
    ctx.fillStyle="#c00";
    ctx.fillRect(target-1,0,2,height);
    ctx.fillStyle="#dd0";
    ctx.fillRect(target-3,height/2-25,6,50);
}
function drawball(){
    var k=Kd/10;
    canvas.style.backgroundColor="rgba(0,149,255,"+Math.min(1,Math.max(k,0))+")";
    ctx.beginPath();
    ctx.lineWidth=6;
    ctx.arc(ball_x,height/2,18,0,2*Math.PI,true);
    ctx.fillStyle="#ffffff"
    ctx.fill();
    var r=Math.min(200,Math.floor(Math.abs(e)));
    var g=200-r;
    ctx.strokeStyle="#"+r.toString(16)+g.toString(16)+"00";
    ctx.stroke();
}
function PID(){
    dT=(new Date).getTime()-lastT;
    lastT=(new Date).getTime();
    var inp=document.getElementById("range");
    g=parseInt(inp.value);

    if(move_flag==1){
        e=target-ball_x;
        sige+=e*dT;
        de=e-laste;
        laste=e;

        ball_v+=(Kp/100)*e*dT;
        ball_v+=(Ki/1000)*sige;
        ball_v+=(Kd*10)*(de/dT);
        ball_v+=g*dT;

        if(Math.abs(ball_v)<=0.001) ball_v=0;
        ball_x+=ball_v*dT/1000;
    }
}
function init(){
    laste=target-ball_x;
    lastT=(new Date).getTime()-1;
    display_last_T=(new Date).getTime()-1;

    de=0;
    dT=1;
}

var display_last_T=0;

function display(){
    if((new Date).getTime()>display_last_T+100){
        document.getElementById("x_ball").innerText=ball_x.toFixed(1);
        document.getElementById("v_ball").innerText=ball_v.toFixed(1);
        if(Math.abs(Kp)<0.01) Kp=0;
        if(Math.abs(Ki)<0.01) Ki=0;
        if(Math.abs(Kd)<0.01) Kd=0;
        document.getElementById("K_P").innerText=Kp.toFixed(2);
        document.getElementById("K_I").innerText=Ki.toFixed(2);
        document.getElementById("K_D").innerText=Kd.toFixed(2);
        document.getElementById("ball_g").innerText=g.toFixed(1);
        document.getElementById("sig_e").innerText=(-sige/1000).toFixed(1);
        display_last_T=(new Date).getTime();
    }
}

function change_target(event){
    if(event.buttons==1){
        target=event.offsetX;
        laste=target-ball_x;
        e=laste;
        ctx.strokeStyle="#ff0000";
    }
}

init();
loop();
function loop(){
    setTimeout(loop,1);
    clearctx();

    PID();

    drawball();
    drawtarget();
    display();
}

function stop_move(){
    lastT=(new Date).getTime()-1;
    move_flag=1-move_flag;
    if(move_flag==1){
        document.getElementById("stop_text").innerText="Start";
        document.getElementById("stop_button").style.border='5px solid #0c0';
    }
    if(move_flag==0){
        document.getElementById("stop_text").innerText="Stop";
        document.getElementById("stop_button").style.border='5px solid #c00';
    }
}

function reset1(){
    ball_x=width/2;
    target=width/2;
    ball_v=0;
    document.getElementById("reset_button").style.border='5px solid #0c0';

    sige=0;
    e=0;
    de=0;
    
    move_flag=0;
    document.getElementById("stop_text").innerText="Stop";
    document.getElementById("stop_button").style.border='5px solid #c00';
}

function reset2(){
    sige=0;
    e=0;
    de=0;
    ball_x=width/2;
    target=width/2;
    ball_v=0;
    laste=0;
    document.getElementById("reset_button").style.border='5px solid #c00';
}

function K_Psss(){Kp-=1;}
function K_Pss(){Kp-=0.1;}
function K_Ps(){Kp-=0.01;}
function K_Pp(){Kp+=0.01;}
function K_Ppp(){Kp+=0.1;}
function K_Pppp(){Kp+=1;}

function K_Isss(){Ki-=1;}
function K_Iss(){Ki-=0.1;}
function K_Is(){Ki-=0.01;}
function K_Ip(){Ki+=0.01;}
function K_Ipp(){Ki+=0.1;}
function K_Ippp(){Ki+=1;}

function K_Dsss(){Kd-=1;}
function K_Dss(){Kd-=0.1;}
function K_Ds(){Kd-=0.01;}
function K_Dp(){Kd+=0.01;}
function K_Dpp(){Kd+=0.1;}
function K_Dppp(){Kd+=1;}

function g_clear(){
    g=0;
    document.getElementById("range").value="0";
}
function sige_clear(){
    sige=0;
}
function KP_clear(){
    Kp=0;
}
function KI_clear(){
    Ki=0;
}
function KD_clear(){
    Kd=0;
}