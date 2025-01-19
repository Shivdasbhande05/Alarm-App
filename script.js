const hour = document.getElementById("hh");
const min = document.getElementById("mm");
const sec = document.getElementById("ss");
const setTimeBtn = document.getElementById("set-button");
const currenTimersTable = document.querySelector(".running-timers");

const audioFile = new Audio("alarm-clock-90867.mp3"); // adding audio file

const clear = () => {
    hour.value = "";
    min.value = "";
    sec.value = "";
}
// it will create new row element and it will be added to table element
const createNewRow = (h,m,s) => {
    const newRow = document.createElement("tr");

    // we set new row element as set-time box model & it will take CSS as it.
    newRow.innerHTML = `<div class="set-time">
			<p>Time Left:</p>
			<div class="time-left">${h}:${m}:${s}</div>
			<button type="submit" id="remove-button">Delete</button>
		</div>`

        clear();

        var deleteBtn = newRow.querySelector("#remove-button");

        deleteBtn.addEventListener("click", () => {
            currenTimersTable.removeChild(newRow);
            audioFile.pause();
        });

        currenTimersTable.appendChild(newRow);

        startTimer(newRow,h,m,s);
}

const startTimer = (row,h,m,s) => {
    let totalSeconds = (h*3600) +( m*60)+ s;
    const timeDisplay = row.querySelector(".time-left");

    const interval = setInterval(() => {
        if(totalSeconds < 0){
            clearInterval(interval);
            timeDisplay.textContent = "Time is Up!";
            audioFile.play();
            return;
        }

        totalSeconds--;
        const hours = String(Math.floor(totalSeconds/3600)).padStart(2,"0");
        const minutes = String(Math.floor(totalSeconds%3600/60)).padStart(2,"0");
        const seconds = String(Math.floor(totalSeconds%3600)).padStart(2,"0");

        timeDisplay = `${hours}:${minutes}:${seconds}`;
    },1000);

} 


const newTableData =  () => {
    const h = parseInt(hour.value) || 0;
    const m = parseInt(min.value) || 0;
    const s = parseInt(sec.value) || 0;
    if( hour.value > 24 || min.value > 59 || sec.value > 59){
        alert("Enter Valid Time");
        clear();
    }
    // else if (hour.value === "" || min.value ==="" || sec.value===""){
    //     hour.value = "00";
    //     min.value = "00";
    //     sec.value = "00";
    //     createNewRow();
    // }
    else {
        createNewRow(h,m,s);
    }
    
}

setTimeBtn.addEventListener("click", newTableData);
