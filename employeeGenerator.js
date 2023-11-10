function generateRandomEmployee() {
    
    const firstNames = [
        "John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Jessica", "William", "Linda",
        "James", "Mary", "Christopher", "Jennifer", "Joseph", "Elizabeth", "Thomas", "Patricia", "Daniel", "Nancy",
        "Matthew", "Susan", "Richard", "Karen", "Charles", "Lisa", "Mark", "Margaret", "Anthony", "Betty",
    ];
    const lastNames = [
        "Smith", "Johnson", "Brown", "Taylor", "Anderson", "Wilson", "Miller", "Davis", "Garcia", "Martinez",
        "Jones", "Clark", "Rodriguez", "Hernandez", "Lopez", "Lewis", "Lee", "Walker", "Hall", "Allen",
        "Young", "Green", "Evans", "King", "Wright", "Scott", "Baker", "Adams", "Gonzalez", "Stewart",
    ];
    
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    const gender = Math.random() < 0.5 ? "male" : "female";
    const birthYear = Math.floor(Math.random() * 40) + 1980;
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;
    
    const birthDate = `${birthYear}-${birthMonth.toString().padStart(2, "0")}-${birthDay.toString().padStart(2, "0")}T00:00:00.000Z`;
    
    const workload = [10, 20, 30, 40][Math.floor(Math.random() * 4)];
    
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
    
    for (let i = 0; i < employeeCount; i++) {
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
console.log(result); // Getting generated employee list in JSON format 