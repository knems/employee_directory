"use strict"

$(document).ready(function(){
	(function(){
		let $body = $("body");
		let $employees = $body.find('#employees');
		let newEmployees = "<div id=\"employees\"></div>";
		let localEmployees;

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

		let employeeModalTemplate = "" +
		"<div class=\"modal\">" +
		"<div class=\"modal-window\">" +
		"<div class=\"employee-modal-window\">" +
		"<div class=\"remove\"><img></div>" +
		"<div class=\"modal-employee\">" +
		"<div class=\"employee-img\">" +
		"<img src=\"{{ picture.large }}\">" +
		"</div>" +
		"<div class=\"modal-employee-info\">" +
		"<h3 class=\"capitalize\">{{ name.first }} {{ name.last }}</h3>" +
		"<p>{{ email }}</p>" +
		"<p class=\"capitalize\">{{ location.city }}</p>" +
		"</div> </div>" +
		"<div class=\"modal-info\">" +
		"<p>{{ cell }}</p>" +
		"<p class=\"capitalize\">{{ location.street }}, {{ location.state }} {{ location.postcode}}</p>" +
		"<p>Birthday: {{ dob }}</p>" +
		"</div></div> </div> </div>";

		$.ajax({
		  url: 'https://randomuser.me/api/?results=12&nat=us',
		  dataType: 'json'}).done(function(employees){
				$.each(employees.results, function(i, employee){
					employee.id = i;
					employee.dob = setBday(employee.dob.slice(0,10)); //formatted Birthday
					employee.location.state = state.abbrState(employee.location.state, "abbr"); //formatted state abbr
					addEmployee(employee);
		  	});//each
				localEmployees = employees.results; //a local reference for setting modals
			});//then

		$body.on("click", ".employee", function(){
			let employeeIndex = $(this).attr("id");
			showEmployeeModal(localEmployees[employeeIndex], employeeIndex);
		});//employees on click show modal

		$body.on("click", ".remove", function(){
			removeModal();
		});//remove modal

		//hover to add box shadow over employees
		$(document).on({
	    mouseenter: function() {
	      $(this)[0].style["box-shadow"] = "0 0 3px #000";
	    },
	    mouseleave: function() {
	    	$(this)[0].style["box-shadow"] = '';
	    }
		}, '.employee');

		//activate search by 'clicking' search icon or enter key
		$body.find(".search").on('click', '.img', employeesSearch);
		$body.find("#search").on('keydown', function(event){
			if(event.which == 13){
				employeesSearch();}
		});

		function employeesSearch(){
			$('#employees').replaceWith(newEmployees);
			let search = $("#search")[0].value.toLowerCase();
			$.each(localEmployees, function(i, employee){
				let firstName = employee.name.first;
				let lastName = employee.name.last;
				//condtional finding mathcing searches with every first and last name
				if(firstName.includes(search) || lastName.includes(search)){
					addEmployee(employee); //add the employee to the DOM
				}})}
		//class index change by number of children @ addEmployee

		function addEmployee(employee){ //adds employee to the DOM
			$("#employees").append(Mustache.render(employeeTemplate, employee));
			$("#employees").find('.employee').last().attr("id", "" + employee.id + "")}

		function showEmployeeModal(employee, i){ //creates modal and displays it to the DOM
			$body.append(Mustache.render(employeeModalTemplate, employee));}

		function removeModal(){ //removes modal
			$(".modal").remove();}

		function setBday(dob){ //default dob isn't formatted to liking
			let result = ''
			let bday = dob.split('');
			return result + bday[5] + bday[6] + '/' + bday[8] + bday[9] + '/' + bday[2] + bday[3];}
	})(); //anon function
}); //dom on load
