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

// function handleEnter() {
//     const floors = document.getElementById("floors");
//     const selectedFloor = floors.options[floors.selectedIndex].value;
//     fetch(`/${selectedFloor}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             const table = document.getElementById("table-data");
//             console.log(table);
//             // clear the existing rows from the table
//             table.innerHTML="";
//             // loop over the data array and create a new row for each object
//             data.data.forEach(obj => {
//                 const row = table.insertRow();
//                 // set the values of the cells in the row to the corresponding properties of the object
//                 row.insertCell().textContent = obj.TableNum;
//                 row.insertCell().textContent = obj.CurrentStudents;
//                 row.insertCell().textContent = obj.MaxStudents;
//             });
//         });
// }


function handleEnter() {
    const floors = document.getElementById("floors");
    const selectedFloor = floors.options[floors.selectedIndex].value;

    // make a fetch request to the server
    fetch(`/${selectedFloor}`)
        .then(response => response.json())
        .then(data => {
            // modify the HTML content based on the response data
            const newHTML=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Floor 1</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            max-width: 800px;
            margin: auto;
        }
        th, td {
            text-align: center;
            padding: 8px;
        }
        th {
            background-color: #2d6187;
            color: white;
        }
        td {
            background-color: #e4e4e4;
        }
        tr.table-full td {
            background-color: #ff0000;
            color: white;
        }
        tr.table-empty td {
            background-color: #00ff00;
        }
        img {
            display: block;
            max-width: 800px;
            margin: auto;
            padding-top: 20px;
        }
        h1 {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            text-align: center;
            margin: 0 auto;
            display: table;
        }
    </style>
</head>
<body>
<div id="sidebar">
    <link rel="stylesheet" href="css/sidebar.css">
    <button type="button" class="btn btn-primary" id="home"
            style="width: 50%;margin-top: 10px;margin-left: 20px; font-family: 'Comic Sans MS', cursive, sans-serif;">
        Home
    </button>
</div>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<h1>Floor ${selectedFloor[1]}</h1>
<br>
<table id="table">
    <thead>
    <tr>
        <th>Table Number</th>
        <th>Seats Taken</th>
        <th>Max Seats</th>
    </tr>
    </thead>
    <tbody id="table-data">
    </tbody>
</table>
<img src="../pics/floor${selectedFloor[1]}_map.png" alt="Floor ${selectedFloor} Map">
<br>

<script>
    var scriptElement = document.createElement('script');
    scriptElement.src = '../public/scripts/floor_script.js';
    document.head.appendChild(scriptElement);
</script>
</body>
</html>
`;
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(newHTML, "text/html");
            // get the new table element and clear its existing rows
            const newTable = newDoc.getElementById("table-data");
            newTable.innerHTML = "";

            // loop over the data array and create a new row for each object
            data.data.forEach(obj => {
                const row = newTable.insertRow();
                // set the values of the cells in the row to the corresponding properties of the object
                row.insertCell().textContent = obj.TableNum;
                row.insertCell().textContent = obj.CurrentStudents;
                row.insertCell().textContent = obj.MaxStudents;
            });

            // replace the current page with the new HTML page
            document.open();
            document.write(newHTML);
            document.close();
        });
}




function handle_home() {
    fetch('/home')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data["1"] === "home") {
                document.getElementById("main-content").innerHTML = "<h1>Welcome to the home page</h1>";
                registerEventListeners2(); // register event listeners after changing HTML content
            }
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


