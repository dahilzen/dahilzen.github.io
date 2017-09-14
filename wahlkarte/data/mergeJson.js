const electionData = require("./zweitstimmen_2013.json");
const geojson = require("./gemeinden.json");
const fs = require('fs');

for (var i = 0; i < geojson.features.length; i++) {
	// aktuelles geojson feature in variable speichern (damit leichter abrufbar)
	var currentFeature = geojson.features[i];
	// initialisiere variable für wahldaten, die zum geojson-feature passt
	var matchingElectionDataset;

	// passende Wahldaten heraussuchen und in initialiserte variable ablegen
	for (var j = 0; j < electionData.length; j++) {
		// Bedingung: Passt der Datensatz in den Wahldaten zum Geojson-Feature?
		if (electionData[j].Gemeinde === currentFeature.properties.NAME) {
			matchingElectionDataset = electionData[j];
			break; //Passenden Datensatz gefunden! Breche Schleife ab, um Zeit zu sparen
		}
	}

	if (matchingElectionDataset) {
		// Erweiterte Properties!
		Object.assign(currentFeature.properties, matchingElectionDataset);
	} else {
		console.warn('did not find matching election dataset', currentFeature);
	}
}

// Wandle Geojson-Objekt in String um, welchen wir mit fs in die Ergebnis-Datei schreiben
var jsonResult = JSON.stringify(geojson, null, 4); // Die Argumente null, 4 stehen für "hübsch formatieren"
fs.writeFileSync('result.json', jsonResult, {
	encoding: 'UTF-8'
});