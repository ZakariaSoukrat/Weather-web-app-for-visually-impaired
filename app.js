document.querySelector('.select-field').addEventListener('click',()=>{
    document.querySelector('.list').classList.toggle('show');
    document.querySelector('.down-arrow').classList.toggle('rotate180');

});


let weatherObject;

let btnShow = document.querySelector('#btn');

btnShow.addEventListener('click', () => {
// -------------------- création d'un objet dont les elements sont {baliseName : baliseCoordinates} ---------------------------
let text = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"Object name":"Lochrist","Function":"light support","foid":"BALISAGE_FR000001892100001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.763545200000002,48.342549800936624]}},{"type":"Feature","properties":{"Object name":"Dellec","Function":"null","foid":"BALISAGE_FR000001890700001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.759029400000003,48.33495540093666]}},{"type":"Feature","properties":{"Object name":"Pointe de Morgat","Function":"light support","foid":"BALISAGE_FR000001770600001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.496755400000009,48.21961720093711]}},{"type":"Feature","properties":{"Object name":"Pointe du Petit Minou","Function":"light support","foid":"BALISAGE_FR000001796300001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.614243000000002,48.33663610093665]}},{"type":"Feature","properties":{"Object name":"Base Navale","Function":"0","foid":"BALISAGE_FR000001930400001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.493670000000009,48.37986670093648]}},{"type":"Feature","properties":{"Object name":"Pointe de Kermorvan","Function":"light support","foid":"BALISAGE_FR000001870400001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.789883100000001,48.36199570093655]}},{"type":"Feature","properties":{"Object name":"Trézien","Function":"light support","foid":"BALISAGE_FR000001803600001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.778930700000011,48.42351310093633]}},{"type":"Feature","properties":{"Object name":"Pointe du Portzic","Function":"0","foid":"BALISAGE_FR000001792600001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.534010199999997,48.35827940093657]}},{"type":"Feature","properties":{"Object name":"Saint-Mathieu","Function":"light support","foid":"BALISAGE_FR000001805800001","featureType":"Landmark"},"geometry":{"type":"Point","coordinates":[-4.770895400000002,48.329873500936664]}}]}'
let obj = JSON.parse(text);
let x = obj.features;
//let possibleBaliseName = x[0]["properties"]["Object name"];
//// console.log(possibleBaliseName)
//document.getElementById("balise0").innerHTML +=  possibleBaliseName ;
let baliesNameCoordinatesObject = {};
for(let i= 0; i < x.length; i++)
{
    let a = x[i];
    //// console.log(a);
    let b = a.properties;
    //// console.log(b)
    let baliseName = b["Object name"];
    // console.log(baliseName);
    let data = '<option id="balise' ;
    data +=  i + '" value=balise"' + i + '" style="font-size: 28px ;">' + baliseName + '</option>'
    //// console.log(data);
    //document.getElementById("searchby").innerHTML += data;
    let d = a.geometry;
    //// console.log(d);
    let baliseCoordinates = d.coordinates;
    //// console.log(baliseCoordinates);
    baliesNameCoordinatesObject[baliseName]=baliseCoordinates;
}
// console.log(baliesNameCoordinatesObject);
    
// acquisition des horaires cochés pour aujourd'hui :   
   let checkboxestoday = document.getElementsByName('today');
      let checkedHoraireToday = [];
      for (let i=0; i<checkboxestoday.length; i++) {
         if (checkboxestoday[i].checked) {
            checkedHoraireToday.push(checkboxestoday[i].parentElement.textContent);
         }
      }
   // console.log("checkedHoraireToday :");
   // console.log(checkedHoraireToday) 

// acquisition des horaires cochés pour demain :  
   let checkboxestomorrow = document.getElementsByName('tomorrow');
      let checkedHoraireTomorrow = [];
      for (let i=0; i<checkboxestomorrow.length; i++) {
         if (checkboxestomorrow[i].checked) {
            checkedHoraireTomorrow.push(checkboxestomorrow[i].parentElement.textContent);
         }
      }
   // console.log("checkedHoraireTomorrow :");
   // console.log(checkedHoraireTomorrow); 

// acquisition des balises cochées :  
   let checkboxesbalise = document.getElementsByName('balise');
      let checkedBalise = [];
      for (let i=0; i<checkboxesbalise.length; i++) {
         if (checkboxesbalise[i].checked) {
            checkedBalise.push(checkboxesbalise[i].parentElement.textContent);
         }
      }
   // console.log("checkedBalise :"); 
   // console.log(checkedBalise) ;

// acquisition des prévisions cochées : 
   let checkboxesforecast = document.getElementsByName('previsions');
      let checkedPrevsions = [];
      for (let i=0; i<checkboxesforecast.length; i++) {
         if (checkboxesforecast[i].checked) {
            checkedPrevsions.push(checkboxesforecast[i].parentElement.textContent);
         }
      }
   // console.log("checkedPrevsions : ");
   // console.log(checkedPrevsions);

// ------------------------- géneration des données
let  todayData = {} ;
let  tomorrowData = {} ;
for (let i=0; i<checkedBalise.length; i++) {
   todayData[checkedBalise[i]]= {}
   tomorrowData[checkedBalise[i]]= {}
   let localcoordinates = baliesNameCoordinatesObject[checkedBalise[i]] ;
   let url = 'https://carto.sportrizer.report/api/datas/gps:' ;
   url += localcoordinates[1] + "," + localcoordinates[0] + '/?token=c3sayV8rZFv0HiGFxRY4bJjm&f=json&lives=none'
   console.log(url);
   fetch(url)
      .then( function(resp) {
         return resp.json();
      })
      .then(function(myJson) {
         let datasObject = myJson.datas;
         let modelsArray = datasObject.models;
         let modelsObject = modelsArray[0];
         let stationArray = modelsObject.stations;
         let stationObject = stationArray[0];
         let weatherObject = stationObject.weather;
         // console.log(weatherObject);
      
         for (let j=0; j<checkedHoraireToday.length; j++) {
            todayData[checkedBalise[i]][checkedHoraireToday[j]] = {};
            let selectedHeure = today + checkedHoraireToday[j] + ":00:00" ;
            // console.log(weatherObject);
            // console.log("selectedHeure :", selectedHeure);
            let selectedHeureObject =weatherObject[selectedHeure];
            // console.log("selectedHeureObject :", selectedHeureObject);
            for (let k=0; k<checkedPrevsions.length; k++) {
               // console.log("Iam here!!!!!!!!!!!!!!!")
               let prev = checkedPrevsions[k];
               todayData[checkedBalise[i]][checkedHoraireToday[j]][checkedPrevsions[k]]=selectedHeureObject[prev];
               // console.log(todayData);
            }
         }
         console.log(todayData);
         for (let j=0; j<checkedHoraireTomorrow.length; j++) {
            tomorrowData[checkedBalise[i]][checkedHoraireTomorrow[j]] = {};
            let selectedHeure = demain + checkedHoraireTomorrow[j] + ":00:00" ;
            // console.log(weatherObject);
            // console.log("selectedHeure :", selectedHeure);
            let selectedHeureObject =weatherObject[selectedHeure];
            // console.log("selectedHeureObject :", selectedHeureObject);
            for (let k=0; k<checkedPrevsions.length; k++) {
               // console.log("Iam here!!!!!!!!!!!!!!!")
               let prev = checkedPrevsions[k];
               tomorrowData[checkedBalise[i]][checkedHoraireTomorrow[j]][checkedPrevsions[k]]=selectedHeureObject[prev];
               // 
            }
         }
         console.log(tomorrowData);
      })
}

});


// ------------------------ date aujourd'hui 'yyyy-mm-jj' 
let toDay = new Date();
// console.log(toDay);
let dd = String(toDay.getDate()).padStart(2, '0');
let mm = String(toDay.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = toDay.getFullYear();
let today = yyyy + '-' + mm + '-' + dd + " " ;
// ------------------------ date demain sous la forme 'yyyy-mm-jj' 
var tomorrow = new Date(toDay)
tomorrow.setDate(tomorrow.getDate() + 1)
// console.log(tomorrow);
dd = String(tomorrow.getDate()).padStart(2, '0');
mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
yyyy = tomorrow.getFullYear();
let demain = yyyy + '-' + mm + '-' + dd + " " ;
console.log(demain)


          /********************* GESTION DES PHRASES **************************/

       /* dictionnaire avec comme clé primaire les balises sélectionnées et comme argument, les prévisions souhaitées dans un second dictionnaire*/
   const Phares_selected={
   "Petit Minou":{"Houle": ["2","SO","4"], "Vent": ["3","Nord Ouest"], "Précipitations":["5"],"Température":["5"]},
   "Roscanvel":{"Houle": ["0.5","NE","17"], "Vent": ["23","Est"], "Précipitations":["0"],"Température":["15"]}};
   
   /*On définit la division dans laquelle on va écrire*/
   
   const phrases=document.getElementById("phrases");
   
  /* On intialise ce qu'on va écrire */
   phrases.innerHTML="";
   
 /* Parcours de l'ensemble du dictionnaire */
 /* En premier, on parcourt le nom des phares sélectionnés*/
   for (let phare in Phares_selected ){
     phrases.innerHTML+="<br> <br> <br>"
     phrases.innerHTML+="Prévisions pour "+phare+" : ";
     phrases.innerHTML+="<br> <br>";
      // console.log("Prévisions pour " + phare);

     /* Ensuite, on parcourt les prévisions sélectionnées*/
     /* dans chaque boucle if, la commande // console.log permet de tester si code fonctionne*/
      for(let previ in Phares_selected[phare]){
       
      /* on vérifie qu'elle est la prévision courante afin d'afficher la phrase correspondante*/
       if (previ=="Houle"){
         phrases.innerHTML+="La Houle aura une hauteur de " + Phares_selected[phare][previ][0] + "m, une orientation " + Phares_selected[phare][previ][1] + " et une période de " + Phares_selected[phare][previ][2]+"secondes.<br>";
         /*// console.log("La Houle aura une hauteur de " + Phares_selected[phare][previ][0] + "m, une orientation " + Phares_selected[phare][previ][1] + " et une période de " + Phares_selected[phare][previ][2]+"secondes.");*/
       }
       if (previ=="Vent"){
         phrases.innerHTML+="Le vent aura une vitesse de "+ Phares_selected[phare][previ][0]+" noeuds"+ " et une orientation "+Phares_selected[phare][previ][1]+".<br>";
         /*// console.log("Le vent aura une vitesse de "+ Phares_selected[phare][previ][0]+" noeuds"+ " et une orientation "+Phares_selected[phare][previ][1]+".");*/
   
       }
       if (previ =="Précipitations"){
         phrases.innerHTML+="Il y aura "+ Phares_selected[phare][previ][0] +" mm de précipitation." +"<br>";
         /*// console.log("Il y aura "+ Phares_selected[phare][previ][0] +" mm de précipitation.");*/
   
       }
       if (previ=="Température"){
         phrases.innerHTML+="Il fera "+Phares_selected[phare][previ][0]+"°C." + "<br>"
         /*// console.log("Il fera "+Phares_selected[phare][previ][0]+"°C.")*/
       }
       }
      }
