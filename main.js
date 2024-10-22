const inputs = document.querySelectorAll(".inputs input");
let btn = document.getElementById("btn");
let dates = document.querySelector(".dates");

let mustDay = document.querySelector(".mustDay");
let mustMonth = document.querySelector(".mustMonth");
let mustYear = document.querySelector(".mustYear");

let reqDay = document.querySelector(".reqDay");
let reqMonth = document.querySelector(".reqMonth");
let reqYear = document.querySelector(".reqYear");

let day = document.querySelector(".day");
let month = document.querySelector(".month");
let year = document.querySelector(".year");

let spYear = document.getElementById("spYear");
let spMonth = document.getElementById("spMonth");
let spDays = document.getElementById("spDays");
let check = "true";

inputs.forEach(function(inp) {
    inp.onfocus = function() {
        inp.style.borderColor = "hsl(259, 100%, 65%)";
    };
    inp.onblur = function() {
        inp.style.borderColor = "";
    };
});

btn.onclick = function(){
    if(check === "true"){
        // Resetting previous error messages
        reqDay.style.display="none";
        reqMonth.style.display="none";
        reqYear.style.display="none";
        mustDay.style.display="none";
        mustMonth.style.display="none";
        mustYear.style.display="none";
        
        if(day.value == "" || month.value == "" || year.value == ""){
            if(day.value == "") reqDay.style.display="inline";
            if(month.value == "") reqMonth.style.display="inline";
            if(year.value == "") reqYear.style.display="inline";
            dates.style.color = "hsl(0, 100%, 67%)";
            day.style.borderColor = "hsl(0, 100%, 67%)";
            month.style.borderColor = "hsl(0, 100%, 67%)";
            year.style.borderColor = "hsl(0, 100%, 67%)";
        }

        if (day.value !== "" && (isNaN(day.value) || day.value > 31)) {
            mustDay.style.display = "inline";
            return;
        }
        if (month.value !== "" && (isNaN(month.value) || month.value > 12)) {
            mustMonth.style.display = "inline";
            return;
        }
        if (year.value !== "" && (isNaN(year.value) || year.value > new Date().getFullYear())) {
            mustYear.style.display = "inline";
            return;
        }

        // Call the function to calculate age
        calculateAge();
    } else {
        check = "false";
    }
}

// Function to calculate age
function calculateAge() {
    if (!day || !month || !year) {
        return; 
    }

    const dayValue = parseInt(day.value);
    const monthValue = parseInt(month.value);
    const yearValue = parseInt(year.value);

    if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue) || 
        dayValue < 1 || dayValue > 31 || 
        monthValue < 1 || monthValue > 12 || 
        yearValue < 1900) {
        console.log("not valid");
        return;
    }

    const birthDate = new Date(yearValue, monthValue - 1, dayValue);
    const today = new Date();
    
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();
    
    // Adjust the values if necessary
    if (ageDays < 0) {
        ageMonths--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += lastMonth.getDate();
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Update the displayed age
    const spYear = document.getElementById('spYear'); 
    const spMonth = document.getElementById('spMonth');
    const spDays = document.getElementById('spDays');

    spYear.textContent = ageYears;
    spMonth.textContent = ageMonths;
    spDays.textContent = ageDays;
}