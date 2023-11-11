function getRandomBirthdate() {
    //defining start date and end date range
    const startDate = new Date('1970-01-01T00:00:00.000Z').getTime();
    const endDate = new Date('2014-01-01T00:00:00.000Z').getTime();
    
    // generating a random timestamp within the range
    const randomTimestamp = Math.floor(Math.random() * (endDate - startDate)) + startDate;
    
    // creating new Date object using the random timestamp
    const birthDate = new Date(randomTimestamp);

    // making hours, minutes, seconds and miliSeconds to a random number generator with defining
    const hours = Math.floor(Math.random() * 24); // 0 to 23 hours
    const minutes = Math.floor(Math.random() * 60); // 0 to 59 minutes
    const seconds = Math.floor(Math.random() * 60); // 0 to 59 seconds
    const milliseconds = Math.floor(Math.random() * 1000); // 0 to 999 milliseconds

    // Set the hours, minutes, and seconds to the birthDate
    birthDate.setHours(hours, minutes, seconds, milliseconds);
    
    // Return the birthdate in ISO format with time zone offset set to Z (UTC)
    return birthDate.toISOString();
}

function generateRandomEmployee() {

    //setting up params for random full name generator
    const maleFirstNames = [
        "John", "Michael", "David", "Robert", "William",
        "James", "Joseph", "Matthew", "Richard", "Charles",
    ];
    const femaleFirstNames = [
        "Jane", "Emily", "Sarah", "Jessica", "Linda",
        "Mary", "Jennifer", "Elizabeth", "Patricia", "Susan",
    ];
    const lastNames = [
        "Smith", "Johnson", "Brown", "Taylor", "Anderson", "Wilson", "Miller", "Davis", "Garcia", "Martinez",
        "Jones", "Clark", "Rodriguez", "Hernandez", "Lopez", "Lewis", "Lee", "Walker", "Hall", "Allen",
        "Young", "Green", "Evans", "King", "Wright", "Scott", "Baker", "Adams", "Gonzalez", "Stewart",
    ];

    //defining random and other StringBuilders almost same in Java 
    const randomFirstName = maleFirstNames.concat(femaleFirstNames)[Math.floor(Math.random() * (maleFirstNames.length + femaleFirstNames.length))];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    //deleted method for random gender now gender is decided based on firstname
    const gender = maleFirstNames.includes(randomFirstName) ? "male" : "female";
    const birthDate = getRandomBirthdate();
    const workload = [10, 20, 30, 40][Math.floor(Math.random() * 4)];

    //Getter of the function
    return {
        name: randomFirstName,
        surname: randomLastName,
        gender: gender,
        birthdate: birthDate,
        workload: workload
    };
}   

function generateEmployeeList(employeeCount, minAge, maxAge) {
    const employeeList = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    while (employeeList.length < employeeCount) {
        const randomEmployee = generateRandomEmployee();
        const birthYear = parseInt(randomEmployee.birthdate.substring(0, 4));
        const age = currentYear - birthYear;
        
        if (age >= minAge && age <= maxAge) {
            employeeList.push(randomEmployee);
        }
    }
    
    return employeeList;
}

function main(dtoIn) {
    const { employeeCount, minAge, maxAge } = dtoIn;
    const employeeList = generateEmployeeList(employeeCount, minAge, maxAge);

    return { dtoOut: employeeList };
}

const dtoIn = {
    employeeCount: 10, // Getter of desired number of employees
    minAge: 25,        // Setter of the minimum age
    maxAge: 40         // Setter of the maximum age
};
const result = main(dtoIn)
console.log(result); // out printing generated employee list in JSON format 