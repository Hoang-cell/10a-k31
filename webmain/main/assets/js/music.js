if (!window.music) {
    window.music = new Audio("nhac.mp3");
    window.music.loop = true;
}

let music = window.music;

// CHỈ 1 biến trạng thái
let unlocked = localStorage.getItem("musicStarted") === "true";

// click mở nhạc (1 lần duy nhất)
document.addEventListener("click", function () {
    if (!unlocked) {
        music.play().catch(() => {});
        localStorage.setItem("musicStarted", "true");
        unlocked = true;
    }
}, { once: true });

// lưu thời gian
setInterval(() => {
    if (!music.paused) {
        localStorage.setItem("musicTime", music.currentTime);
    }
}, 500);

// khôi phục khi load trang
function restoreMusic() {
    let time = localStorage.getItem("musicTime");

    if (time !== null) {
        music.currentTime = parseFloat(time);
    }

    if (unlocked) {
        music.play().catch(() => {});
    }
}

window.addEventListener("load", restoreMusic);

// nếu dùng PJAX
$(document).on("pjax:end", restoreMusic);