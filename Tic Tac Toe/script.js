
let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector("#reset");
let truno = true; // playerO , playerX
let newGameBtn = document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let moveCount = 0; // To track the number of moves

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    truno = true;
    moveCount = 0; // Reset move count
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (truno) { // playerO
            box.innerText = "O";
            truno = false;
        } else { // player X
            box.innerText = "X";
            truno = true;
        }
        box.disabled = true;
        moveCount++; // Increment move count
        cheeckWinner();
    });
});

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
};

const cheeckWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return;
            }
        }
    }

    // If no winner and all boxes are filled, declare a draw
    if (moveCount === 9) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
restBtn.addEventListener("click", resetGame);
