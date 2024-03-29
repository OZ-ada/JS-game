var player1;
var player2;
var ground;
var plat1;
var plat2;
var plat3;
var plat4;
var plat5;
var GRAVITY = 1;
var JUMP = 16;
var platspeed = 3;

var p1X = 0
var p1Y = 0
var p2X = 0
var p2Y = 0

var p1jump = false;
var p2jump = false;

var p1Left = false;
var p2Left = true;

var count = 0;
var x;
var z;
var ba = 0;

var p1Shooting = false
var p2Shooting = false
var p1Cooldown = 0
var p2Cooldown = 0

var p1Life = 3
var p2Life = 3

var p1Win = false
var p2Win = false
var tie = false

var buttonY = 300

var gameStart = false

var p1ySpawn = 0
var p2yPsawn = 0

var goSound = 0

var fireworkCount1;
var fireworkCount2;
var fireworkCount3;
var fireworkCount4;
var fireworkCount5;

var fireworkX;
var fireworkY;

p1YSpawn = [695, 610, 500, 390]
p2YSpawn = [695, 610, 500, 390]


function preload() {
    backdrop = loadImage("Assets/landscape.png")
    alien = loadImage("Assets/Player1.png")
    clown = loadImage("Assets/Player2.png")
    gun = loadImage("Assets/gun.png")
    heart1 = loadImage("Assets/p1Heart.png")
    heart2 = loadImage("Assets/p2Heart.png")
    firework1 = loadImage("Assets/firework1.png")
    firework2 = loadImage("Assets/firework2.png")
    jumpSound = loadSound("Assets/SFX_Jump_09.wav")
    shoot = loadSound("Assets/laserpew.ogg")
    music = loadSound("Assets/Fighting is not an option.wav")

}

function setup() {
    createCanvas(1000, 750)
    menuButtons = new Group();

    for (var i = 0; i < 2; i++) {
        button = createSprite(500, buttonY, 200, 150)
        button.mouseActive = true
        button.shapeColor = "#087874"
        menuButtons.add(button)
        buttonY += 200
    }

}

function menu() {
    if (menuButtons[0].visible) {
        textAlign(CENTER)
        textSize(250)
        textFont("Odibee Sans")
        text("Arena Brawl", 500, 200)
        textAlign(CENTER)
        textSize(50)
        textFont("Bebas Neue")
        fill(255)
        text("Play", 500, 310)
        menuButtons[1].visible = false
        if (menuButtons[0].mouseIsOver) {
            if (mouseIsPressed) {
                startup()
                gameStart = true
                for (var x = 0; x < 2; x++) {
                    menuButtons[x].visible = false
                }
            }
        }
    }
}

function endScreen() {

    if (p1Life < 1) {

        textAlign(CENTER)
        textFont("Bebas Neue")
        textSize(100)
        text("Player 2 Wins", 500, 250)
        textSize(20)
        text("Press R to go back to the Main Menu", 500, 300)
        fireworks = new Group();
        for (var a = 0; a < 5; a++) {
            firework = createSprite();
            firework.addImage(firework1)
            fireworks.add(firework)
        }
        for (var b = 0; b < 10; b++) {
            for (var fireworkCount = 0; fireworkCount < 5; fireworkCount++) {
                fireworkX = random(1000)
                fireworkY = random(0, 390)
                fireworks[fireworkCount].position.x = fireworkX
                fireworks[fireworkCount].position.y = fireworkY
            }
        }
        if (keyIsDown(82)) {
            location.reload(true)
        }


    }
    if (p2Life < 1) {
        textAlign(CENTER)
        textFont("Bebas Neue")
        textSize(100)
        text("Player 1 Wins", 500, 250)
        textSize(20)
        text("Press R to go back to the Main Menu", 500, 300)
        fireworks = new Group();
        for (var z = 0; z < 5; z++) {
            firework = createSprite()
            firework.addImage(firework1)
            fireworks.add(firework)
        }
        for (var b = 0; b < 10; b++) {
            for (var fireworkCount = 0; fireworkCount < 5; fireworkCount++) {
                fireworkX = random(1000)
                fireworkY = random(0, 390)
                fireworks[fireworkCount].position.x = fireworkX
                fireworks[fireworkCount].position.y = fireworkY

            }
        }

        if (keyIsDown(82)) {
            location.reload(true)
        }

    }

}

function startup() {
    music.play()
    p1Y = random(0, 3);
    p2Y = random(0, 3);
    p1ySpawn = p1YSpawn[Math.round(p1Y)]
    p2ySpawn = p2YSpawn[Math.round(p2Y)]
    if (p1ySpawn == 695) {
        p1X = random(500)
    }
    if (p1ySpawn == 610 || p1ySpawn == 390) {
        p1X = random(50, 350)
    }
    if (p1ySpawn == 500) {
        p1X = random(350, 500)
    }

    if (p2ySpawn == 695) {
        p2X = random(500, 1000)
    }
    if (p2ySpawn == 610 || p2ySpawn == 390) {
        p2X = random(470, 770)
    }
    if (p2ySpawn == 500) {
        p2X = random(500, 650)
    }



    player1 = createSprite(p1X, p1ySpawn); //50 690
    player1.addImage(alien);
    player1.scale = 0.3;
    player2 = createSprite(p2X, p2ySpawn); //950 690
    player2.addImage(clown);
    player2.scale = 0.3;
    players = Group();
    players.add(player1)
    players.add(player2)

    ground = createSprite(500, 745, 1000, 50);
    leftwall = createSprite(0, 500, 10, 1000);
    leftwall.visible = false
    rightwall = createSprite(1000, 0, 10, 10000);
    rightwall.visible = false
    roof = createSprite(500, 0, 1000, 10);
    roof.visible = false
    borders = new Group();
    borders.add(ground);
    borders.add(leftwall);
    borders.add(rightwall);
    borders.add(roof);

    platforms = Group();
    plat1 = createSprite(200, 620, 300, 10);
    plat2 = createSprite(800, 620, 300, 10);
    plat3 = createSprite(500, 510, 300, 10);
    plat4 = createSprite(200, 400, 300, 10);
    plat5 = createSprite(800, 400, 300, 10);
    plat6 = createSprite(500, 290, 300, 10);
    platforms.add(plat1);
    platforms.add(plat2);
    platforms.add(plat3);
    platforms.add(plat4);
    platforms.add(plat5);
    platforms.add(plat6);
    plat1.shapeColor = "#087874";
    plat2.shapeColor = "#087874";
    plat3.shapeColor = "#087874";
    plat4.shapeColor = "#087874";
    plat5.shapeColor = "#087874";
    plat6.shapeColor = "#087874";

    platborder1 = createSprite(100, 290, 10, 50)
    platborder2 = createSprite(900, 290, 10, 50)
    platborder1.visible = false;
    platborder2.visible = false;

    p1Gun = createSprite((player1.position.x + 45), 690);
    p1Gun.addImage(gun)
    p1Gun.scale = 0.1;
    p1Gun.mirrorX(-1)
    p2Gun = createSprite((player2.position.x - 45), 690)
    p2Gun.addImage(gun)
    p2Gun.scale = 0.1;

    p1Projectile = createSprite(1000, 1000, 11, 5)
    p1Projectile.visible = false
    p1Projectile.shapeColor = ('red')

    p2Projectile = createSprite(1000, 1000, 11, 5)
    p2Projectile.visible = false
    p2Projectile.shapeColor = ('green')

    p1Heart1 = createSprite(30, 30);
    p1Heart1.addImage(heart1);
    p1Heart1.scale = 0.8;
    p1Heart2 = createSprite(69, 30);
    p1Heart2.addImage(heart1)
    p1Heart2.scale = 0.8;
    p1Heart3 = createSprite(108, 30);
    p1Heart3.addImage(heart1);
    p1Heart3.scale = 0.8;

    p2Heart1 = createSprite(892, 30);
    p2Heart1.addImage(heart2);
    p2Heart1.scale = 0.8;
    p2Heart2 = createSprite(931, 30);
    p2Heart2.addImage(heart2)
    p2Heart2.scale = 0.8;
    p2Heart3 = createSprite(970, 30);
    p2Heart3.addImage(heart2);
    p2Heart3.scale = 0.8;
}

function countDown() {

    if (ba < 180) {


        
        fill(255, 0, 0);
        rect(500, 0, 20, 1000)

        fill(0, 255, 0);
        textSize(50);
        text("Player 1", 200, 250)

        fill(0, 0, 250);
        textSize(50);
        text("Player 2", 700, 250)
        ba++

    }
    if (goSound < 60) {
        goSound++
    }
    if (goSound > 60 && goSound < 180) {
        goSound++
    }

}

function game() {

    if (gameStart) {

        player1.velocity.y += GRAVITY;
        if (keyIsDown(65)) {
            player1.position.x -= 5;
            p1Gun.position.x = player1.position.x - 50
            p1Gun.mirrorX(1)
            p1Left = true
        }

        if (keyIsDown(68)) {
            player1.position.x += 5;
            p1Gun.position.x = player1.position.x + 50
            p1Gun.mirrorX(-1)
            p1Left = false
        }

        if (player1.collide(ground) || player1.collide(platforms)) {
            player1.velocity.y = 0;
        }

        p1Gun.position.y = player1.position.y

        //player 2 movement
        player2.velocity.y += GRAVITY
        if (keyIsDown(37)) {
            player2.position.x -= 5;
            p2Gun.position.x = player2.position.x - 50
            p2Gun.mirrorX(1)
            p2Left = true
        }

        if (keyIsDown(39)) {
            player2.position.x += 5;
            p2Gun.position.x = player2.position.x + 50;
            p2Gun.mirrorX(-1);
            p2Left = false
        }

        p2Gun.position.y = player2.position.y


        //collisions
        if (player2.collide(ground) || player2.collide(platforms)) {
            player2.velocity.y = 0;

        }

        players.collide(platforms);
        players.collide(borders);
        borders.collide(players);

        plat6.velocity.x = platspeed;
        if (plat6.overlap(platborder2)) {
            platspeed = -3
        }
        if (plat6.overlap(platborder1)) {
            platspeed = 3
        }

        x = random(50)

        if (plat4.visible == true) {
            count++
            if (count > 300) {
                count = 0
            }
            if (count == Math.round(x)) {
                plat4.visible = false
                plat4.position.x = 5000;
            } else {
                count++
                if (count == 300) {
                    plat4.visible = true
                }
            }
        }

        if (plat4.visible == false) {
            if (count < 200) {
                count++
            }
            if (count == 200) {
                plat4.position.x = 200;
                plat4.visible = true;
            }
        }

        //Player 1 Shooting
        if (keyIsDown(32) && p1Left == true && p1Shooting == false) {
            p1Shooting = true
            p1Projectile.position.x = p1Gun.position.x
            p1Projectile.position.y = p1Gun.position.y
            p1Projectile.visible = true
            p1Projectile.velocity.x = -20
            shoot.play()
        }

        if (keyIsDown(32) && p1Left == false && p1Shooting == false) {
            p1Shooting = true
            p1Projectile.position.x = p1Gun.position.x
            p1Projectile.position.y = p1Gun.position.y
            p1Projectile.visible = true
            p1Projectile.velocity.x = 20
            shoot.play()
        }

        if (p1Shooting) {
            p1Cooldown++
        }
        if (p1Cooldown == 45) {
            p1Cooldown = 0
            p1Shooting = false
        }

        //Player 2 Shooting
        if (keyIsDown(16) && p2Left == true && p2Shooting == false) {
            p2Shooting = true
            p2Projectile.position.x = p2Gun.position.x
            p2Projectile.position.y = p2Gun.position.y
            p2Projectile.visible = true
            p2Projectile.velocity.x = -20
            shoot.play()
        }

        if (keyIsDown(16) && p2Left == false && p2Shooting == false) {
            p2Shooting = true
            p2Projectile.position.x = p2Gun.position.x
            p2Projectile.position.y = p2Gun.position.y
            p2Projectile.visible = true
            p2Projectile.velocity.x = 20
            shoot.play()
        }

        if (p2Shooting) {
            p2Cooldown++
        }
        if (p2Cooldown == 45) {
            p2Cooldown = 0
            p2Shooting = false
        }

        //p1 damage
        if (p2Projectile.overlap(player1)) {
            p1Life -= 1
            p2Projectile.position.x = 5000
            p2Projectile.velocity.x = 0

        }
        //p2 damage
        if (p1Projectile.overlap(player2)) {
            p2Life -= 1
            p1Projectile.position.x = 5000
            p1Projectile.velocity.x = 0
        }

        if (p1Life < 3) {
            p1Heart3.visible = false
            if (p1Life < 2) {
                p1Heart2.visible = false
                if (p1Life < 1) {
                    p1Heart1.visible = false
                    p2Win = true
                    player1.position.x = 5000
                }
            }
        }

        if (p2Life < 3) {
            p2Heart1.visible = false
            if (p2Life < 2) {
                p2Heart2.visible = false
                if (p2Life < 1) {
                    p2Heart3.visible = false
                    p1Win = true
                    player2.position.x = 5000
                }
            }
        }

        if (p1Win == true && p2Win == true) {
            tie = true
        }
        textFont("Bebas Neue")
        textSize(27)
        text("SPACE to shoot",10,70)
        text("SHIFT to shoot",860,70)
    }

}

function draw() {

    background(backdrop);
    game()


    drawSprites();

    menu()

    endScreen()
    //Hold R for clone wars
    //if(keyIsDown(82)){
        //startup()

    //}
}

function keyPressed() {
    if (gameStart) {

        if (keyCode === UP_ARROW && p2jump == false) {
            player2.velocity.y -= JUMP;
            p2jump = true
            jumpSound.play()
        } else {
            if (player2.velocity.y === 0) {
                p2jump = false;
            }
        }

        if (keyIsDown(87) && p1jump == false) {
            player1.velocity.y -= JUMP;
            p1jump = true
            jumpSound.play()
        } else {
            if (player1.velocity.y === 0) {
                p1jump = false;
            }
        }
    }
}
