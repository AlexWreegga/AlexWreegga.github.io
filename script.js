const bild = document.getElementById("bild");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let geschwindigkeitX = 7;
let geschwindigkeitY = 5;

let rotation = 0;
let zeit = 0;

function animieren() {
    zeit += 0.05;

    x += geschwindigkeitX;
    y += geschwindigkeitY;

    const breite = bild.offsetWidth;
    const hoehe = bild.offsetHeight;

    if (x <= 0 || x + breite >= window.innerWidth) {
        geschwindigkeitX *= -1;
        geschwindigkeitX += (Math.random() - 0.5) * 4;
    }

    if (y <= 0 || y + hoehe >= window.innerHeight) {
        geschwindigkeitY *= -1;
        geschwindigkeitY += (Math.random() - 0.5) * 4;
    }

    x = Math.max(0, Math.min(x, window.innerWidth - breite));
    y = Math.max(0, Math.min(y, window.innerHeight - hoehe));

    rotation += 6 + Math.random() * 3;

    const scaleX = 1 + Math.sin(zeit * 2) * 0.7;
    const scaleY = 1 + Math.cos(zeit * 3) * 0.7;

    const skewX = Math.sin(zeit * 4) * 45;
    const skewY = Math.cos(zeit * 3) * 30;

    const perspektiveX = Math.sin(zeit * 2) * 70;
    const perspektiveY = Math.cos(zeit * 2.5) * 70;

    bild.style.left = `${x}px`;
    bild.style.top = `${y}px`;

    bild.style.transform = `
        perspective(500px)
        rotate(${rotation}deg)
        rotateX(${perspektiveX}deg)
        rotateY(${perspektiveY}deg)
        scaleX(${scaleX})
        scaleY(${scaleY})
        skew(${skewX}deg, ${skewY}deg)
    `;

    bild.style.filter = `
        hue-rotate(${rotation * 3}deg)
        saturate(500%)
        contrast(180%)
        brightness(${100 + Math.sin(zeit * 5) * 50}%)
    `;

    requestAnimationFrame(animieren);
}

bild.addEventListener("click", () => {
    geschwindigkeitX = (Math.random() - 0.5) * 30;
    geschwindigkeitY = (Math.random() - 0.5) * 30;

    bild.style.width = `${150 + Math.random() * 500}px`;
});

window.addEventListener("resize", () => {
    x = Math.min(x, window.innerWidth - bild.offsetWidth);
    y = Math.min(y, window.innerHeight - bild.offsetHeight);
});

animieren();
