document.addEventListener('DOMContentLoaded', function() {
    // Find all the navigation links
    const navLinks = document.querySelectorAll('.portfolio-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Stop the link from jumping

            // Get the ID of the content to show from the 'data-target' attribute
            const targetId = this.getAttribute('data-target');
            const targetItem = document.getElementById(targetId);

            // Find the currently active link and content
            const activeLink = document.querySelector('.portfolio-nav .nav-link.active');
            const activeItem = document.querySelector('.portfolio-item.active');

            // If we are clicking the already active link, do nothing
            if (activeLink === this) {
                return;
            }

            // --- The Animation Logic ---

            // 1. Remove 'active' from the current link
            activeLink.classList.remove('active');
            // 2. Add 'active' to the clicked link
            this.classList.add('active');

            // 3. Start the fade-out animation on the current item
            activeItem.classList.add('fading');

            // 4. After the fade-out animation finishes (400ms), swap the content
            setTimeout(() => {
                // Hide the old item
                activeItem.classList.remove('active');
                activeItem.classList.remove('fading');
                
                // Show the new item
                targetItem.classList.add('active');
            }, 400); // This time MUST match the transition duration in your CSS
        });
    });
});