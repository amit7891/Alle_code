/**
TODO #1
take the names from the remainingPeopleList and add them to the peopleList array. This should not be done programmatically, it is just a copy and paste job.
"Accounting" includes Oscar, Angela, and Kevin
"Sales" includes Jim, Dwight, Michael, Andy, Stanley, and Phyllis
"Human Resources" includes Toby, Holly, and Gabe
"Temps and Interns" include Ryan, Pete, and Gabe
"Corporate" includes Jan and  Robert
"Warehouse" includes Darryl and Roy
"Reception" includes Pam and Erin
"Support" includes the remaining individuals
**/
const employeesArray = [{
    name: "Oscar Martinez",
    department: "Accounting"
}, {
    name: "Michael Scott",
    department: "Sales"
}, {
    name: "Jim Halper",
    department: "Sales"
}, {
    name: "Kevin Malone",
    department: "Accounting"
}, {
    name: "Dwight Schrute",
    department: "Sales"
}, {
    name: "Andy Bernard",
    department: "Sales"
}, {
    name: "Angela Martin",
    department: "Accounting"
}, {
    name: "Erin Hannon",
    department: "Reception"
}, {
    name: "Toby Flenderson",
    department: "Human Resources"
}, {
    name: "Stanley Hudson",
    department: "Sales"
}, {
    name: "Jan Levinson",
    department: "Corporate"
}, {
    name: "Creed Bratton",
    department: "Support"
}, {
    name: "Ryan Howard",
    department: "Temps and Interns"
}, {
    name: "Darryl Philbin",
    department: "Warehouse"
}, {
    name: "Holly Flax",
    department: "Human Resources"
}, {
    name: "Meredith Palmer",
    department: "Support"
}, {
    name: "Kelly Kapoor",
    department: "Support"
}, {
    name: "Gabe Lewis",
    department: "Human Resources",
    department2: "Temps and Interns"
}, {
    name: "Robert California",
    department: "Corporate"
}, {
    name: "Phyllis Vance",
    department: "Sales"
}, {
    name: "Roy Anderson",
    department: "Warehouse"
}, {
    name: "Peter Miller",
    department: "Support"
}, {
    name: "Clark Green",
    department: "Support"
}];

const remainingEmployeesArray = ["Jim Halpert", "Pam Beezley", "Kevin Malone", "Dwight Schrute", "Andy Bernard", "Angela Martin", "Erin Hannon", "Toby Flenderson", "Stanley Hudson", "Jan Levinson", "Creed Bratton", "Ryan Howard", "Darryl Philbin", "Holly Flax", "Meredith Palmer", "Kelly Kapoor", "Gabe Lewis", "Robert California", "Phyllis Vance", "Roy Anderson", "Peter Miller", "Clark Green"];
let firstNamesArray = [];
let lastNamesArray = [];
let departmentsCount = {};
processAllEmployees(employeesArray);
printOutFirstNames();
/**
TODO #2
Call the processAllEmployees passing in the employeesArray
TODO #4
print out all of the first names to the console
**/

function processAllEmployees(allEmployees) {
    /**
    TODO #3
    loop through all of the employees and add their names to the firstNamesArray and lastNames array unless they are part of corporate or HR because according to Michael "Toby is in HR, which technically means he works for corporate, so he's not really a part of our family."
    **/
    //"Robert California", "Gabe Lewis", "Holly Flax", "Toby Flenderson", "Jan Levinson",
    for (i = 0; i < allEmployees.length; i++) {
        if (allEmployees[i].department != "Corporate" && allEmployees[i].department != "Human Resources") {
            firstNamesArray[i] = allEmployees[i].name.substr(0, allEmployees[i].name.indexOf(' '));
            lastNamesArray[i] = allEmployees[i].name.substr(allEmployees[i].name.indexOf(' '), allEmployees[i].length);
        }
    }

}

function splitFullName(fullName) {

}

function incrementDepartmentCount(department) {
    for (i = 0; i < sizeof(allEmployees); i++) {
        
    }
}

function printOutFirstNames() {
    var i = 0;
    while (i < firstNamesArray.length) {
        if (firstNamesArray[i]) {
            console.log(firstNamesArray[i]);
        }
        i++;
    }
}