// Typing animation for hero subtitle
const typedText = document.getElementById('typed-text');
const phrases = [
    'Solution Architect Intern',
    'Full Stack Developer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
        typedText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
        setTimeout(() => { isDeleting = true; type(); }, 1800);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
}

if (typedText) type();

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements - ADVANCED version
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards, skill boxes, experience cards, and education cards
document.querySelectorAll('.project-card, .skill-box, .experience-card, .education-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.backgroundPosition = `0px ${scrolled * 0.5}px`;
        }
    }
});

// Counter animation for stats (if added in future)
const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCount();
    });
};

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add ripple effect on buttons
document.querySelectorAll('.contact-link, .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= top && scrollPosition < bottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Contact form — sends via mailto
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value.trim();
        const lastName  = document.getElementById('last-name').value.trim();
        const email     = document.getElementById('contact-email').value.trim();
        const message   = document.getElementById('message').value.trim();

        if (!firstName || !lastName || !email || !message) {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.className = 'form-status error';
            return;
        }

        const subject = encodeURIComponent(`Portfolio Contact from ${firstName} ${lastName}`);
        const body    = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:hanaatinaf2@gmail.com?subject=${subject}&body=${body}`;

        formStatus.textContent = 'Opening your email client...';
        formStatus.className = 'form-status success';
        contactForm.reset();
    });
}

// AI Chat Widget
const chatToggle   = document.getElementById('chat-toggle');
const chatWindow   = document.getElementById('chat-window');
const chatIcon     = document.getElementById('chat-icon');
const chatCloseIcon = document.getElementById('chat-close-icon');
const chatInput    = document.getElementById('chat-input');
const chatSend     = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

let chatHistory = [];
let isOpen = false;

chatToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWindow.style.display = isOpen ? 'flex' : 'none';
    chatIcon.style.display = isOpen ? 'none' : 'inline';
    chatCloseIcon.style.display = isOpen ? 'inline' : 'none';
    if (isOpen) chatInput.focus();
});

function addMessage(text, role) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role === 'user' ? 'user-msg' : 'ai-msg'}`;
    div.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg chat-typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<p>Thinking...</p>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';
    chatSend.disabled = true;
    addMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    showTyping();

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: chatHistory })
        });
        const data = await res.json();
        removeTyping();
        const reply = data.response || 'Sorry, something went wrong.';
        addMessage(reply, 'ai');
        chatHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
        removeTyping();
        addMessage('Sorry, I\'m having trouble connecting. Please try again!', 'ai');
    }

    chatSend.disabled = false;
    chatInput.focus();
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

console.log('✨ Portfolio loaded with advanced animations!');
