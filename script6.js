let likes = 0;
let dislikes = 0;
let comments = [];

// Elements
const likeBtn = document.getElementById("LikeButn");
const dislikeBtn = document.getElementById("DislikeButn");
const likeCount = document.getElementById("LikeCount");
const dislikeCount = document.getElementById("DislikeCount");
const commentInput = document.getElementById("commentInput");
const submitCommentBtn = document.getElementById("submitCommentBtn");
const resetBtn = document.getElementById("resetBtn");
const commentsList = document.getElementById("commentsList");
const message = document.getElementById("message");

// ---------------- Cookies ----------------
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [key, value] = c.split("=");
        if (key === name) return value;
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00; path=/`;
}

// ---------------- UI ----------------
function updateUI() {
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;

    commentsList.innerHTML = "";

    if (comments.length === 0) {
        commentsList.innerHTML = `<div class="comment-item">No comments yet.</div>`;
    } else {
        comments.forEach((comment) => {
            const div = document.createElement("div");
            div.className = "comment-item";
            div.textContent = comment;
            commentsList.appendChild(div);
        });
    }
}

// ---------------- Load ----------------
function loadState() {
    likes = parseInt(getCookie("likes")) || 0;
    dislikes = parseInt(getCookie("dislikes")) || 0;

    const savedComments = getCookie("comments");
    if (savedComments) {
        comments = JSON.parse(savedComments);
    }

    updateUI();
}

// ---------------- Like ----------------
likeBtn.addEventListener("click", () => {
    if (getCookie("voted")) {
        message.textContent = "You already voted!";
        return;
    }

    likes++;
    setCookie("likes", likes);
    setCookie("voted", "yes");

    message.textContent = "Like submitted!";
    updateUI();
});

// ---------------- Dislike ----------------
dislikeBtn.addEventListener("click", () => {
    if (getCookie("voted")) {
        message.textContent = "You already voted!";
        return;
    }

    dislikes++;
    setCookie("dislikes", dislikes);
    setCookie("voted", "yes");

    message.textContent = "Dislike submitted!";
    updateUI();
});

// ---------------- Comment ----------------
submitCommentBtn.addEventListener("click", () => {
    if (getCookie("commented")) {
        message.textContent = "You already commented!";
        return;
    }

    const text = commentInput.value.trim();
    if (text === "") {
        message.textContent = "Write something first!";
        return;
    }

    comments.push(text);
    setCookie("comments", JSON.stringify(comments));
    setCookie("commented", "yes");

    commentInput.value = "";
    message.textContent = "Comment added!";
    updateUI();
});

// ---------------- Reset ----------------
resetBtn.addEventListener("click", () => {
    deleteCookie("likes");
    deleteCookie("dislikes");
    deleteCookie("comments");
    deleteCookie("voted");
    deleteCookie("commented");

    likes = 0;
    dislikes = 0;
    comments = [];

    message.textContent = "Reset done! You can vote again.";
    updateUI();
});

// ---------------- Start ----------------
loadState();