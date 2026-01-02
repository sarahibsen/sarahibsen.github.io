// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter projects with animation
        projectCards.forEach((card, index) => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
                    card.classList.remove('hidden');
                }, 10);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('.project-image');
        const link = card.dataset.link;
        
        if (link) {
            // If card has a link, open it
            window.open(link, '_blank');
        } else {
            // Otherwise show image in lightbox
            lightboxImage.src = img.src;
            lightbox.classList.add('active');
        }
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});
