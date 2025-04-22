// Configuration
const config = {
    discordUrl: "https://discord.gg/ftap",
    serverId: "1278024817752150016",
    countdownFrom: 5
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load Discord widget
    document.getElementById('discord-widget').innerHTML = `
        <iframe src="https://discord.com/widget?id=${config.serverId}&theme=dark" 
                width="350" height="400" 
                allowtransparency="true" 
                frameborder="0"></iframe>
    `;

    // Countdown functionality
    let countdown = config.countdownFrom;
    const countdownElement = document.getElementById('countdown');
    const wormhole = document.getElementById('wormhole');
    
    function updateCountdown() {
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            redirect();
        } else {
            countdown--;
            setTimeout(updateCountdown, 1000);
        }
    }
    
    function redirect() {
        wormhole.style.opacity = '1';
        setTimeout(() => {
            window.location.href = config.discordUrl;
        }, 1000);
    }
    
    document.getElementById('instant-jump').addEventListener('click', redirect);
    
    // Particle animation
    const canvas = document.getElementById('quantum-portal');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.y += p.speed;
            if (p.y > canvas.height) p.y = -10;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    updateCountdown();
});
