const episodes = [13, 9, 8, 8, 5];
const episodeDuration = 50;

//1
let total = 0;
for (let i = 0; i < episodes.length; i++) {
    total += episodes[i];
}
console.log(`Total : ${total}`);

//2
const durationTotal = total * episodeDuration;
console.log(`Duree total en minutes : ${durationTotal} minutes`);

//3
const durationInHours = durationTotal / 60;
console.log(`Duree total en heures : ${durationInHours} heures`);

//4
const roundedHours = Math.round(durationInHours);
console.log(`Duree arrondis: ${roundedHours} heures`);
