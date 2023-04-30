on_extend();
function on_extend() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const noButton = document.getElementById("no-button");
    const time_to_add = document.getElementById("time_to_add");
    const enterButton = document.getElementById("enter-button");
    noButton.addEventListener("click", () => {
        alert("Thank you!");
        window.location.href = "./index.html";
    });

    enterButton.addEventListener("click", () => {
        const time_val = time_to_add.value;

        fetch('http://localhost:5000/enter_extend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, extend_time: time_val})
        })
            .then(data => {
                alert("Thank you!");
                window.location.href = "./index.html";
            })
            .catch(error => {
                alert("שגיאה! בדוק שוב את השדות");
                console.error(error)
            });
    });
}