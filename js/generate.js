var results = {
  overall: { name: 'Overall' },
  boomilever: { name: 'Boomilever' },
  'chemistry-lab': { name: 'Chemistry Lab' },
  'dynamic-planet': { name: 'Dynamic Planet' },
  'disease-detectives': { name: 'Disease Detectives' },
  'radio-lab': { name: 'Radio Lab' },
  'code-busters': { name: 'Code Busters' },
  'bungee-egg-drop': { name: 'Bungee Egg Drop' },
  'write-it-do-it': { name: 'Write It, Do It' },
  'designer-genes': { name: 'Designer Genes' },
  astronomy: { name: 'Astronomy' }
};

var schools = ['Nowhereville', 'Everytown', 'Bayside', 'Centerville', 'Westside', 'Eastside', 'Cliffside', 'Rockport', 'Porttown', 'Riverside', 'Southside', 'Northside'];
var firstNames = ['John', 'Bill', 'Sally', 'William', 'Clarence', 'Samantha', 'Susan', 'Benjamin', 'Charles', 'Theresa', 'Sue', 'Vince', 'Stephen'];
var lastNames = ['Jones', 'Smith', 'Sanders', 'Willimanson', 'Carver', 'Cartwright', 'Cooper', 'Tanner', 'Masterson'];
function randomResults() {
  var resultLength = 5;
  var studentLength = 3;

  var results = [];
  var schoolsUsed = {};
  while (results.length < resultLength) {
    var schoolName = pluck(schools);
    while (typeof schoolsUsed[schoolName] !== 'undefined') {
      schoolName = pluck(schools);
    }
    schoolsUsed[schoolName] = true;
    if (percentChance(40)) { // Random chance to not have students entered
      results.push({
        team: schoolName
      });
    } else {
      var students = [];
      while (students.length < studentLength) {
        students.push(pluck(firstNames)+' '+pluck(lastNames));
      }
      results.push({
        team: schoolName,
        students: students
      });
    }
  }
  return results;
}

// Pick a random item from a given list
function pluck(list) {
  var totalLength = list.length;
  var r = Math.floor(Math.random()*totalLength);
  return list[r];
}

// Roll 1d100 and see if the result is less than the requested chance
function percentChance(goal) {
  var r = Math.floor(Math.random()*100);
  return r <= goal;
}


// Fill the additional data into the result Object
var suffix = ' (AA)';
for (eventId in results) {
  if (!results.hasOwnProperty(eventId)) continue;
  results[eventId].name += suffix;
  if (percentChance(10)) { // Random chance to not have results yet
    results[eventId].results = null;
  } else {
    results[eventId].results = randomResults();
  }
}
console.log(JSON.stringify(results, null, 2));
