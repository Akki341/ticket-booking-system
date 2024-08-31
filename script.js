let seats = [
    { row: 1, seats: [null, null, null, null, null, null, null] },
    { row: 2, seats: [null, null, null, null, null, null, null] },
    { row: 3, seats: [null, null, null, null, null, null, null] },
    { row: 4, seats: [null, null, null, null, null, null, null] },
    { row: 5, seats: [null, null, null, null, null, null, null] },
    { row: 6, seats: [null, null, null, null, null, null, null] },
    { row: 7, seats: [null, null, null, null, null, null, null] },
    { row: 8, seats: [null, null, null, null, null, null, null] },
    { row: 9, seats: [null, null, null, null, null, null, null] },
    { row: 10, seats: [null, null, null, null, null, null, null] },
    { row: 11, seats: [null, null, null, null, null, null, null] },
    { row: 12, seats: [null, null, null] }
];

function saveSeats() {
    localStorage.setItem('seats', JSON.stringify(seats));
}

function loadSeats() {
    const savedSeats = localStorage.getItem('seats');
    if (savedSeats) {
        seats = JSON.parse(savedSeats);
    }
}

function displaySeats() {
    const seatContainer = document.getElementById('seats');
    seatContainer.innerHTML = '';  // Clear previous display

    seats.forEach((rowObj) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        
        rowObj.seats.forEach((seat, seatIndex) => {
            const seatDiv = document.createElement('div');
            seatDiv.classList.add('seat');
            if (seat === 'booked') {
                seatDiv.classList.add('booked');
            }
            seatDiv.innerText = (rowObj.row - 1) * 7 + seatIndex + 1;
            rowDiv.appendChild(seatDiv);
        });

        seatContainer.appendChild(rowDiv);
    });
}

function bookSeats() {
    let numberOfSeats = parseInt(document.getElementById('seatCount').value);

    if (isNaN(numberOfSeats) || numberOfSeats < 1 || numberOfSeats > 7) {
        alert("You can only book between 1 and 7 seats at a time.");
        return;
    }

    const bookedSeats = [];

    // Attempt to book seats within the same row first
    for (let i = 0; i < seats.length; i++) {
        const row = seats[i].seats;
        let availableSeats = row.reduce((count, seat) => seat === null ? count + 1 : count, 0);

        if (availableSeats >= numberOfSeats) {
            for (let j = 0; j < row.length && numberOfSeats > 0; j++) {
                if (row[j] === null) {
                    row[j] = 'booked';
                    bookedSeats.push(`Row ${i + 1}, Seat ${j + 1}`);
                    numberOfSeats--;
                }
            }
            break;
        }
    }

    // Book remaining seats if not enough seats were found in a single row
    if (numberOfSeats > 0) {
        for (let i = 0; i < seats.length; i++) {
            const row = seats[i].seats;
            for (let j = 0; j < row.length && numberOfSeats > 0; j++) {
                if (row[j] === null) {
                    row[j] = 'booked';
                    bookedSeats.push(`Row ${i + 1}, Seat ${j + 1}`);
                    numberOfSeats--;
                }
            }
        }
    }

    saveSeats(); // Save the updated seat configuration
    localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
    window.location.href = 'confirmation.html';
}

document.addEventListener('DOMContentLoaded', () => {
    loadSeats(); // Load seat data when the page is loaded

    if (document.getElementById('bookedSeatsInfo')) {
        const bookedSeats = JSON.parse(localStorage.getItem('bookedSeats') || '[]');
        document.getElementById('bookedSeatsInfo').innerText = `Booked Seats: ${bookedSeats.join(', ')}`;
    }
    if (document.getElementById('seats')) {
        displaySeats();
    }
});
