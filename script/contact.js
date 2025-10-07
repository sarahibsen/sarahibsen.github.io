document.addEventListener('DOMContentLoaded', () => {
    // --- FORM SWITCHING LOGIC ---
    const commissionRadio = document.getElementById('commission');
    const photoshootRadio = document.getElementById('photoshoot');
    const commissionForm = document.getElementById('commission-form');
    const photoshootForm = document.getElementById('photoshoot-form');

    commissionRadio.addEventListener('change', () => {
        if (commissionRadio.checked) {
            photoshootForm.style.display = 'none';
            commissionForm.style.display = 'block';
        }
    });

    photoshootRadio.addEventListener('change', () => {
        if (photoshootRadio.checked) {
            commissionForm.style.display = 'none';
            photoshootForm.style.display = 'block';
            renderCalendar(); // Initial calendar render
        }
    });


    // --- CALENDAR LOGIC ---
    const monthYearEl = document.getElementById('month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    const renderCalendar = () => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        calendarGrid.innerHTML = ''; // Clear previous grid

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });

        // Add blank days for the start of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyEl = document.createElement('div');
            calendarGrid.appendChild(emptyEl);
        }

        // Add date cells
        for (let i = 1; i <= daysInMonth; i++) {
            const dateEl = document.createElement('div');
            dateEl.classList.add('calendar-date');
            dateEl.textContent = i;
            
            // Highlight today's date
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dateEl.classList.add('today');
            }

            dateEl.addEventListener('click', () => {
                // Remove selected class from any other date
                const selected = document.querySelector('.calendar-date.selected');
                if (selected) {
                    selected.classList.remove('selected');
                }
                dateEl.classList.add('selected');
            });

            calendarGrid.appendChild(dateEl);
        }
    };
    
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

});