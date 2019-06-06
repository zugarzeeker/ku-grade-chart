var typeGrade = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'W', 'P', 'N'];
var valueOfGrade = [4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.0, undefined, undefined];
var countGrade = {};
typeGrade.forEach(function(x) {
  countGrade[x] = 0;
});

var cells = document.getElementsByClassName('tr');
for (var i = 0, size = cells.length; i < size; i++) {
  var text = cells[i].innerHTML;
  if(i % 4 === 2) {
    countGrade[text] += parseInt(cells[i+1].innerHTML);
  }
}

var sumOfMul = typeGrade.reduce((prev, curr, index) => {
  if (valueOfGrade[index]) return prev + countGrade[curr]*valueOfGrade[index];
  else return prev;
}, 0);
var creditAll = typeGrade.reduce((prev, curr, index) => {
  if (valueOfGrade[index]) return prev + countGrade[curr];
  else return prev;
}, 0);
var gpa = sumOfMul / creditAll;

var border = '===============================\n';

var chart = document.createElement('tr');
var canvas = document.createElement("canvas");
canvas.id = "myChart";
canvas.width = 400;
canvas.height = 400;
canvas.style = "width: 100%;"

var table = document.createElement('table');
table.border = 0; table.width = "100%"; table.cellspacing=0; table.className="table";
table.style="border: solid 1px black; width:100%;";
table.appendChild(canvas);
var td = document.createElement('td');
table.appendChild(td);
chart.appendChild(table);

var normalTables = document.getElementsByTagName('tbody')[5].getElementsByTagName('table');
normalTables[1].parentElement.appendChild(chart);
normalTables[0].style = "border-left: solid 1px black;";
document.getElementsByTagName('table')[5].style = "border-bottom: none;";
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.3/Chart.bundle.min.js";
document.body.appendChild(js);

js.onload = function() {
  var canvas = document.getElementById("myChart");
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: typeGrade,
      datasets: [{
        label: '# of Credit',
        backgroundColor: ['#14ACDE', '#06A199', '#32A42B','#B4CB01', '#FFE401', '#EA640B', '#D7031C', '#E2006C', '#A90C5D', '#7F378B'],
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: typeGrade.map(function(grade) {return countGrade[grade]})
      }]
    },
    options: {
      title: {
        display: true,
        position: 'bottom',
        text: `cum. G.P.A. = ${gpa.toFixed(2)} credit = ${creditAll}`
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}
