"use strict"

$(document).ready(function(){
	(function(){
		let $employees = $('#employees');
		let friends;

		let employeeTemplate = "" +
		"<div class=\"employee\">" +
		"<div>" +
		"<img src={{ picture.large }}>" +
		"</div>" +
		"<div class=\"employee-info\">" +
		"<h3 class=\"capitalize\">{{ name.first }} {{ name.last }}</h3>" +
		"<p>{{ email }}</p>" +
		"<p class=\"capitalize\">{{ location.city }}</p>" +
		"</div>" +
	  "</div>";

		function addEmployee(employee, i){
			$employees.append(Mustache.render(employeeTemplate, employee));
			$employees.find('.employee').last().attr("id", "" + i + "")}

		function showEmployee(index){
			console.log(index);
		}

			$.ajax({
			  url: 'https://randomuser.me/api/?results=12&nat=us',
			  dataType: 'json'}).done(function(employees){
					$.each(employees.results, function(i, employee){
						addEmployee(employee, i);
			  	});//each
					friends = employees.results;
				});//then

		$employees.on("click", ".employee", function(){
			let employeeIndex = $(this).attr("id");
			showEmployee(employeeIndex);
		});
	})(); //anon function
}); //dom on load
