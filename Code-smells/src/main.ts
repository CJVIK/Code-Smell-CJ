/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getTotalJumpLength(jumps: number[]): number {
  //let totalNumber = 0; 

  //totalNumber = jumps.reduce(
  //  (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump 
  //);

  return jumps.reduce((sum, jump) => sum + jump, 0);
}
// Kommentar: totalNumber - överflödig variabel? kan inte detta göras direkt i returnen? En viss tydlighet men känns onödig.
// jumpDistanceSoFar är inte ett bra namn? Vad representerar det? min tolkning är att det är summan av alla hopp?
// Funktionen håller singel responsibility principen, vet ej hur jag optimerar mer. 
/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) { }
}

function getStudentStatus(student: Student): string {
  // student.passed = student.name == "Sebastian" student.handedInOnTime ? true : false: false;
  student.passed = student.name === "CJ" && student.handedInOnTime;

  return student.passed ? "VG" : "IG"; // Hittade en shorthand operator som jag inte visste om. "?"" förkortning för -> if och : är en förkortning för else.

  // if (student.passed) {
  //   return "VG";
  // } else {
  //   return "IG";
  // }
}
// Kommentar: Min första tanke är varför har vi en passed variabel i student klassen?
// borde inte detta vara en funktion som kollar om studenten har godkänt eller inte? Kanske en funktion som heter hasPassed()?
// Sedan ser jag att det är en nested operator, vilket är svårläst - jag tycker det. Känns som en KISS principen behlövs här.
// Skulle kan inte kunna skriva liknande som första exemplet? alltså skriva i returnen?
/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temp {
  constructor(public city: string, public measurementDate: Date, public tempratureValue: number) { } // Ändrade namn på variabler för att vara mer beskrivande.
}

function averageWeeklyTemperature(tempRecords: Temp[]) {
  let totalTemp = 0; //Fan nu gör jag samma fel som var i tidigare exempel.
  const oneWeekAgoInMillisecounds = Date.now() - 604800000; // 604800000 är en vecka i milisekunder
  const week = 7;

  for (let i = 0; i < tempRecords.length; i++) {
    if (tempRecords[i].city === "Stockholm") {
      if (tempRecords[i].measurementDate.getTime() > oneWeekAgoInMillisecounds) {
        totalTemp += tempRecords[i].tempratureValue;
      }
    }
  }
  const recentRecords = tempRecords.filter(record =>
    record.city === "Stockholm" && record.measurementDate.getTime() > Date.now() - oneWeekAgoInMillisecounds); //alternativ lösning med filter

  // for (let who = 0; who < heights.length; who++) {
  //   if (heights[who].q === "Stockholm") {
  //     if (heights[who].where.getTime() > Date.now() - 604800000) {
  //       r += heights[who].v;
  //     }
  //   }
  // }
  totalTemp = recentRecords.reduce((sum, temprecord) => sum + temprecord.tempratureValue, 0); //alternativ lösning med reduce
  return totalTemp / week;
}
// Kommentar: Variabelnamn är inte beskrivande, vad är r? vad är fan who? vad är heights?
// Ah, nu ser jag det är en beräkning av medeltemperatur för en vecka. hence milisekunder. Borde man inte bryta ut det i variabler för tydlighet?
// kan man kanske använda reduce? Samma sak här kan man ju skriva direkt i returnen?
// 13:30 fan borde man inte kunna använda array methods för att filtrera ut stockholm?
// Försökte uppdatera med en filter metod och en reduce metod.

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */
type Product = {
  name: string;
  price: number;
  amount: number;
  description: string;
  image: string;
  imageAlt: string;
};
const productBanana: Product = {
  name: "Banan",
  price: 10,
  amount: 5,
  description: "En gul banan",
  image: "banan.jpg",
  imageAlt: "Bild på en banan",
};

function createProductHTML(product: Product, parent: HTMLElement) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let priceTag = document.createElement("p");
  let amountTag = document.createElement("p");
  let descriptionTag = document.createElement("p");
  let imageTag = document.createElement("img");

  title.innerHTML = `${product.name}`;
  priceTag.innerHTML = `${product.price}`;
  amountTag.innerHTML = `${product.amount}`;
  descriptionTag.innerHTML = `${product.description}`;
  imageTag.src = `${product.image}`;
  imageTag.alt = `${product.imageAlt}`;


  container.append(title, priceTag, imageTag, amountTag, descriptionTag);
  parent.appendChild(container);
}
createProductHTML(productBanana, document.body);
// Kommentar: varför har vi en name; string osv inne i funktionen? borde inte detta vara en produkt klass?
// För många appendChilds på olika rader?
//
/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
// function presentStudents(students: Student[]) {
//   for (const student of students) {
//     if (student.handedInOnTime) {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = true;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#passedstudents");
//       listOfStudents?.appendChild(container);
//     } else {
//       let container = document.createElement("div");
//       let checkbox = document.createElement("input");
//       checkbox.type = "checkbox";
//       checkbox.checked = false;

//       container.appendChild(checkbox);
//       let listOfStudents = document.querySelector("ul#failedstudents");
//       listOfStudents?.appendChild(container);
//     }
//   }
// }
function createStudentElement(checked: boolean): HTMLElement {
  let container = document.createElement("div");
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;

  container.appendChild(checkbox);
  return container;
}

function presentStudentsCheckList(students: Student[]) {
  for (const student of students) {
    let listofStudents = student.handedInOnTime ? // shorthand operator för if else
      document.querySelector("ul#passedstudents")
      : document.querySelector("ul#failedstudents");

    listofStudents?.appendChild(createStudentElement(student.handedInOnTime));
  }
}

// Kommentar: Hmm repetitiv kod med creating elements, kanske man kan göra en funktion som tar in en boolean som parameter och returnerar en checkbox?
// Om jag förstår koden korrekt så är det 2 st listor som ska fyllas med studenter, en lista för de som har lämnat in i tid och en för de som inte har det.
// 
/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
// function concatenateStrings() {
//   let result = "";
//   result += "Lorem";
//   result += "ipsum";
//   result += "dolor";
//   result += "sit";
//   result += "amet";

//   return result;
// }
let strings = ["Lorem", "ipsum", "dolor", "sit", "amet"];

function concatenateStrings(strings: string[]): string {

  return strings.join(", "); //mellanrummet är för att det ska bli en space mellan orden.
}

console.log(concatenateStrings(strings)); //output: Lorem, ipsum, dolor, sit, amet

// Kommentar: Ahh detta måste vara string konkatenering(var tvungen att kolla upp vad det heter på svenska)
// Kanske använda en array och join metoden?
//frågan är om man borde använda en array eller en string? alltså att det är funktion som tar in en array och returnerar en string?
/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string,
    public avatar?: string,
    public address?: string
  ) { }
}
function calculateAge(birthday: Date): number {
  let ageDiffrence = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiffrence);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return userAge;
}

function createUser(user: User) {
  // Validation
  let userAge = calculateAge(user.birthday);

  // let ageDiffrence = Date.now() - user.birthday.getTime();
  // let ageDate = new Date(ageDiffrence);
  // let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if ((userAge < 20)) {
    // Logik för att skapa en användare
    const errorMessage = "Du är under 20 år, nekad på SystemBolaget";
    console.log(errorMessage);
    throw new Error(errorMessage);
  } else {
    console.log("Användaren är över 20 år, godkänd på SystemBolaget");
    const newUser = new User(user.name, user.birthday, user.email, user.password, user.avatar, user.address);
    console.log("User created:", newUser);
    return newUser;

  }
}
// Kommentar: User borde var en type/class eller interface, för att bli modulär. och CreateUser borde ta in en User istället för flera parametrar??
// Använda en ? för att göra det till en optional parameter?
// frågan är att validering för ålder, borde det vara en egen funktion? eller ska det vara i createUser? borde vara en egen. Singel responsibility.
// Det gör möhligt att lägga till fler valideringar om det behövs. Samt om ålder behöver ändras så är det bara att ändra i calculateAge funktionen.
