
$(document).ready(onReady);

function onReady() {
    $('#submitBtn').on('click', addEmployee);
    calculateTotal();
    $('#empIn').on('click', '.delete', deleteEmployee)
    //addSampleData(); //for testing
}

let employeeList = [];

function addEmployee() {
    //get user input
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let id = $('#id').val();
    let title = $('#title').val();
    let annualSalary = $('#annualSalary').val();

    if (firstName === '' || lastName === '' || id === '' || title === '' || annualSalary === '') {
        return alert('Please fill out all input fields');
    }

    //create opject from user input
    let newEmployee = {
        firstName: firstName,
        lastName: lastName,
        id: id,
        title: title,
        annualSalary: annualSalary,
        annualSalaryFormatted: Number(annualSalary).toLocaleString('en', { style: 'currency', currency: 'USD' })
    };
    //push object to array
    employeeList.push(newEmployee);
    //clear inputs
    $('#firstName').val('');
    $('#lastName').val('');
    $('#id').val('');
    $('#title').val('');
    $('#annualSalary').val('');

    displayEmployees();

    calculateTotal();
}

function displayEmployees() {
    //loop through employee list  - append each employee to DOM 
    $('#empIn').empty();
    employeeList.forEach(function (employee, i) {
        $('#empIn').append(
            `<tr>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.id}</td>
            <td>${employee.title}</td>
            <td>${employee.annualSalaryFormatted}</td>
            <td><button id="${i}" class="delete">Delete</button></td>
            </tr>`
        );
    })// end for loop
}// end displayEmployee function

function calculateTotal() {
    //use totals from annual salaries to calculate a total monthly costs
    let totalAnnualCosts = 0;
    employeeList.forEach(function (employee) {
        totalAnnualCosts += Number(employee.annualSalary);
    });
    const monthlyCosts = Number(totalAnnualCosts / 12);
    const monthlyCostsRound = Number(monthlyCosts.toFixed(2));
    //if monthly costs exceed 20000.00 turn red
    if (monthlyCostsRound > 20000) {
        $('#totalMonthlyOut').addClass('warning');
    } else {
        $('#totalMonthlyOut').removeClass('warning');
    }
    $('#totalMonthlyOut').empty();
    $('#totalMonthlyOut').append(monthlyCostsRound.toLocaleString('en', { style: 'currency', currency: 'USD' }));
}// end calculateTotal function

function deleteEmployee() {
    let employeeToDelete = Number($(this).attr('id'));
    //console.log(employeeToDelete);
    employeeList.splice(employeeToDelete, 1);
    $(this).parent().parent().remove();
    displayEmployees();
    calculateTotal();
}// end deleteEmployee function

// function addSampleData(){
//     employeeList.push(
//         {
//         annualSalary: "100000",
//         annualSalaryFormatted: "$100,000.00",
//         firstName: "Naomi",
//         id: "1234",
//         lastName: "Price",
//         title: "Mrs"
//         },
//         {
//         annualSalary: "100000",
//         annualSalaryFormatted: "$100,000.00",
//         firstName: "Arthur",
//         id: "6789",
//         lastName: "Price",
//         title: "Child" 
//         },
//         {
//         annualSalary: "20000",
//         annualSalaryFormatted: "$20,000.00",
//         firstName: "Misky",
//         id: "3958",
//         lastName: "Price",
//         title: "Awesome"  
//         }
//     );
// }// end addSampleData function