function on_scanning() {
    const urlParams = new URLSearchParams(window.location.search);
    const floorId = urlParams.get('floor_id');
    const tableId = urlParams.get('table_id');
    const _id = document.getElementById('ID').value;
    const _email = document.getElementById('email').value;
    const _time = document.getElementById('time').value;
    console.log(`f ${floorId}, f ${tableId},f ${_id},f ${_email},f ${_time}`);
    fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({floor_id: floorId, table_id: tableId, id: _id, email: _email, time: _time})
    })
        // .then(response => response.json())
        .then(data => {
            alert("Thank you!");
            window.location.href = "./index.html";
        })
        .catch(error => console.error(error));
}