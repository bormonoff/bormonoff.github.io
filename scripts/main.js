// Matrix Rain Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const hex = '0123456789ABCDEF';

const alphabet = katakana + latin + nums + symbols + hex;

const fontSize = 14;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = {
        y: Math.random() * -100,
        speed: 2 + Math.random() * 5,
        char: alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    };
}

const draw = () => {
    ctx.fillStyle = 'rgba(29, 2, 37, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const drop = rainDrops[i];
        
        if (Math.random() > 0.98) {
            drop.char = text;
        }
        
        ctx.fillStyle = '#68A2EB';
        ctx.fillText(drop.char, i * fontSize, drop.y * fontSize);
        
        for (let j = 0; j < 5; j++) {
            const trailY = drop.y - j;
            if (trailY > 0) {
                const opacity = 1 - j * 0.2;
                ctx.fillStyle = `rgba(76, 93, 215, ${opacity})`;
                ctx.fillText(
                    alphabet.charAt(Math.floor(Math.random() * alphabet.length)), 
                    i * fontSize, 
                    trailY * fontSize
                );
            }
        }
        
        drop.y += drop.speed / 10;
        
        if (drop.y * fontSize > canvas.height && Math.random() > 0.975) {
            drop.y = 0;
            drop.speed = 2 + Math.random() * 5;
        }
    }
};

setInterval(draw, 30);

// Terminal text effect
const terminalTexts = [
    "WHO AM I?",

];

let currentTextIndex = 0;
const terminalCursor = document.querySelector('.terminal-cursor');
const terminalTextElement = terminalCursor.previousSibling;

const typeWriter = () => {
    let text = terminalTexts;
    let charIndex = 0;
    let textIndex = 0;
    let isDeleting = false;
    
    const type = () => {
        const currentText = text[textIndex].substring(0, charIndex);
        terminalTextElement.textContent = currentText;
        
        if (!isDeleting) {
            charIndex++;
            if (charIndex > text[textIndex].length) {
                isDeleting = true;
                setTimeout(type, 1000);
                return;
            }
        } else {
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex++;
                if (textIndex >= text.length) {
                    textIndex = 0;
                }
                currentTextIndex = (currentTextIndex + 1) % terminalTexts.length;
            }
        }
        
        const typingSpeed = isDeleting ? 60 : 140;
        setTimeout(type, typingSpeed);
    };
    
    type();
};

setTimeout(typeWriter, 1000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effects to skill badges
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.boxShadow = `0 0 10px ${getComputedStyle(badge).color}`;
    });
    
    badge.addEventListener('mouseleave', () => {
        badge.style.boxShadow = '';
    });
});

// Add glitch effect to cyber-cards on hover
document.querySelectorAll('.cyber-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const glitchTime = Math.random() * 100 + 100;
        card.style.boxShadow = `0 0 15px ${getComputedStyle(card).borderColor}, 
                                0 0 30px ${getComputedStyle(card).borderColor}`;
        card.style.transform = 'translateY(-5px)';
        
        // Random glitch effect
        if (Math.random() > 0.7) {
            card.style.transform += ' translateX(3px)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px) translateX(-3px)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px)';
                }, glitchTime);
            }, glitchTime);
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
        card.style.transform = '';
    });
});