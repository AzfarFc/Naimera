// ============================================
// NAIMÈRA - INTERACTIVE FUNCTIONALITY
// Instagram Integration & Smooth Interactions
// ============================================

/* ===== DOM ELEMENTS ===== */
const navbarLinks = document.querySelectorAll('.nav-link');
const productButtons = document.querySelectorAll('.btn-product');
const orderNowButtons = document.querySelectorAll('.btn-primary');
const dmLink = 'https://ig.me/m/by.naimera';
const instagramProfile = 'https://www.instagram.com/by.naimera/';
const instagramHandle = '@by.naimera';

/* ===== SMOOTH SCROLLING FOR NAVIGATION ===== */
// Smooth scroll animation when clicking navigation links
navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Only prevent default if it's an internal link
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

/* ===== PRODUCT BUTTON INTERACTION ===== */
// Add click handlers to product "View Details" buttons
productButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        handleProductInteraction(button, index);
    });
});

function handleProductInteraction(button, index) {
    // Show visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // In a real application, this could open a product detail modal
    // For now, it navigates to Instagram DM
    setTimeout(() => {
        window.open(dmLink, '_blank');
    }, 200);
}

/* ===== ORDER NOW BUTTON WITH CLIPBOARD FUNCTIONALITY ===== */
// Special handling for "Order Now" buttons - copy message to clipboard, then open DM
document.addEventListener('DOMContentLoaded', () => {
    // Find all "Order Now" buttons (primary buttons in hero and CTA sections)
    const orderButtons = document.querySelectorAll('.btn-primary');
    
    orderButtons.forEach(button => {
        // Only apply special behavior to buttons that link to DM
        if (button.getAttribute('href') === dmLink) {
            button.addEventListener('click', handleOrderNowClick);
        }
    });
});

async function handleOrderNowClick(e) {
    e.preventDefault();
    
    const messageText = 'Is this available?';
    
    try {
        // Attempt to copy message to clipboard using modern API
        await navigator.clipboard.writeText(messageText);
        
        // Show visual feedback that message was copied
        showCopyNotification('Message copied! Ready to paste in DM.');
        
        // Delay opening DM link slightly so user sees the notification
        setTimeout(() => {
            window.open(dmLink, '_blank', 'noopener,noreferrer');
        }, 600);
        
    } catch (err) {
        // Fallback if clipboard API fails
        console.warn('Clipboard copy failed, using fallback method', err);
        
        // Fallback: use older execCommand method
        const textArea = document.createElement('textarea');
        textArea.value = messageText;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyNotification('Message copied! Ready to paste in DM.');
            setTimeout(() => {
                window.open(dmLink, '_blank', 'noopener,noreferrer');
            }, 600);
        } catch (err) {
            console.error('Fallback copy failed:', err);
            // If copy fails, still open the DM link
            window.open(dmLink, '_blank', 'noopener,noreferrer');
        }
        
        document.body.removeChild(textArea);
    }
}

/* ===== COPY NOTIFICATION ===== */
// Display a temporary notification when text is copied
function showCopyNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #e8c5b8, #f5d7cc);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(232, 197, 184, 0.3);
        font-weight: 600;
        z-index: 10000;
        animation: slideUp 0.3s ease, slideDown 0.3s ease 2.7s;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/* ===== KEYBOARD SHORTCUTS ===== */
// Add keyboard navigation (optional feature for power users)
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Can implement search functionality here
    }
});

/* ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== */
// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and testimonial cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

/* ===== BUTTON HOVER EFFECTS ===== */
// Enhanced hover animations for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

/* ===== ACTIVE NAVIGATION LINK ===== */
// Highlight active navigation link based on scroll position
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--dark-pink)';
            link.style.fontWeight = '700';
        }
    });
});

/* ===== INSTAGRAM DM FALLBACK ===== */
// Fallback handler if DM link fails (though unlikely)
// This ensures users can still access Instagram even if the DM link has issues
function handleInstagramFallback() {
    console.log('DM link may not be available, redirecting to Instagram profile');
    window.open(instagramProfile, '_blank', 'noopener,noreferrer');
}

// Add data attribute to track DM link reliability
// This could be expanded to log failures for monitoring
window.addEventListener('beforeunload', () => {
    // Log successful interactions if needed
});

/* ===== PERFORMANCE: LAZY LOAD IMAGES ===== */
// Lazy load images for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all product images
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===== MOBILE MENU TOGGLE (FUTURE FEATURE) ===== */
// Placeholder for future mobile menu implementation
function toggleMobileMenu() {
    // This can be expanded for full mobile navigation menu
    console.log('Mobile menu toggle');
}

/* ===== ACCESSIBILITY: FOCUS MANAGEMENT ===== */
// Ensure keyboard navigation works smoothly
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

/* ===== SMOOTH PAGE LOAD ANIMATION ===== */
// Fade in page when fully loaded
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0.95';

/* ===== INSTAGRAM LINK VALIDATION ===== */
// Ensure Instagram links are always properly formatted
document.addEventListener('DOMContentLoaded', () => {
    const instagramLinks = document.querySelectorAll('a[href*="instagram"]');
    
    instagramLinks.forEach(link => {
        // Add proper security attributes
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
        
        // Optional: Add click tracking
        link.addEventListener('click', () => {
            console.log('Instagram link clicked:', link.href);
        });
    });
});

/* ===== CONSOLE MESSAGE ===== */
// Easter egg for developers
console.log(
    '%cNaimèra | Grace in every detail ✨',
    'font-family: "Playfair Display", serif; font-size: 20px; color: #e8c5b8; font-weight: bold;'
);
console.log(
    '%cStainless Steel Fashion Accessories from Dhaka, Bangladesh 🇧🇩',
    'font-family: "Poppins", sans-serif; font-size: 12px; color: #f5d7cc;'
);
console.log(
    '%cFollow @by.naimera on Instagram | Prices completely fixed ‼️',
    'font-family: "Poppins", sans-serif; font-size: 11px; color: #999;'
);