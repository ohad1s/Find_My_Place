function handleEnter() {
    const floors = document.getElementById("floors");
    const selectedFloor = floors.options[floors.selectedIndex].value;
    fetch(`/${selectedFloor}`)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            document.getElementById("main-content").innerHTML = data;
        });
}

function handle_home() {
    fetch(`/home`)
        .then(response => response.text())
        .then(data => {
            console.log(data)
            document.getElementById("main-content").innerHTML = data;
        });
}

const click_enter = document.getElementById("enter");
click_enter.addEventListener("click", handleEnter);

const click_home = document.getElementById("home");
click_home.addEventListener("click", handle_home);

