let likes = 0;
let dislikes = 0;
let comments = [];

const likeBtn = document.getElementById("LikeButn");
const dislikeBtn = document.getElementById("DislikeButn");
const likeCount = document.getElementById("LikeCount");
const dislikeCount = document.getElementById("DislikeCount");
const commentInput = document.getElementById("commentInput");
const submitCommentBtn = document.getElementById("submitCommentBtn");
const resetBtn = document.getElementById("resetBtn");
const commentsList = document.getElementById("commentsList");
const message = document.getElementById("message");

function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(cookieName) === 0) {
            return decodeURIComponent(c.substring(cookieName.length));
        }
    }

    return "";
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

function updateUI() {
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;

    commentsList.innerHTML = "";

    if (comments.length === 0) {
        commentsList.innerHTML = `<div class="comment-item">No comments yet.</div>`;
    } else {
        comments.forEach(function (comment) {
            const div = document.createElement("div");
            div.className = "comment-item";
            div.textContent = comment;
            commentsList.appendChild(div);
        });
    }
}

function loadState() {
    const savedLikes = getCookie("likes");
    const savedDislikes = getCookie("dislikes");
    const savedComments = getCookie("comments");

    likes = savedLikes ? parseInt(savedLikes) : 0;
    dislikes = savedDislikes ? parseInt(savedDislikes) : 0;
    comments = savedComments ? JSON.parse(savedComments) : [];

    updateUI();
}

likeBtn.addEventListener("click", function () {
    const voted = getCookie("voted");

    if (voted) {
        message.textContent = "You have already voted.";
        return;
    }

    likes++;
    setCookie("likes", likes);
    setCookie("voted", "like");
    message.textContent = "Your like has been submitted.";
    updateUI();
});

dislikeBtn.addEventListener("click", function () {
    const voted = getCookie("voted");

    if (voted) {
        message.textContent = "You have already voted.";
        return;
    }

    dislikes++;
    setCookie("dislikes", dislikes);
    setCookie("voted", "dislike");
    message.textContent = "Your dislike has been submitted.";
    updateUI();
});

submitCommentBtn.addEventListener("click", function () {
    const commentText = commentInput.value.trim();
    const commented = getCookie("commented");

    if (commented) {
        message.textContent = "You have already submitted a comment.";
        return;
    }

    if (commentText === "") {
        message.textContent = "Please write a comment first.";
        return;
    }

    comments.push(commentText);
    setCookie("comments", JSON.stringify(comments));
    setCookie("commented", "true");

    commentInput.value = "";
    message.textContent = "Your comment has been submitted.";
    updateUI();
});

resetBtn.addEventListener("click", function () {
    deleteCookie("likes");
    deleteCookie("dislikes");
    deleteCookie("comments");
    deleteCookie("voted");
    deleteCookie("commented");

    likes = 0;
    dislikes = 0;
    comments = [];

    commentInput.value = "";
    message.textContent = "All data has been cleared. You can vote and comment again.";
    updateUI();
});

loadState();