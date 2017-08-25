$(document).ready(function(){
	let $employees = $('#employees');

	// <div class="employee">
	// 	<div>
	// 		<img src="https://randomuser.me/api/portraits/men/83.jpg">
	// 	</div>
	// 	<div class="employee-info">
	// 		<h3>Haleigh Macciarella<h3>
	// 		<p>dtucker@yakitri.edu</p>
	// 		<p>Chicago</p>
	// 	</div>
	// </div>

	let employeeTemplate = "" +
	"<div class=\"employee\">" +
	"<div>" +
	"<img src={{ picture.large }}>" +
	"</div>" +
	"<div class=\"employee-info\">" +
	"<h3 class=\"capitalize\">{{ name.first }} {{ name.last }}<h3>" +
	"<p>{{ email }}</p>" +
	"<p class=\"capitalize\">{{ location.city }}</p>" +
	"</div>" +
  "</div>";

	function addEmployee(employee){
		$employees.append(Mustache.render(employeeTemplate, employee));}

	$.ajax({
	  url: 'https://randomuser.me/api/?results=12&nat=us',
	  dataType: 'json',
	  success: function(employees) {
	    $.each(employees.results, function(i, employee){
				console.log(employee);
				addEmployee(employee);
			});
	  }
});
});
