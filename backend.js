
const table = document.getElementById("stud-table");
var id =1;

const form = document.getElementById("input-form");

const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formGpa = document.getElementById("GPA")
const formAge = document.getElementById("age")
const formDegree = document.getElementById("degree")

const button = document.getElementById("add-button")

var studentArray =[];

form.addEventListener('submit', e => {
	e.preventDefault();
	// console.log("func called");
	addStudent();
});

class Student {
    constructor(id,name, email, grade, age, degree) {
        this.ID = id;
        this.name = name;
        this.email = email;
        this.grade = grade;
        this.age = age;
        this.degree = degree;
    }
}


function addStudent(){

    let name = formName.value;
    let email = formEmail.value;
    let grade = formGpa.value;
    let age = formAge.value;
    let degree = formDegree.value;

    if(button.value=="Edit Student") {
        editStudentData();
        return;
    }
    let student = new Student(id,name,email,grade,age,degree);
    id++;

    studentArray.push(student);
    form.reset();
    // console.log(studentArray);
    showStudnetInUI(studentArray)
}

function searchKeyPress(event) {
   
    if (event.key === "Enter") {
      event.preventDefault();
      searchStudent();
    }
}
  
document.getElementById("search-bar").addEventListener("keypress", searchKeyPress);

function searchStudent(){
    let searchString = document.getElementById("search-bar").value;
    searchString.trim();

    // console.log("search called",typeof searchString,searchString);

    if(searchString===""){
        showStudnetInUI(studentArray)
        // console.log("search function called",typeof searchString,searchString);
        return;
    }
    

    let resultArray=[];
    studentArray.forEach(student => {
        if (student.name===searchString || student.degree===searchString || student.email===searchString){
            resultArray.push(student);
        }
    });

    showStudnetInUI(resultArray);
}


function showStudnetInUI(studentArray){
    var old_tbody = document.getElementById("form-body");
    var new_tbody = document.createElement("tbody");
    new_tbody.setAttribute("id","form-body");

    studentArray.forEach(student => {
        new_tbody.innerHTML+=`<tr>
    <td class="space">${student.ID}</td>
    <td class="space">${student.name}</td>
    <td class="space">${student.email}</td>
    <td class="space">${student.age}</td>
    <td class="space">${student.grade}</td>
    <td id="grade-cell" class="space">${student.degree}<img id="edit" onclick="editRowData()" src="./images/edit 1.svg"> <img id="delete" onclick="switchToDelete()" src="./images/trash-2 1.svg" alt=""></td>
    </tr>`;  
    });

    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}


// get row data



table.addEventListener("click",getRowData);

var editButton;
var deleteButton;

function switchToEdit(){
    editButton=true;
    deleteButton=false;
}

function switchToDelete(){
    deleteButton=true;
    editButton=false;
}

function getRowData(event) {
    
    const row = event.target.closest("tr");

    const id = row.cells[0].textContent;
    
    if(deleteButton) deleteRowData(id);

    else editRowData(id)
}

var editedStudent;

function editRowData(clickedStudent){
    //console.log("editButton");
    for(let i=0;i<studentArray.length;i++){
        if(studentArray[i].ID==clickedStudent){
            formName.value=studentArray[i].name;
            formEmail.value=studentArray[i].email;
            formGpa.value = studentArray[i].grade;
            formAge.value=studentArray[i].age
            formDegree.value=studentArray[i].degree;

            editedStudent=clickedStudent;
            button.value="Edit Student";
            button.className="edit-button";
            studentArray.splice(i,1);
        }
    }
}

function editStudentData(){
    let student = new Student(editedStudent,formName.value,formEmail.value,formGpa.value,
        formAge.value,formDegree.value)

    studentArray.push(student);
    button.value="Add Student";
    button.className="";
    showStudnetInUI(studentArray);
}



function deleteRowData(clickedStudent){

    //console.log(clickedStudent);
   for(let i=0;i<studentArray.length;i++){
    if(studentArray[i].ID==clickedStudent){
        studentArray.splice(i,1);
        showStudnetInUI(studentArray);
        return;
    }
   }
}
 
