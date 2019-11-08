let x=[];
let y=[];
let a,b,c,d,e,f,g,hh,ii,jj,kk,dragging=true,visible=false;
let rr,z,count;
let speed,degree;
let learningRate,optimizer;

function setup() {
    br=createCanvas(800,600);
    background(0);
    br.mouseReleased(mr);
    br.mousePressed(mp);
    let speed = document.getElementById("speed").value;
    learningRate=speed;
    optimizer = tf.train.adam(learningRate);
    a = tf.scalar(Math.random(-1,1)).variable();
    b = tf.scalar(Math.random(-1,1)).variable();
    c = tf.scalar(Math.random(-1,1)).variable();
    d = tf.scalar(Math.random(-1,1)).variable();
    e = tf.scalar(Math.random(-1,1)).variable();
    f = tf.scalar(Math.random(-1,1)).variable();
    g = tf.scalar(Math.random(-1,1)).variable();
    hh = tf.scalar(Math.random(-1,1)).variable();
    ii = tf.scalar(Math.random(-1,1)).variable();
    jj = tf.scalar(Math.random(-1,1)).variable();
    kk = tf.scalar(Math.random(-1,1)).variable();
}

function event(){
    rr = document.getElementById("degree").value;
}

function mp(){
    dragging=false;
}

function mr(){
    dragging=true;
}

function mouseDragged(){
    if(!dragging){
        let a=map(mouseX,0,800,-1,1);
        let b=map(mouseY,0,600,1,-1);
        x.push(a);
        y.push(b);
    }
}

const predict=(x)=>{
    z=int(rr);
    lis=[a,b,c,d,e,f,g,hh,ii,jj,kk];
    yp=tf.scalar(0);count=0;
    for (let p=z;p>=1;p--){
        yp=yp.add(tf.tensor1d(x).pow(tf.scalar(p)).mul(lis[count]));
        count=count+1;
    }
    yp=yp.add(lis[count]);
    return yp;
}
const loss_function=(guess,ra)=>{
    rand=tf.tensor1d(ra);
    return guess.sub(rand).square().mean();
}

function draw() {
    event();
    if(dragging==true ){
        if(x.length>0){
            optimizer.minimize(()=>loss_function(predict(x),y));
            if(x.length>1){visible=true;}
            background(0);
            for (let k=0;k<x.length;k++){
                let a=map(x[k],-1,1,0,800);
                let b=map(y[k],-1,1,600,0);
                strokeWeight(4);
                stroke(255);
                point(a,b);
            }
        }
    }
    if(visible){
        xx=[]
        for (let z=-1;z<=1;z=z+.005){
            xx.push(z);
        }
        yp=tf.tidy(()=>predict(xx));
        li=yp.dataSync();
        yp.dispose();
        beginShape();
        noFill();
        stroke(75);
        strokeWeight(3);
        for (let z=0;z<xx.length;z++){
            let xxx=map(xx[z],-1,1,0,800);
            let yyy=map(li[z],-1,1,600,0);
            vertex(xxx,yyy);
        }
        endShape();
    }
    // console.log(tf.memory().numTensors);
}

