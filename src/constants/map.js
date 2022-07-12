const map1 = new Map();

map1.set('mild', 'Mild Stammerer');
map1.set('moderate', 'Moderate Stammerer');
map1.set('severe', 'Severe Stammerer');
map1.set('speechTherapist', 'Speech Therapist');
map1.set('parentOf', 'Parent Of Stammerer');
map1.set('conquer', 'Conquered Stammerer');


const map2 = new Map();

map2.set(1, 'Very Bad');
map2.set(2, 'Bad');
map2.set(3, 'Good');
map2.set(4, 'Very Good');
map2.set(5, 'Loved it');


{/* <option value="mild">Mild Stammerer</option>
<option value="moderate">Moderate Stammerer</option>
<option value="severe">Severe Stammerer</option>
<option value="speechTherapist">Speech Therapist</option>
<option value="parentOf">Parent Of Stammerer</option>
<option value="conquer">Conquered Stammerer</option> */}

console.log(map1.size);

export const STAMMERING_STATUS_MAP = map1;
export const RATING_MAP = map2;