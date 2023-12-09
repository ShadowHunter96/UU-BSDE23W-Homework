function getRandomBirthdate(minAge, maxAge) {

    if (typeof minAge !== 'number' || typeof maxAge !== 'number') {
        throw new Error('minAge and maxAge must be numbers');
    }

    const currentYear = new Date().getUTCFullYear();
    const startYear = currentYear - maxAge - 1; // Go back one more year to be safe
    const endYear = currentYear - minAge;


    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;

    const randomMonth = Math.floor(Math.random() * 12);

    const lastDay = new Date(Date.UTC(randomYear, randomMonth + 1, 0)).getUTCDate();


    const randomDay = Math.floor(Math.random() * lastDay) + 1;


    const birthDate = new Date(Date.UTC(randomYear, randomMonth, randomDay));
    

    return birthDate.toISOString();
}



function generateRandomEmployee(minAge, maxAge) {

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
    const birthDate = getRandomBirthdate(minAge,maxAge);
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
        const randomEmployee = generateRandomEmployee(minAge,maxAge);
        const birthYear = parseInt(randomEmployee.birthdate.substring(0, 4));
        const age = currentYear - birthYear;
        
        if (age >= minAge && age <= maxAge) {
            employeeList.push(randomEmployee);
        }
    }
    
    return employeeList;
}


function getEmployeeStatistics(employeeList) {
    // Calculate the various statistics in employeeList // vypocet statistic na zaklade udaju z employee list return fce
    const totalEmployees = employeeList.length;
    const workloads = { workload10: 0, workload20: 0, workload30: 0, workload40: 0 };
    let sumAges = 0;
    let sumFemaleWorkload = 0;
    let femaleCount = 0;
    const ages = employeeList.map(emp => {
      const birthYear = new Date(emp.birthdate).getFullYear();
      const age = new Date().getFullYear() - birthYear;
      sumAges += age;
  
      // Count workload by hours
      workloads[`workload${emp.workload}`] += 1;
  
      // Sum of female workloads for average calculation // suma zenske prace
      if (emp.gender === 'female') {
        sumFemaleWorkload += emp.workload;
        femaleCount++;
      }
  
      return age;
    });
  
    const sortedByWorkload = employeeList
  .sort((a, b) => a.workload - b.workload)
  .map(emp => ({
      gender: emp.gender,
      birthdate: emp.birthdate,
      name: emp.name,
      surname: emp.surname,
      
  }));


    const averageAge = parseFloat((sumAges / totalEmployees).toFixed(1));
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    const medianAge = calculateMedian(ages);
    const medianWorkload = calculateMedian(employeeList.map(emp => emp.workload));
    const averageFemaleWorkload = femaleCount > 0 ? sumFemaleWorkload / femaleCount : 0;
  
    // Return the statistics
    return {
        total: totalEmployees,
        workload10: workloads.workload10,
        workload20: workloads.workload20,
        workload30: workloads.workload30,
        workload40: workloads.workload40,
        averageAge,
        minAge,
        maxAge,
        medianAge,
        medianWorkload,
        averageWomenWorkload: averageFemaleWorkload, 
        sortedByWorkload, 
      };
    }      
  
  // Helper function to calculate median
  function calculateMedian(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }
  



  const dtoIn = {
    count: 15,
    age: {
      min: 18,
      max: 40
    }
  };
  

function main(dtoIn) {
    // Destructuring the input object
    const { count, age: { min, max } } = dtoIn;
    
    // Generating the employee list based on input criteria
    const employeeList = generateEmployeeList(count, min, max);
    
    // Getting statistics from the employee list
    const statistics = getEmployeeStatistics(employeeList);
    
    // Construct the output object
    const dtoOut = {
      ...statistics,
      dtoOut: employeeList // This might need to be adjusted based on the exact output format required
    };

    return dtoOut;
}


const result = main(dtoIn)
console.log(result);  
