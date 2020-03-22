
window.addEventListener("load", function () {

	let url, response, commits;

	url = 'https://swapi.co/api/people/?page=1';
	getPeople();

	async function getPeople () {
		response = await fetch(url);
		commits = await response.json();
		let result = "";
		for (let i = 0; i < commits.results.length; i++) {
			result += "<li>" + commits.results[i].name + "</li>";
		};
		document.querySelector("#heroList").innerHTML = result;
	};

	function getEventTarget(e) {
		e = e || window.event;
		return e.target || e.srcElement; 
	}

	let ul = document.getElementById("heroList");
	ul.onclick = async function(event) {
		let target = getEventTarget(event);
		let li = target.closest("li");
		let nodes = Array.from(li.closest("ul").children );
		let index = nodes.indexOf(li); 

		let responseHero = await fetch(url);
		let commitsHero = await responseHero.json();

		let info = document.querySelector("#info");
		info.style.display = "block";

		let name = document.querySelector("#name");
		name.innerHTML = commitsHero.results[index].name;

		let age = document.querySelector("#age");
		age.innerHTML = "age: " + commitsHero.results[index].birth_year;

		let gender = document.querySelector("#gender");
		gender.innerHTML = "gender: " + commitsHero.results[index].gender;

		let responseFilms, commitsFilms, resultFilms = "";

		for (let i = 0; i < commitsHero.results[index].films.length; i++) {
			responseFilms = await fetch(commitsHero.results[index].films[i]);
			commitsFilms = await responseFilms.json();
			resultFilms += "<li>" + commitsFilms.title + "</li>";
		};

		document.querySelector("#films").innerHTML = "<ul id=\"filmlist\">films:<br>" + resultFilms + "</ul>";

		let homeworld = document.querySelector("#homeworld");
		let responsePlanet = await fetch(commitsHero.results[index].homeworld);
		let commitsPlanet = await responsePlanet.json();
		homeworld.innerHTML = "home world: " + commitsPlanet.name;

		let species = document.querySelector("#species");
		let responseSpecies = await fetch(commitsHero.results[index].species);
		commitsSpecies = await responseSpecies.json();
		species.innerHTML = "species: " + commitsSpecies.name;	
	};

	let nextBtn = document.querySelector("#next");
	let previousBtn = document.querySelector("#previous");
	let conteiner = document.querySelector("#conteiner");

	nextBtn.addEventListener("click", nextPeople);
	previousBtn.addEventListener("click", previousPeople);

	function nextPeople () {
		url = commits.next;
		if (url !== null) {
			getPeople();
		} else {
			url = 'https://swapi.co/api/people/?page=1'
			getPeople();
		};
	};

	function previousPeople () {
		url = commits.previous;
		if (url !== null) {
			getPeople();
		} else {
			url = 'https://swapi.co/api/people/?page=9'
			getPeople();
		};
	};

	let blinking = document.querySelector("h1");
	let colors = ["brown", "yellow", "orange", "red", "black"]; 
	let nextColor = 0;

	setInterval(function () {
            blinking.style.color = colors[nextColor++ % colors.length];
        }, 500);
});

