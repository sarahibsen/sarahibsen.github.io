document.addEventListener('DOMContentLoaded', () => {
    // Select all the interactive elements
    const navLinks = document.querySelectorAll('.portfolio-nav nav a');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const gallerySets = document.querySelectorAll('.gallery-set');
    if (navLinks.length > 0) {
        
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); 

                const targetId = link.getAttribute('data-target');
   
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                portfolioItems.forEach(item => item.classList.remove('active'));
                gallerySets.forEach(set => set.classList.remove('active'));

                link.classList.add('active');

                const targetPortfolioItem = document.getElementById(targetId);
                if (targetPortfolioItem) {
                    targetPortfolioItem.classList.add('active');
                }

                // Activate the corresponding gallery set
                const targetGallerySet = document.getElementById(targetId + '-gallery');
                if (targetGallerySet) {
                    targetGallerySet.classList.add('active');
                }
            });
        });
    }
});