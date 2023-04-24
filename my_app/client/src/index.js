
function handleEnter() {
    document.getElementById("first").hidden = true
    document.getElementById("second").hidden = false
    const floors = document.getElementById("floors");
    console.log("cii")
    const selectedFloor = floors.options[floors.selectedIndex].value;
    document.getElementById("floor title").innerHTML= "Floor " + selectedFloor[1]
        fetch(`/${selectedFloor}`)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("table-data");
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
    color_table()
}




function handle_home() {
    document.getElementById("first").hidden = false
    document.getElementById("second").hidden = true
                registerEventListeners2(); // register event listeners after changing HTML content
}


function color_table() {
    console.log("haaaaaaaaaa")
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
    console.log("pppppppppppppppppppppppppppppppppppppppp")
}

function registerEventListeners1() {
    const click_home = document.getElementById("home");
    click_home.addEventListener("click", handle_home);
}

function registerEventListeners2() {
    const click_enter = document.getElementById("enter");
    click_enter.addEventListener("click", handleEnter);
}

// Call registerEventListeners() on page load
registerEventListeners1();
registerEventListeners2();


