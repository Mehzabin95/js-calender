const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

// const selectedDateDisplay = document.createElement("div");
// selectedDateDisplay.classList.add("selected-date-display");
// document.body.appendChild(selectedDateDisplay);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function showSelectedDate(e, selectedDate) {
  // Remove "selected-date" class from previously selected date
  const prevSelectedDate = document.querySelector(".selected-date");
  if (prevSelectedDate) {
    prevSelectedDate.classList.remove("selected-date");
  }

  // Add "selected-date" class to the clicked date
  e.target.classList.add("selected-date");

  const selectedDateText = `${months[month]} ${selectedDate}, ${year}`;
  const detailsElement = document.querySelector("#details p");

  detailsElement.textContent = ` ${selectedDateText}`;
}

function handleTimeClick(e, selectedTime) {
  // Remove "selected-date" class from previously selected date
  const prevSelectedTime = document.querySelector(".selected-time");
  if (prevSelectedTime) {
    prevSelectedTime.classList.remove("selected-time");
  }
  // Update the UI to display the selected time
  e.target.classList.add("selected-time");
  const selectedDateDisplay = document.querySelector("#details span");
  selectedDateDisplay.textContent = `${selectedTime}`;
}

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? 'class = "today" '
        : ' class = "cursor-pointer" ';

    datesHtml += `<li ${className} onclick="showSelectedDate(event, ${i})" >${i}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());

    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
    showSelectedDate(date.getDate());
  });
});

renderCalendar();
