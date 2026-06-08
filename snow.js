document.addEventListener("DOMContentLoaded", function () {
    const oldSnow = document.getElementById("snow");
    if (oldSnow) oldSnow.remove();

    const snowContainer = document.createElement("div");
    snowContainer.id = "snow";
    document.body.appendChild(snowContainer);

    const flakes = ["❄", "❅", "❆"];

    for (let i = 0; i < 40; i++) {
        const snow = document.createElement("span");

        snow.className = "snowflake";
        snow.textContent = flakes[Math.floor(Math.random() * flakes.length)];

        const size = 8 + Math.random() * 45;

        snow.style.left = Math.random() * 100 + "%";
        snow.style.fontSize = size + "px";
        snow.style.opacity = 0.2 + Math.random() * 0.7;
        snow.style.animationDelay = (-Math.random() * 25) + "s";

        if (size > 35) {
            snow.style.animationDuration = (40 + Math.random() * 30) + "s";
        } else {
            snow.style.animationDuration = (20 + Math.random() * 25) + "s";
        }

        snowContainer.appendChild(snow);
    }
});
