function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function validateId(id) {
    const regex = /^\d{9}$/;
    return regex.test(id);
}
function on_scanning() {
    const urlParams = new URLSearchParams(window.location.search);
    const floorId = urlParams.get('floor_id');
    const tableId = urlParams.get('table_id');
    const _id = document.getElementById('ID').value;
    const _email = document.getElementById('email').value;
    const _time = document.getElementById('time').value;
    if (!validateId(_id)) {
        alert("תעודת זהות אינה תקינה!");
    } else if (!validateEmail(_email)) {
        alert("מייל לא תקין!");
    } else if (time === null) {
        alert("נא לא להשאיר שדות ריקים!");
    } else {
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
            .catch(error => {
                alert("שגיאה! בדוק שוב את השדות");
                console.error(error)
            });
    }
}