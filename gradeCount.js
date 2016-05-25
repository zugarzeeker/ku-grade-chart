var typeGrade = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
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

alert(profile + border + result);

