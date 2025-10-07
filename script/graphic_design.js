document.addEventListener('DOMContentLoaded', () => {
    // Find all the navigation links in the portfolio sidebar
    const portfolioNavLinks = document.querySelectorAll('.portfolio-nav nav a');

    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioNavLinks.length > 0) {
        portfolioNavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();

                const targetId = link.getAttribute('data-target');
                const targetItem = document.getElementById(targetId);

   
                portfolioItems.forEach(item => {
                    item.classList.remove('active');
                });


                if (targetItem) {
                    targetItem.classList.add('active');
                }
                portfolioNavLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });

                link.classList.add('active');
            });
        });
    }
});