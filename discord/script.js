const config = {
    discordUrl: "https://discord.gg/ftap",
    countdownStart: 5,
    particleCount: 150,
    serverId: "1278024817752150016" 
};

let countdown = config.countdownStart;
const countdownElement = document.getElementById('countdown');
const instantBtn = document.getElementById('instant-jump');
const wormhole = document.getElementById('wormhole');

// Discord Widget を動的に読み込む
function loadDiscordWidget() {
    const widgetContainer = document.querySelector('.discord-widget');
    widgetContainer.innerHTML = `
        <iframe
            src="https://discord.com/widget?id=${config.serverId}&theme=dark"
            width="350"
            height="400"
            allowtransparency="true"
            frameborder="0"
        ></iframe>
    `;
}

function updateCountdown() {
    countdownElement.textContent = countdown;
    
    if (countdown <= 0) {
        initiateWormhole();
    } else {
        countdown--;
        setTimeout(updateCountdown, 1000);
    }
}

function initiateWormhole() {
    wormhole.style.opacity = '1';
    setTimeout(() => {
        window.location.href = config.discordUrl;
    }, 1000);
}

instantBtn.addEventListener('click', () => {
    initiateWormhole();
});

// パーティクルアニメーション
const canvas = document.getElementById('quantum-portal');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.reset();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// 初期化
loadDiscordWidget(); // Discord Widget を読み込み
animateParticles();
updateCountdown();

// ウィンドウリサイズ時にCanvasを調整
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
