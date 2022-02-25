const map1 = new Map();

map1.set('mild', 'Mild Stammerer');
map1.set('moderate', 'Moderate Stammerer');
map1.set('severe', 'Severe Stammerer');
map1.set('speechTherapist', 'Speech Therapist');
map1.set('parentOf', 'Parent Of Stammerer');
map1.set('conquer', 'Conquered Stammerer');

{/* <option value="mild">Mild Stammerer</option>
<option value="moderate">Moderate Stammerer</option>
<option value="severe">Severe Stammerer</option>
<option value="speechTherapist">Speech Therapist</option>
<option value="parentOf">Parent Of Stammerer</option>
<option value="conquer">Conquered Stammerer</option> */}

console.log(map1.size);

export const STAMMERING_STATUS_MAP = map1;