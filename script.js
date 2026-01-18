let gameseq = [];
let userseq = [];

let colors = ["red", "green", "blue", "orange"];

let started = false;
let level = 0;

let highScore = localStorage.getItem("highScore") || 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelup();
    }
});

document.addEventListener("click", function () {
    if (!started) {
        started = true;
        levelup();
    }
});


function gameflash(btn) {
    btn.classList.add("gameflash")
    setTimeout(function () {
        btn.classList.remove("gameflash")
    }, 250);

}

function userflash(btn) {
    btn.classList.add("userflash")
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 150);

};

function levelup() {
    userseq = [];
    level++
    h2.innerText = `Level ${level} | High Score: ${highScore}`;


    let randomindx = Math.floor(Math.random() * colors.length);
    let randomcolor = colors[randomindx];
    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor);
    gameflash(randombtn);
};

function checkans() {
    let indx = userseq.length - 1;
    if (userseq[indx] === gameseq[indx]) {
        if (userseq.length === gameseq.length) {

            document.body.classList.add("success");

            setTimeout(() => {
                document.body.classList.remove("success");
                levelup();
            }, 350);
        }

    } else {

        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game over! Your score was ${level} <br> Press any key to start.`;

        document.body.classList.add("shake", "danger");

        if (navigator.vibrate) {
            navigator.vibrate(200);
        }

        setTimeout(() => {
            document.body.classList.remove("shake", "danger");
        }, 400);

        reset();
    }
}


function btnpress(event) {
    event.stopPropagation();
    let btn = this
    userflash(btn)

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkans();
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress)
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
