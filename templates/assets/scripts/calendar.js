// get calendars
const calendarElements = document.querySelectorAll('[data-calendar]');
// create month names array
const monthNames = [
    'January', 'February', 'March', 'April', 
    'May','June','July','August',
    'September','October','November','December'
];

// get today's date
const today = new Date
// get today's date in a day-month-year format
const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
// get today as selected date
let selected = today;

// check if calendar elements exist
if ( calendarElements.length > 0 ) {
    // loop thorugh calendars
    calendarElements.forEach(calendarEl => {
        // create calendar header
        createCalendarHeader(calendarEl);
        // create calendar days
        createCalendarDaysOfWeek(calendarEl);
        // create calendar body
        createCalendarBody(calendarEl);
        // create calendar
        createCalendar(calendarEl);

        // add event listeners for prev month and next month buttons
        const prevMonthBtn = calendarEl.querySelector('.prev-month');
        const nextMonthBtn = calendarEl.querySelector('.next-month');
        prevMonthBtn.addEventListener('click', getPrevMonth.bind(calendarEl));
        nextMonthBtn.addEventListener('click', getNextMonth.bind(calendarEl));
    });
}

// create calendar header
function createCalendarHeader(calendarEl) {
    // create calendar header element
    const calendarHeader = document.createElement('div');
    calendarHeader.classList.add('calendar__header');
    // creater calendar header top element
    const calendarHeaderTop = document.createElement('div');
    calendarHeaderTop.classList.add('calendar__header_top');
    calendarHeaderTop.innerHTML = `
    <button class="btn prev-month">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.01 77.24">
        <defs><style>.cls-1{fill:#fff;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M7.38,49.07l26,26a7.39,7.39,0,0,0,10.44,0h0a7.37,7.37,0,0,0,0-10.44l-26-26,26-26a7.38,7.38,0,0,0,0-10.45h0a7.39,7.39,0,0,0-10.44,0l-26,26L2.16,33.4a7.39,7.39,0,0,0,0,10.44Z"/></g></g>
    </svg>
    </button>
    <h2 class="current-month">${selected.getMonth() + 1} </h2>
    <h2 class="current-year">${selected.getFullYear()}</h2> 
    <button class="btn next-month">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.01 77.24">
            <defs><style>.cls-1{fill:#fff;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M38.62,28.18l-26-26a7.4,7.4,0,0,0-10.45,0h0a7.4,7.4,0,0,0,0,10.45l26,26-26,26a7.39,7.39,0,0,0,0,10.44h0a7.4,7.4,0,0,0,10.45,0l26-26,5.22-5.23a7.37,7.37,0,0,0,0-10.44Z"/></g></g>
        </svg>
    </button>
    `;
    // append calendar header top to calendar header
    calendarHeader.appendChild(calendarHeaderTop);
    // append calendar header to calendar
    calendarEl.appendChild(calendarHeader);
}

// create calendar days
function createCalendarDaysOfWeek(calendarEl) {
    // create calendar days element
    const calendarDays = document.createElement('div');
    calendarDays.classList.add('calendar__header_days', 'row');
    calendarDays.innerHTML = `
        <div class="column">Mon</div>
        <div class="column">Tue</div>
        <div class="column">Wed</div>
        <div class="column">Thu</div>
        <div class="column">Fri</div>
        <div class="column">Sat</div>
        <div class="column">Sun</div>
    `;
    // append days to calendar header
    calendarEl.querySelector('.calendar__header').appendChild(calendarDays);
}

// create calendar body
function createCalendarBody(calendarEl) {
    // create calendar body element
    const calendarBody = document.createElement('div');
    calendarBody.classList.add('calendar__body');
    // append calendar body to calendar
    calendarEl.appendChild(calendarBody);
}

// create calendar
function createCalendar(calendarEl) {
    // get calendar body element
    // remove all content from calendar body
    const calendarBody = calendarEl.querySelector('.calendar__body');
    calendarBody.innerHTML = ' ';

    // get the last date of the month
    // get the previous month's last date
    const date = new Date(selected.getFullYear(), selected.getMonth() + 1, 0);
    const prevDate = new Date(selected.getFullYear(), selected.getMonth(), 0);

    // get calendar header element
    // change the current month in the header based on the selected date
    const calendarHeader = calendarEl.querySelector('.calendar__header');
    calendarHeader.querySelector('.current-month').innerHTML = `${monthNames[selected.getMonth()]}`;
    calendarHeader.querySelector('.current-year').innerHTML = `${selected.getFullYear()}`;

    // get number of days in selected month
    // get the first days of the month - Mon, Tue, etc...
    //set days of the week in order - 0 ist Sunday
    const daysInMonth = date.getDate();
    const firstDayInMonth = new Date(selected.getFullYear(), selected.getMonth(), 1).getDay();
    const daysInWeek = [1, 2, 3, 4, 5, 6, 0];

    // set the number of rows and columns
    const rows = 6; // there can be max. 6 weeks in month, if month has 31 days and 1st day is on Sunday then the last 2 days are in 6th week
    const columns = 7; // because there are 7 days per week

    // get starting point - from which day should current month start in the row (in which column)
    // get previous month starting point - if current month start on wednesday and prev month has 30 days the this should be 29
    let startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
    let prevStartingDay = prevDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;

    // set the counter for the current month
    // set the counter for the next month
    let x = 1;
    let nextMonthStart = 1;

    // loop through rows
    for (let i = 0; i < rows; i++) {
        // create row element
        const row = document.createElement('div');
        row.classList.add('row');

        // loop through columns
        for (let j = 1; j < columns + 1; j++) {
            // create row element
            const column = document.createElement('div');
            column.classList.add('box');

            // create element for number
            // append number element to column
            const numberEl = document.createElement('span');
            column.appendChild(numberEl);

            // check if inside first row
            if ( i === 0 ) {
                // check if current column is less than current month starting point
                if (j < startingPoint ) { // in this case populate last month days
                // add class in-prev-month, set date to data-date attribute
                // insert the day inside column number element
                // increase prevStartingDay by 1
                column.classList.add('in-prev-month');
                column.setAttribute('data-date', `${prevStartingDay}-${selected.getMonth() === 0 ? 12 : selected.getMonth()}-${selected.getMonth() === 0 ? selected.getFullYear() - 1 : selected.getFullYear()}`);
                numberEl.innerHTML = prevStartingDay;
                prevStartingDay++;
                } else { // if inside current month
                    // set date to data-date attribute
                    // insert the day inside column number element
                    // increase current month counter by 1
                    column.setAttribute('data-date', `${x}-${selected.getMonth() + 1}-${selected.getFullYear()}`);
                    numberEl.innerHTML = x;
                    x++;
                }
            } else if ( i > 0 && x < daysInMonth + 1 ) { //  check if in current month range after first row
                //set date to data-date attribute
                // insert the day inside column number element
                // increase current month by 1
                column.setAttribute('data-date', `${x}-${selected.getMonth() + 1}-${selected.getFullYear()}`);
                numberEl.innerHTML = x;
                x++;
            } else { // in next month
                // add class in-next-month, insert the day inside column number element
                // set date to data-date attribute
                // increase next month counter by 1
                column.classList.add('in-next-month');
                numberEl.innerHTML = nextMonthStart;
                column.setAttribute('data-date', `${nextMonthStart}-${selected.getMonth() + 2 === 13 ? 1 : selected.getMonth() + 2}-${selected.getMonth() + 2 === 13 ? selected.getFullYear() + 1 : selected.getFullYear()}`);
                nextMonthStart++;
            }

            // check if today's date and add today class to column
            if ( column.dataset.date === todayFormatted ) {
                column.classList.add('today');
            }

            // and click event type to column
            column.addEventListener('click', (e) => {
                console.log(column.dataset.date);
            });

            // append column to row
            row.appendChild(column);
        }

        // append row to calendar body
        calendarBody.appendChild(row);
    }
}

// get prev month
function getPrevMonth(e) {
    e.preventDefault();
    selected = new Date(selected.getFullYear(), selected.getMonth() - 1, 1);
    createCalendar(this);
}

// get next month
function getNextMonth(e) {
    e.preventDefault();
    selected = new Date(selected.getFullYear(), selected.getMonth() + 1, 1);
    createCalendar(this);
}