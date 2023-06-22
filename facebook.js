const canvas=document.querySelector('canvas')
const c=canvas.getContext('2d');

function stopBackgroundMusic() {
    const audio = document.getElementById("stop-music");
    audio.pause();
    audio.currentTime = 0;
}
window.onload=function (){

    const finish1=document.getElementById("finish")
    const finish2=document.getElementById("finish1")
    const finish3=document.getElementById("finish2")
    const finish4=document.getElementById("finish3")
    const finish5=document.getElementById("finish4")
    const question1 = document.getElementById('question1');
    const question2=document.getElementById('question2')
    const question3=document.getElementById('question3')
    const question4=document.getElementById('question4')
    const question5=document.getElementById('question5')
const a1=document.getElementById('a1');
const b1=document.getElementById('b1');

    var score = 0;
    var scoreElement = document.getElementById("score");
    updateScore();

    function updateScore() {
        scoreElement.innerHTML = score;
    }
    flag1=false
    flag2=false
    flag3=false
    flag4=false
    flag5=false

    /*var correctAnswerElements = document.querySelectorAll(".correct-answer");
    var lastClickedAnswer = false;
    correctAnswerElements.forEach(function(correctAnswerElement) {
        correctAnswerElement.addEventListener("click", function() {
            lastClickedAnswer = true;
        });
    });*/
    var incorrectAnswerElements = document.querySelectorAll(".incorrect-answer");
    incorrectAnswerElements.forEach(function(incorrectAnswerElement) {
        incorrectAnswerElement.addEventListener("click", function() {
            flag1= false;
            flag2= false;
            flag3= false;
            flag4= false;
            flag5= false;
        });
    });
    var correct1 = document.getElementById("correct1"); // Replace "correct-option" with the actual ID of the correct answer element
    var correct2 = document.getElementById("correct2"); // Replace "correct-option" with the actual ID of the correct answer element
    var correct3 = document.getElementById("correct3"); // Replace "correct-option" with the actual ID of the correct answer element
    var correct4 = document.getElementById("correct4"); // Replace "correct-option" with the actual ID of the correct answer element
    var correct5 = document.getElementById("correct5"); // Replace "correct-option" with the actual ID of the correct answer element

    correct1.addEventListener("click", function() {
        flag1=true
    });correct2.addEventListener("click", function() {
        flag2=true
    });correct3.addEventListener("click", function() {
        flag3=true
    });correct4.addEventListener("click", function() {
        flag4=true
    });correct5.addEventListener("click", function() {
        flag5=true
    });


    canvas.width=1200
canvas.height=650

    let timer;
    let remainingTime = 180; // duration in seconds

    // What to do when the timer runs out
    function gameOver() {
        loseSound.play()
        setTimeout(function() {
            location.reload();
        }, 1000);
    }

    function updateTimer() {
        if (remainingTime < 0) {
            gameOver();
            return;
        }

        // Calculate the minutes and seconds from the remaining time
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        // Format the time display with leading zeros
        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        // Update the timer display
        document.getElementById('timer').textContent = `${formattedMinutes}:${formattedSeconds}`;

        remainingTime--;
    }

    // Start the timer automatically when the page loads
    timer = setInterval(updateTimer, 1000);
    updateTimer();

const bottom=canvas.height-68

const gravity=1
class Player{
    constructor() {
        this.position={
            x: 800,
            y: 300
        }
        this.velocity={
            x:0,
            y:0
        }
        this.width=66;
        this.height=150;
        this.speed=5
        this.isJumping=false

        this.image=createImages({imageScr:"spriteStandRight.png"})
        this.frames=0
        this.sprites={
            stand:{
                right: createImages({imageScr:"spriteStandRight.png"}),
                cropWidth:177,
                width:66,
                left:createImages({imageScr:"spriteStandLeft.png"}),
            },
            run:{
                right: createImages({imageScr:"spriteRunRight.png"}),
                cropWidth:340,
                width:127.825,
                left:createImages({imageScr:"spriteRunLeft.png"}),

            }
        }
        this.currentSprite=this.sprites.stand.right
        this.currentCropWidth=this.sprites.stand.cropWidth
    }


draw(){
        c.drawImage(this.currentSprite,this.currentCropWidth*this.frames,0,this.currentCropWidth,400, this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.frames++
        if(this.frames > 28) this.frames=0
        this.draw()
        this.position.y+=this.velocity.y
        this.position.x=this.velocity.x
        if(this.position.y+this.height+this.velocity.y<=canvas.height)
            this.velocity.y+=gravity
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        } else if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
            this.velocity.x = 0;
        }
    }
}

class Platform{
    constructor(x,y, image) {
        this.position={
            x,
            y,
        }
        this.image=image
        this.width=image.width
        this.height=image.height
    }

    draw(){
        c.drawImage(this.image, this.position.x,this.position.y)
    }
}
class Logo {
    constructor(x, y, image, moveDistance) {
        this.position = {
            x,
            y,
        };

        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.moveDistance=moveDistance; // Adjust the vertical distance to move as needed// Flag to determine the current movement directions
        this.start=this.position.y
    }
    hide(){
        this.position.y=-12000
    }

    update() {
        this.draw()
        if (this.moveUp) {
            this.position.y -= this.moveDistance;
            if (this.position.y <=this.start) {
                this.moveUp = false;
            }
        } else {
            this.position.y += this.moveDistance;
            if (this.position.y >= this.start+50) {
                this.moveUp = true;
            }
        }
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}


class Layer {
    constructor(x, image, leaving) {
        this.position={
            x:x,
            y:-100
        }
        this.image=image
        this.width=2400
        this.height=1200
        this.leaving=leaving
       this.x2=1200

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }
    draw1(){
        c.drawImage(this.image, this.x2, this.position.y, this.width, this.height);
    }
}



function createImages({imageScr}){
    const image =new Image()
    image.src=imageScr
    return image
}

    const jumpSound = new Audio('jump_sound.mp3')
    const loseSound= new Audio('losing.mp3')



const player=new Player()

const platforms=[new Platform(300, 410, createImages({imageScr: 'platform1.png'})), new Platform(750, 228, createImages({imageScr: 'platform1.png'})), new Platform(1300, 228,createImages({imageScr: 'platform1.png'}))
    ,new Platform(3500, 200, createImages({imageScr: 'platform1.png'}))
    , new Platform(-1, bottom, createImages({imageScr:"floor.png"})), new Platform(2380, bottom, createImages({imageScr:"platform1.png"})),
    new Platform(3600, bottom, createImages({imageScr:"floor.png"})), new Platform(3000, 400, createImages({imageScr:"platform1.png"})),
    new Platform(5900, 400, createImages({imageScr:"platform1.png"})), new Platform(4500, 400, createImages({imageScr:"platform1.png"})),
    new Platform(6400, bottom, createImages({imageScr:"floor.png"})), new Platform(6900, 400, createImages({imageScr:"platform1.png"})),
    new Platform(8800, bottom, createImages({imageScr:"platform1.png"}))]

const background=[new Layer(-20,createImages({imageScr:'11.jpg'}), 1),new Layer(2000,createImages({imageScr:'11.jpg'}), 1), new Layer(4050,createImages({imageScr:'11.jpg'}), 1)]

const logos=[new Logo(10,10, createImages({imageScr:"facebook.png"}),0.8),new Logo(1800,470, createImages({imageScr:"facebook.png"}),0),
    new Logo(2500,60, createImages({imageScr:"facebook.png"}),0.5),new Logo(3400,250, createImages({imageScr:"facebook.png"}),0.58),
    new Logo(6050,280, createImages({imageScr:"facebook.png"}),0.2)]


const logo1=new Logo(1180,60, createImages({imageScr:"img.png"}),1.22)
const logo2=new Logo(3000,70, createImages({imageScr:"img.png"}),1.28)
const logo3=new Logo(5000,90, createImages({imageScr:"img.png"}),1.33)
const logo4=new Logo(6450,100, createImages({imageScr:"img.png"}),1.15)
const logo6=new Logo(7440,110, createImages({imageScr:"img.png"}),1.15)
    const logo5=new Platform(9050,300, createImages({imageScr:"DoorOpen.png"}))

const keys={
    right: {
        pressed:false
    },
    left:{
        pressed:false
    },
    up:{
        pressed:false
    }
}



function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)


    background.forEach(background => {
        background.draw()
        if (player.position.x === 2400) {
            background.draw1()
        }

    })

    platforms.forEach(platform => {
        platform.draw()
    })
    logo5.draw()
    player.update()


    logos.forEach(logo => {
        logo.update()
        logo.draw()

    })
    logo1.update()
    logo2.update()
    logo3.update()
    logo4.update()
    logo6.update()

    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x += player.speed
    } else if (keys.left.pressed && player.position.x > 500) {
        player.velocity.x -= player.speed
    } else {
        if (keys.right.pressed) {
            platforms.forEach((platform) => {
                platform.position.x -= 8
            })
            background.forEach((background) => {
                background.position.x -= background.leaving + 3

            })
            logos.forEach((logos) => {
                logos.position.x -= 8
            })
            logo1.position.x -= 8
            logo2.position.x -= 8
            logo3.position.x -= 8
            logo4.position.x -= 8
            logo5.position.x -= 8
            logo6.position.x -= 8

        } else if (keys.left.pressed && player.position.x>platforms[0].position.x) {
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
            background.forEach((background) => {
                background.position.x += 1
            })
            logos.forEach((logos) => {
                logos.position.x += 5
            })
            logo1.position.x += 5
            logo2.position.x += 5
            logo3.position.x += 5
            logo4.position.x += 5
            logo5.position.x += 5
            logo6.position.x += 5

        }
    }
    if (player.position.y > 650) {
        console.log("lose")
        loseSound.play()
        setTimeout(function() {
            location.reload();
        }, 1000);  // Wait for 1 second before reloading
    }

    //platform collision
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width)
            player.velocity.y = 0
    })

    function checkIfClicks(logo) {
        var playerCenterX = player.position.x + (player.width / 2);
        var playerCenterY = player.position.y + (player.height / 2);
        var logoCenterX = logo.position.x + (logo.width / 2);
        var logoCenterY = logo.position.y + (logo.height / 2);

        var halfLogoWidth = logo.width / 2;
        var halfLogoHeight = logo.height / 2;

        var playerHalfHeight = player.height / 2;

        var isTouchingCenterX = playerCenterX >= logoCenterX - halfLogoWidth / 2 && playerCenterX <= logoCenterX + halfLogoWidth / 2;
        var isTouchingCenterY = playerCenterY >= logoCenterY - halfLogoHeight / 2 - playerHalfHeight && playerCenterY <= logoCenterY + halfLogoHeight / 2 + playerHalfHeight;

        return isTouchingCenterX && isTouchingCenterY;
    }

    function checkIfFinished(logo) {
        if (player.position.x <= logo.position.x + logo.width+150 &&
            player.position.x + player.width >= logo.position.x+150 &&
            player.position.y <= logo.position.y + logo.height &&
            player.position.y + player.height >= logo.position.y
        )
            return true;
        else return false;
    }
    logos.forEach((logo)=>{
        if(checkIfClicks(logo)){
            loseSound.play()
            setTimeout(function() {
                location.reload();
            }, 1000);
        }})

    if (checkIfClicks(logo1)) {
        console.log("questiob ")
        question1.style.display = "inline"
        finish1.addEventListener("click", function () {
            console.log('correct')
            question1.style.display = "none"
            if(flag1){
                score+=1000;
                updateScore();
                flag1=false;
            }
            logo1.hide();
        })
    }


    if (checkIfClicks(logo2)) {
        console.log("questiob ")
        question2.style.display = "inline"
        finish2.addEventListener("click", function () {
            console.log('correct')
            question2.style.display = 'none'
            if(flag2==true){
                score+=1000;
                console.log('+100')
                updateScore();
                flag2=false
            }
            logo2.hide();
        })
    }if (checkIfClicks(logo3)) {
        console.log("questiob ")
        question3.style.display = "inline"
        finish3.addEventListener("click", function () {
            console.log('correct')
            question3.style.display = 'none'
            if(flag3==true ){
                score+=1000;
                updateScore();
                flag3=false
            }
            logo3.hide();
        })
    }if (checkIfClicks(logo4)) {
        console.log("questiob ")
        question4.style.display = "inline"
        finish4.addEventListener("click", function () {
            console.log('correct')
            question4.style.display = 'none'
            if(flag4==true){
                score+=1000;
                updateScore();
                flag4=false
            }
            logo4.hide();

        })
    }if (checkIfClicks(logo6)) {
        console.log("questiob ")
        question5.style.display = "inline"
        finish5.addEventListener("click", function () {
            console.log('correct')
            question5.style.display = 'none'
            if(flag5==true){
                score+=1000;
                updateScore();
                flag5=false;
            }
            logo6.hide();
        })
    } if (checkIfFinished(logo5)) {
        if(score==5000){
            setTimeout(function() {
                window.location.href='kraj.html'
            }, 800);
        }else{
            setTimeout(function() {
                window.location.href='lost.html'
            },800);
        }}
}




    ///lose Condition

animate()

addEventListener('keydown',({keyCode})=>{
    console.log(keyCode)
    switch (keyCode){
        case 37:
            console.log('left')
            keys.left.pressed=true
            player.currentSprite=player.sprites.run.left
            player.currentCropWidth=player.sprites.run.cropWidth
            player.width=player.sprites.run.width
            break
        case 39:
            console.log('right')
            keys.right.pressed=true
            player.currentSprite=player.sprites.run.right
            player.currentCropWidth=player.sprites.run.cropWidth
            player.width=player.sprites.run.width
            break
        case 40:
            console.log('down')
            break
        case 38:
            console.log('up')
            if (!keys.up.pressed && player.velocity.y >= 0) {
                player.velocity.y -= 20;
                keys.up.pressed = true;
                jumpSound.play()

            }
    }


})
addEventListener('keyup',({keyCode})=>{
    console.log(keyCode)
    switch (keyCode){
        case 37:
            console.log('leftup')
            keys.left.pressed=false
            player.currentSprite=player.sprites.stand.left
            player.currentCropWidth=player.sprites.stand.cropWidth
            player.width=player.sprites.stand.width
            break
        case 39:
            console.log('rightup')
            player.currentSprite=player.sprites.stand.right
            player.currentCropWidth=player.sprites.stand.cropWidth
            player.width=player.sprites.stand.width
            keys.right.pressed=false
            break
        case 40:
            console.log('down')
            break
        case 38:
            console.log('up')
            keys.up.pressed=false
            break
    }

})

};
