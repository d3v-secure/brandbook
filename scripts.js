// Matrix rain effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
const charArray = chars.split('');
const fontSize = 14;
let columns = canvas.width / fontSize;
const drops = [];
const matrixTrail = 'rgba(0, 0, 0, 0.05)';
const matrixColor = getComputedStyle(document.body).getPropertyValue('--terminal-green').trim() || '#00ff41';

function refillDrops() {
    drops.length = 0;
    columns = canvas.width / fontSize;
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
}

refillDrops();

function drawMatrix() {
    ctx.fillStyle = matrixTrail;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = matrixColor;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    refillDrops();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Copy to clipboard function for color codes
function copyToClipboard(text, element) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');

        const originalText = element.innerHTML;
        element.classList.add('copied');

        const message = document.createElement('div');
        message.textContent = 'Скопировано: ' + text;
        message.style.cssText = 'position: fixed; top: 20px; right: 20px; background: rgba(0, 255, 65, 0.9); color: #000; padding: 1rem 2rem; border-radius: 8px; font-size: 0.7rem; z-index: 10000; box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);';
        document.body.appendChild(message);

        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 2000);

        setTimeout(() => {
            element.classList.remove('copied');
            element.innerHTML = originalText;
        }, 300);
    } catch (err) {
        console.error('Failed to copy:', err);
    }

    document.body.removeChild(textarea);
}
