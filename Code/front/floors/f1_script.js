SERVER = "http://localhost:5000"

function generatePage(data) {
    // Create the table HTML content
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
    const photoHtml = '<div><img src="#" alt="A photo"></div>\n';

    // Create the "Return" button HTML content
    const buttonHtml = '<div><button class="return-button" onclick="window.location.href=\'../index.html\';">Return</button></div>\n';

    // Combine the table, photo, and button HTML into a single string
    const html = tableHtml + photoHtml + buttonHtml;

    // Return the HTML content as a string
    return html;
}
fetchTemplate("f1")
function fetchTemplate(pageName) {
    fetch(SERVER + `/${pageName}`)
        .then(response => response.json())
        .then(data => {
            const html = generatePage(data);
            document.body.innerHTML = html;
        })
        .catch(error => console.error(error));
}
