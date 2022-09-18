const daysSpending = document.querySelector('.days-spending');

console.log(daysSpending)


const isCurrentDay = function (dayname = 'friday') {
  const today = new Date().getDay();
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return daysOfWeek[today] == dayname
}




const formatMoneyToDollars = function (amt) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "USD"}).format(amt);
}

function generateChartItem(item) {

  return `
  <div class="container-spend">
  <p class="amount">${formatMoneyToDollars(item.amount)}</p>
      <div class="height-column ${isCurrentDay(item.day) == true ? "currentDay" : ""}" style="height: ${item.amount*2}px"></div>
      <p class="days">${item.day}</p>
  </div>
  `;
}

async function fetchChartData() {
  const chartFetch = await fetch('data.json');
  const chartData = await chartFetch.json();
  daysSpending.innerHTML = chartData.map(function (i) {
      return generateChartItem(i);
    }).join('')
}

fetchChartData()