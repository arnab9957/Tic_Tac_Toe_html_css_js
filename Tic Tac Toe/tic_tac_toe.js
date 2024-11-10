let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector(".restart");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector(".newGame");
let messege = document.querySelector("#msg");
let drawGame = document.querySelector("#drawGame");
let singlePlayer = document.querySelector(".singlePlayer");
let multiPlayer = document.querySelector(".multiPlayer");

let turnX = true;
let count = 0;
// let textColor = document.createElement("div");

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes ();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log ("Box was clicked!")
        if (turnX) {
            box.innerText = "X";
            box.style.color = "red";
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "blue";
            turnX = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner ();
        if (count === 9 && !isWinner) {
        gameDraw();
        }
        })
    });

const gameDraw = () => {
        msgContainer.innerText = "Congratulations game is draw !"
        msgContainer.classList.remove("hide");
    }

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    }
)};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        resetColor ();
    }
)};

const showWinner = (winner) => {
    msgContainer.innerText = `Congratulations ${winner} wins the Game`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText; 
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;
            if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos1Val) {
                    console.log(pos1Val, " is Winner! ");
                    changeColor (pos1Val);
                    showWinner (pos1Val);
                    
                }
            }
    }
};

// change the color of the boxes(only the winning pattern box) when someone wins the game
const changeColor = (winner) => {
    boxes.forEach((box) => {
        if (box.innerText === winner) {
            box.style.backgroundColor = "skyblue";
        }
    }
)};

//after game over the changeColor will be gone
const resetColor = () => {
    boxes.forEach((box) => {
        box.style.backgroundColor = "";

    }
)};


newGameBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);

