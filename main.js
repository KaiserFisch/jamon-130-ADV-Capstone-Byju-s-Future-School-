song = "";
leftWristX=0 ;
rightWristX=0 ;
leftWristY=0 ;
rightWristY=0 ;
scoreLeftWrist=0;
scoreRightWrist=0;

function setup() {
    canvas = createCanvas(800, 500);
    canvas.center();
     video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)
}

function draw() {
 image(video, 0, 0, 800, 600);
fill("darkgreen");
stroke("crimsom");
if (scoreRightWrist>0.2) {
circle(rightWristX,rightWristY, 50);

if (rightWrist>0 && rightWrist<=100) {
   document.getElementById("speed").innerHTML= "Velocidad = 0.5x";
   song.rate(0.5);
}

if (rightWrist>100 && rightWrist<=200) {
    document.getElementById("speed").innerHTML= "Velocidad = 1x";
    song.rate(1);
 }

 if (rightWrist>200 && rightWrist<=300) {
    document.getElementById("speed").innerHTML= "Velocidad = 1.5x";
    song.rate(1.5);
 }

 if (rightWrist>300 && rightWrist<=400) {
    document.getElementById("speed").innerHTML= "Velocidad = 2x";
    song.rate(2);
 }

 if (rightWrist>400 && rightWrist<=500) {
    document.getElementById("speed").innerHTML= "Velocidad = 2.5x";
    song.rate(2.5);
 }
}

if (scoreLeftWrist>0.2) {
circle(leftWristX, leftWristY, 50);
inNumberLeftWristY=Number(leftWristY);
removeDecimals=floor(inNumberLeftWristY);
volume=removeDecimals/400;
document.getElementById("volume").innerHTML= "Volumen= "+volume;
song.setVolume(volume);
}
}

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.setVolume(1);
    song.rate(1);
    song.play();
}

function modelLoaded() {
    console.log("PoseNet se inicializó");

}

function gotPoses(results) {
if (results.length>0) {
    console.log(results);

    scoreRightWrist=results[0].pose.keypoints[10].score;
    console.log("scoreRightWrist= "+scoreRightWrist);

    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist= "+scoreLeftWrist);

    leftWristX =results[0].pose.leftWrist.x;
    leftWristY =results[0].pose.leftWrist.y;
    console.log("leftWristX ="+ leftWristX + " leftWristY=" + leftWristY);

    rightWristX =results[0].pose.rightWrist.x;
    rightWristY =results[0].pose.rightWrist.y;
    console.log("rightWristX ="+ rightWristX + " rightWristY=" + rightWristY);
}
}