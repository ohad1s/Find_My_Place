SERVER = "http://localhost:5000"

function generatePage(data) {
    // Create the table HTML content
    let title = '<h1 class="title">Floor 3</h1>'
    let tableHtml = '<table class="cool-table">\n' +
        '<thead>\n' +
        '<tr><th>Table Number</th><th>Current Students</th><th>Max Students</th></tr>\n' +
        '</thead>\n' +
        '<tbody>\n';

    for (let i = 0; i < data.length; i++) {
        const table = data[i];
        const rowHtml = `<tr><td>${table.TableNum}</td><td>${table.CurrentStudents}</td><td>${table.MaxStudents}</td></tr>\n`;
        tableHtml += rowHtml;
    }

    tableHtml += '</tbody>\n</table>\n';

    // Create the photo HTML content
    const photoHtml = '<div><img src="../img/f3.jpeg" alt="A photo"></div>\n';

    // Create the "Return" button HTML content
    const buttonHtml = '<div class="sidenav"><button class="home-button" onclick="window.location.href=\'../index.html\';">Home</button></div>\n';

    // Combine the table, photo, and button HTML into a single string
    const html = title + tableHtml + photoHtml + buttonHtml;

    // Return the HTML content as a string
    return html;
}
fetchTemplate("f3")
function fetchTemplate(pageName) {
    fetch(SERVER + `/${pageName}`)
        .then(response => response.json())
        .then(data => {
            const html = generatePage(data);
            document.body.innerHTML = html;
            color_table();
        })
        .catch(error => console.error(error));
}
function color_table() {
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const maxSeats = parseInt(row.cells[2].textContent);
        const seatsTaken = parseInt(row.cells[1].textContent);
        if (maxSeats <= seatsTaken) {
            row.classList.remove('table-empty');
            row.classList.add('table-full');
        } else {
            row.classList.remove('table-full');
            row.classList.add('table-empty');
        }
    });
}
