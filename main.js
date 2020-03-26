
window.addEventListener("load", function () {

	let url, response, commits;
	let info = document.querySelector("#info");
	let conteiner = document.querySelector("#conteiner");
	let list = document.getElementById("heroList").childNodes;

	url = 'https://swapi.co/api/people/?page=1';

	getPeople();

	/*получаем список героев*/

	async function getPeople () {

		response = await fetch(url);

		if (response.ok) {
			commits = await response.json();
			let result = "";
			for (let i = 0; i < commits.results.length; i++) {
				result += "<li>" + commits.results[i].name + "</li>";
			};
			document.querySelector("#heroList").innerHTML = result;
		} else {
			document.querySelector("#heroList").innerHTML = "<li>Ошибка HTTP: " + response.status + "<li>";
		};
	};

	/*отработчик клика по списку, вывод информации о герое */

	function getEventTarget(e) {
		e = e || window.event;
		return e.target || e.srcElement; 
	};

	let ul = document.getElementById("heroList");

	ul.onclick = async function(event) {

		for (let i = 0; i < list.length; i++) {
			list[i].style.color = "";
		};

		let target = getEventTarget(event);
		let li = target.closest("li");
		let nodes = Array.from(li.closest("ul").children);
		let index = nodes.indexOf(li);

		window.localStorage.index = index;


		let responseHero = await fetch(url);
		let commitsHero = await responseHero.json();

		//имя героя
		let name = document.querySelector("#name");
		name.innerHTML = commitsHero.results[index].name;

		//возраст героя
		let age = document.querySelector("#age");
		age.innerHTML = "age: " + commitsHero.results[index].birth_year;

		//пол героя
		let gender = document.querySelector("#gender");
		gender.innerHTML = "gender: " + commitsHero.results[index].gender;

		//список фильмов,в которых снимался герой
		let responseFilms, commitsFilms, resultFilms = "";

		for (let i = 0; i < commitsHero.results[index].films.length; i++) {
			responseFilms = await fetch(commitsHero.results[index].films[i]);
			commitsFilms = await responseFilms.json();
			resultFilms += "<li>" + commitsFilms.title + "</li>";
		};

		document.querySelector("#films").innerHTML = "<ul id=\"filmlist\">films:<br>" + resultFilms + "</ul>";

		//родная планета героя
		let homeworld = document.querySelector("#homeworld");
		let responsePlanet = await fetch(commitsHero.results[index].homeworld);
		let commitsPlanet = await responsePlanet.json();
		homeworld.innerHTML = "home world: " + commitsPlanet.name;

		//особь героя 
		let species = document.querySelector("#species");
		let responseSpecies = await fetch(commitsHero.results[index].species);
		commitsSpecies = await responseSpecies.json();
		species.innerHTML = "species: " + commitsSpecies.name;	

		//вывод информации о герое
		info.style.display = "block";
		closeBtn.style.display = "block";
	};

	/*перемотка списка героев вперёд*/

	let nextBtn = document.querySelector("#next");
	nextBtn.addEventListener("click", nextPeople);

	function nextPeople () {
		url = commits.next;
		if (url !== null) {
			getPeople();
		} else {
			url = 'https://swapi.co/api/people/?page=1'
			getPeople();
		};
	};

	/*перемотка списка героев назад*/

	let previousBtn = document.querySelector("#previous");
	previousBtn.addEventListener("click", previousPeople);

	function previousPeople () {
		url = commits.previous;
		if (url !== null) {
			getPeople();
		} else {
			url = 'https://swapi.co/api/people/?page=9'
			getPeople();
		};
	};

	/*закрытие информации о герое*/

	let closeBtn = document.querySelector("#close");
	closeBtn.addEventListener("click", closeInfoList);

	function closeInfoList () {
		info.style.display = "none";
		closeBtn.style.display = "none";
		list[window.localStorage.index].style.color = "white";
	};

	/*мигющая надпись STAR WARS CHARACTERS*/

	let blinking = document.querySelector("h1");
	let colors = ["brown", "yellow", "orange", "red", "black"]; 
	let nextColor = 0;

	setInterval(function () {
		blinking.style.color = colors[nextColor++ % colors.length];
	}, 800);

});

