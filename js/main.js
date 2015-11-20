var people_arr = [];
var task_arr = [];
var match_task_and_people = [];
var i = 0;
var j = 0;
$('#spin_the_wheel').hide();


function create_people() {
	
	var line = '<ul>';

	$.each(people_arr, function(index, val) {
		i++;
		line += '<li><h3 id="person_'+i+'">'+val+'</h3></li>';
	});
	line += '</ul>';

	$('#people_row').html(line);
}

function create_tasks() {
	
	var line = '<ul>';

	$.each(task_arr, function(index, val) {
		j++;
		line += '<li><h3 id="task_'+i+'">'+val+'</h3></li>';
	});
	line += '</ul>';

	$('#task_row').html(line);
}

function add_tasks_and_people_together() {
	var rand_people_arr = _.shuffle(people_arr);
	match_task_and_people = _.zip(rand_people_arr, task_arr);
	var combined_tasks_anad_people = _.object(match_task_and_people);
	pick_turkey_pic();
	var timer = setTimeout(function(){ 
		$('#turkey_pic').fadeOut('ease');
		task_results_output(combined_tasks_anad_people);
	}, 5000);
	
}

function task_results_output(combined_tasks_anad_people) {
	var line = '';

	$.each(combined_tasks_anad_people, function(index, val) {
		 line += '<h3>' + index + ' you are making ' + val + '</h3><br>';
	});

	$('#results').html(line);
}

$('#spin_the_wheel').on('click', function() {
	add_tasks_and_people_together();
	$('.adding_people_and_tasks_ui').hide();
});

function add_person(name) {
	people_arr.push(name);
	create_people();
}

$('#add_person_to_list').on('click', function() {
	var name = $("#persons_name").val();
	add_person(name);
	$("#persons_name").val('');
});

function add_tasks(task_item) {
	task_arr.push(task_item);
	create_tasks();
}

$('#add_task_to_list').on('click', function() {
	var task_item = $("#task_added").val();
	add_tasks(task_item);
	$("#task_added").val('');
});

function pick_turkey_pic() {
	var turkey_pic_arr = [1,2,3,4,5];
	var rand_num = _.sample(turkey_pic_arr);
	var output = '<img alt="turkey" src="image/turkey'+rand_num+'.gif">';

	$('#turkey_pic').html(output);
}

$('#add_person_to_list, #add_task_to_list').on('click', function() {
	if( !_.isEmpty(people_arr) && !_.isEmpty(task_arr) && people_arr.length == task_arr.length ) {
		$('#spin_the_wheel').show();
	} else {
		$('#spin_the_wheel').hide();
	}
});

function reset_all() {
	people_arr = [];
	task_arr = [];
	match_task_and_people = [];
}