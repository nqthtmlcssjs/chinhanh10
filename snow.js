const snowContainer = document.createElement("div");
snowContainer.id = "snow";
document.body.appendChild(snowContainer);

const flakes = ["❄", "❅", "❆"];

for(let i = 0; i < 60; i++){

    const snow = document.createElement("span");

    snow.className = "snowflake";
    snow.innerHTML =
        flakes[Math.floor(Math.random()*flakes.length)];

    snow.style.left =
        Math.random() * 100 + "%";

    snow.style.fontSize =
        (12 + Math.random()*38) + "px";

    snow.style.opacity =
        0.2 + Math.random()*0.8;

    snow.style.animationDuration =
        (25 + Math.random()*40) + "s";

    snow.style.animationDelay =
        (-Math.random()*25) + "s";

    snowContainer.appendChild(snow);
}
