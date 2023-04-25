function handleEnter() {
    document.getElementById("first").hidden = true
    document.getElementById("second").hidden = false
    document.getElementById("third").hidden = true
    const floors = document.getElementById("floors");
    console.log("cii")
    const selectedFloor = floors.options[floors.selectedIndex].value;
    document.getElementById("floor title").innerHTML = "Floor " + selectedFloor[1]
    fetch(`/${selectedFloor}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("table-data");
            // clear the existing rows from the table
            table.innerHTML = "";
            // loop over the data array and create a new row for each object
            data.data.forEach(obj => {
                const row = table.insertRow();
                // set the values of the cells in the row to the corresponding properties of the object
                row.insertCell().textContent = obj.TableNum;
                row.insertCell().textContent = obj.CurrentStudents;
                row.insertCell().textContent = obj.MaxStudents;
            });
            color_table();
        });
}


function handle_home() {
    document.getElementById("first").hidden = false
    document.getElementById("second").hidden = true
    document.getElementById("third").hidden = true
    registerEventListeners2(); // register event listeners after changing HTML content
}


function color_table() {
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

function registerEventListeners1() {
    const click_home = document.getElementById("home");
    click_home.addEventListener("click", handle_home);
}

function registerEventListeners2() {
    const click_enter = document.getElementById("enter");
    click_enter.addEventListener("click", handleEnter);
}


function registerEventListeners3(floorId, tableId) {
    document.getElementById('submit-button').addEventListener('click', function (event) {
        event.preventDefault(); // prevent default form submission

        const id = document.getElementById('ID').value;
        const email = document.getElementById('email').value;
        const time = document.getElementById('time').value;

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({floor_id: floorId, table_id: tableId, id: id, email: email, time: time})
        })
            // .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    });
}


function OnScanning() {
    document.getElementById("first").hidden = true
    document.getElementById("second").hidden = true
    document.getElementById("third").hidden = false
    // Retrieve floorId and tableId from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const floorId = urlParams.get('floor_id');
    const tableId = urlParams.get('table_id');
    registerEventListeners3(floorId, tableId);
}

// Call registerEventListeners() on page load
registerEventListeners1();
registerEventListeners2();
if (window.location.pathname === '/scan') {
    OnScanning();
}





