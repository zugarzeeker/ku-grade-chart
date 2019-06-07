const gpaRegex = /cum. G.P.A. = (.\...)&nbsp/gm;
const creditRegex = /Credit = ([^<]*)/gm;
const body = document.body.innerHTML;

const gpaList = body.match(gpaRegex).map(s => s.replace('cum. G.P.A. = ', '').replace('&nbsp', ''));
const creditList = body.match(creditRegex).map(s => s.replace('Credit = ', ''));

const semesterRaws = document.getElementsByClassName('head_sm');
const semesters = [];
const formatTitle = _title => {
  const title = _title.trim().toLowerCase();
  const year = title.split(' ').pop();
  const semesterNum = (() => {
    if (title.includes('first')) {
      return '01';
    }
    if (title.includes('second')) {
      return '02';
    }
    if (title.includes('summer')) {
      return 'sum';
    }
  })();
  return `${year}/${semesterNum}`;
};
for (let i = 0; i < semesterRaws.length; i++) {
  semesters.push({
    title: formatTitle(semesterRaws[i].innerHTML),
    gpaCum: gpaList[i],
    credit: creditList[i * 2 - 1],
  });
}
// const semesters = [
//   { title: '2015/01', gpaCum: '4.00', credit: 15 },
//   { title: '2015/02', gpaCum: '3.80', credit: 15 },
//   { title: '2016/01', gpaCum: '3.40', credit: 15 },
//   { title: '2016/02', gpaCum: '3.20', credit: 15 },
//   { title: '2017/01', gpaCum: '3.00', credit: 15 },
//   { title: '2017/02', gpaCum: '2.80', credit: 15 },
//   { title: '2018/01', gpaCum: '2.50', credit: 15 },
//   { title: '2018/02', gpaCum: '2.00', credit: 140 },
// ];

var border = '===============================\n';

var chart = document.createElement('tr');
var canvas = document.createElement('canvas');
canvas.id = 'myChart';
canvas.width = 400;
canvas.height = 400;
canvas.style = 'width: 100%;';

var table = document.createElement('table');
table.border = 0;
table.width = '100%';
table.cellspacing = 0;
table.className = 'table';
table.style = 'border: solid 1px black; width:100%;';
table.appendChild(canvas);
var td = document.createElement('td');
table.appendChild(td);
chart.appendChild(table);

var normalTables = document.getElementsByTagName('tbody')[5].getElementsByTagName('table');
normalTables[1].parentElement.appendChild(chart);
normalTables[0].style = 'border-left: solid 1px black;';
document.getElementsByTagName('table')[5].style = 'border-bottom: none;';
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.3/Chart.bundle.min.js';
document.body.appendChild(js);
const lastSemester = semesters[semesters.length - 1];
lastSemester.gpaCum = (+lastSemester.gpaCum).toFixed(2);

js.onload = function() {
  var canvas = document.getElementById('myChart');
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: semesters.map(s => s.title),
      datasets: [
        // {
        //   type: 'line',
        //   backgroundColor: 'transparent',
        //   borderColor: '#333',
        //   data: semesters.map(s => s.gpaCum),
        // },
        {
          type: 'bar',
          label: '# of Cumulative GPA (by ZugarZeeker @Cleverse)',
          backgroundColor: [
            '#14ACDE',
            '#06A199',
            '#32A42B',
            '#B4CB01',
            '#FFE401',
            '#EA640B',
            '#D7031C',
            '#E2006C',
            '#A90C5D',
            '#7F378B',
          ],
          borderColor: 'black',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: semesters.map(s => s.gpaCum),
        },
      ],
    },
    options: {
      tooltips: {
        enabled: false,
      },
      animation: {
        duration: 1,
        onComplete: function() {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;

          ctx.font = Chart.helpers.fontString(
            Chart.defaults.global.defaultFontSize,
            Chart.defaults.global.defaultFontStyle,
            Chart.defaults.global.defaultFontFamily,
          );
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function(dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function(bar, index) {
              var data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
            });
          });
        },
      },
      title: {
        display: true,
        position: 'bottom',
        text: `cum. G.P.A. = ${lastSemester.gpaCum} credit = ${lastSemester.credit}`,
      },
      scales: {
        yAxes: [
          {
            callback: label => (label === '4.5' ? '' : label),
            ticks: {
              max: 4.5,
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};
