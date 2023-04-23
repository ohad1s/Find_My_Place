// function handleEnter() {
//     const floors = document.getElementById("floors");
//     const selectedFloor = floors.options[floors.selectedIndex].value;
//     fetch(`/${selectedFloor}`)
//         .then(response => response.text())
//         .then(data => {
//             console.log(data)
//             document.getElementById("main-content").innerHTML = data;
//             registerEventListeners1(); // register event listeners after changing HTML content
//             // get request from server ->> data from server
//         });
// }

// function handleEnter() {
//     const floors = document.getElementById("floors");
//     const selectedFloor = floors.options[floors.selectedIndex].value;
//     fetch(`/${selectedFloor}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             const t_num = data.data[0].TableNum;
//             const curr = data.data[0].CurrentStudents;
//             const max = data.data[0].MaxStudents;
//             console.log(t_num,curr,max);
//         });
// }

function handleEnter() {
    const floors = document.getElementById("floors");
    const selectedFloor = floors.options[floors.selectedIndex].value;
    fetch(`/${selectedFloor}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const table = document.getElementById("table-data");
            console.log(table);
            // clear the existing rows from the table
            table.innerHTML="";
            // loop over the data array and create a new row for each object
            data.data.forEach(obj => {
                const row = table.insertRow();
                // set the values of the cells in the row to the corresponding properties of the object
                row.insertCell().textContent = obj.TableNum;
                row.insertCell().textContent = obj.CurrentStudents;
                row.insertCell().textContent = obj.MaxStudents;
            });
        });
}



function handle_home() {
    fetch(`/home`)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            document.getElementById("main-content").innerHTML = data;
            registerEventListeners2(); // register event listeners after changing HTML content
        });
}

function color_table() {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const maxSeats = parseInt(row.cells[2].textContent);
        const seatsTaken = parseInt(row.cells[1].textContent);
        if (maxSeats === seatsTaken) {
            console.log("Hello, world!");
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
    color_table();
}

function registerEventListeners2() {
    const click_enter = document.getElementById("enter");
    click_enter.addEventListener("click", handleEnter);
}

// Call registerEventListeners() on page load
registerEventListeners1();
registerEventListeners2();


