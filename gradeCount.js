var typeGrade = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F', 'W', 'P'];
var countGrade = {};
typeGrade.forEach(function(x) {
	countGrade[x] = 0;
});

var cells = document.getElementsByClassName('tr');
for (var i = 0, size = cells.length; i < size; i++) {
	var text = cells[i].innerHTML;
	if (typeGrade.indexOf(text) >= 0) {
		countGrade[text]++;
	}
}

var result = ""
typeGrade.forEach(function(grade) {
	result += "Grade " + grade + " : " + countGrade[grade] + "\n";
});

var detail = document.getElementsByClassName('detail');

var fullname = detail[2].innerHTML.split(' ').map(function(e) {
	var ee = e.toLowerCase().split('');
	return ee.shift().toUpperCase() + ee.join('');
}).join(' ');

var studentID = detail[0].innerHTML;
var year = ((new Date()).getFullYear() - parseInt(detail[7].innerHTML.split(' ').pop()));
var faculty = detail[1].innerHTML;
var major = detail[3].innerHTML.replace('&amp;', '&').replace("International Undergraduate Program", "IUP");
var degree = detail[5].innerHTML.replace('&amp;', '&');

var profile = [];
profile.push(fullname + " [" + studentID + "]");
profile.push("Faculty : " + faculty);
profile.push("Major : " + major);
profile.push("Study : " + degree);
profile.push("Year : " + year);
profile.push('');
profile = profile.join('\n');

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
	            label: '# of Grade',
	            backgroundColor: "rgba(255,99,132,0.2)",
	            borderColor: "rgba(255,99,132,1)",
	            borderWidth: 1,
	            hoverBackgroundColor: "rgba(255,99,132,0.4)",
	            hoverBorderColor: "rgba(255,99,132,1)",
	            data: typeGrade.map(function(grade) {return countGrade[grade]})
	        }]
	    },
	    options: {
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
