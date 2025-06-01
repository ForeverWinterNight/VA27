let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const headerHeight = header.offsetHeight;
let isScrolling = false;

// Add scroll direction class to handle transitions
header.classList.add('scroll-up');

function handleScroll() {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Don't do anything if we're at the top
            if (currentScroll <= 0) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
                lastScrollTop = 0;
                isScrolling = false;
                return;
            }

            // Determine scroll direction
            if (currentScroll > lastScrollTop && currentScroll > headerHeight) {
                // Scrolling down
                if (!header.classList.contains('scroll-down')) {
                    header.classList.remove('scroll-up');
                    header.classList.add('scroll-down');
                }
            } else {
                // Scrolling up
                if (header.classList.contains('scroll-down')) {
                    header.classList.remove('scroll-down');
                    header.classList.add('scroll-up');
                }
            }

            lastScrollTop = currentScroll;
            isScrolling = false;
        });
    }
    isScrolling = true;
}

// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        handleScroll();
    });
}); 