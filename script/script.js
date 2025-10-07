// handles the toggle of the dark mode 
document.addEventListener('DOMContentLoaded', () => {

    // --- THEME TOGGLE FUNCTIONALITY ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // On page load, check if the user has a saved theme preference in their browser's storage.
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    // Check if the theme toggle button actually exists on the page before trying to use it.
    if (themeToggleButton) {
        // Listen for a click on the theme toggle button.
        themeToggleButton.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            
            // If the current theme is 'dark', switch to 'light' (the default).
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.removeItem('theme'); 
            } else {
                // Otherwise, switch to 'dark'.
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark'); // Save the preference.
            }
        });
    }


    // --- HAMBURGER MENU FUNCTIONALITY ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Listen for a click on the hamburger icon.
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});