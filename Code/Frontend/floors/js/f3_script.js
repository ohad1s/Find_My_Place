SERVER = "http://localhost:5000"

function generatePage(data) {
    let title = '<h1 class="title">Floor 3</h1>'

    let tableHtml = '';
    const numCardsPerRow = 6; // Change this to the desired number of cards per row
    for (let i = 0; i < data.length; i++) {
        const table = data[i];
        const cardHtml = `
          <div class="col-md-2 mb-3">
           <div class="card ${table.CurrentStudents >= 0 && table.CurrentStudents < table.MaxStudents / 2 ? 'bg-success' : (table.CurrentStudents >= table.MaxStudents / 2 && table.CurrentStudents < table.MaxStudents ? 'bg-warning' : 'bg-danger')}">
            <div class="card-body">
              <h5 class="card-title">Table ${table.TableNum}</h5>
              <p class="card-text">Current students: ${table.CurrentStudents}</p>
              <p class="card-text">Max students: ${table.MaxStudents}</p>
            </div>
          </div>
        </div>`;
        if (i % numCardsPerRow === 0) {
            tableHtml += '<div class="row">';
        }
        tableHtml += cardHtml;
        if ((i + 1) % numCardsPerRow === 0 || i === data.length - 1) {
            tableHtml += '</div>';
        }
    }

    // Create the photo HTML content
    const photoHtml = '<div><img src="../img/f3.jpeg" alt="A photo"></div>\n';

    // Create the "Return" button HTML content
    const buttonHtml = '<div class="navbar"><button class="home-button" onclick="window.location.href=\'Code/Frontend/html/index.html\';">Home</button></div>\n';

    // Combine the table, photo, and button HTML into a single string
    const html = buttonHtml + title + tableHtml + photoHtml;

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