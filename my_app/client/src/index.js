function handleEnter() {
    const floors = document.getElementById("floors");
    const selectedFloor = floors.options[floors.selectedIndex].value;
    fetch(`/${selectedFloor}`)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            document.getElementById("main-content").innerHTML = data;
            registerEventListeners(); // register event listeners after changing HTML content
        });
}

function handle_home() {
    fetch(`/home`)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            document.getElementById("main-content").innerHTML = data;
            registerEventListeners(); // register event listeners after changing HTML content
        });
}

function registerEventListeners() {
    const click_enter = document.getElementById("enter");
    click_enter.addEventListener("click", handleEnter);

    const click_home = document.getElementById("home");
    click_home.addEventListener("click", handle_home);

    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const maxSeats = parseInt(row.cells[2].textContent);
        const seatsTaken = parseInt(row.cells[1].textContent);
        if (maxSeats === seatsTaken) {
            row.classList.remove('table-empty');
            row.classList.add('table-full');
        } else {
            row.classList.remove('table-full');
            row.classList.add('table-empty');
        }
    });
}

// Call registerEventListeners() on page load
registerEventListeners();
