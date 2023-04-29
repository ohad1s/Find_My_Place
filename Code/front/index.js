SERVER = "http://localhost:5000"

function goToPage() {
    var selectBox = document.getElementById("selectOption");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    console.log(selectedValue);
    if (selectedValue) {
        switch(selectedValue) {
            case "f1":
                window.location.href = "./floors/f1_page.html";
                break;
            case "f2":
                window.location.href = "./floors/f2_page.html";
                break;
            case "f3":
                window.location.href = "./floors/f3_page.html";
                break;
            case "f4":
                window.location.href = "./floors/f4_page.html";
                break;
            default:
                console.log("Invalid option selected");
                break;
        }
    }
}



