import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Employee } from 'src/app/module/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.scss']
})
export class EmpdashboardComponent implements OnInit {

  empDetail !: FormGroup;
  empObj : Employee = new Employee();
  empList : Employee[] = [];

  constructor(private formBuilder : FormBuilder, private empService : EmployeeService) { }

  ngOnInit(): void {

    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      id : [''],
      fname : [''],
      lname : [''],
      phonenumber: [''],
      emailid: ['']
      
    });    

  }

  addEmployee() {
    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.fname = this.empDetail.value.fname;
    this.empObj.lname = this.empDetail.value.lname;
    this.empObj.phonenumber = this.empDetail.value.phonenumber;
    this.empObj.emailid = this.empDetail.value.emailid;

    this.empService.addEmployee(this.empObj).subscribe(res=>{
        console.log(res);
        this.getAllEmployee();
    },err=>{
        console.log(err);
    });

  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res=>{
        this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editEmployee(emp : Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['fname'].setValue(emp.fname);
    this.empDetail.controls['lname'].setValue(emp.lname);
    this.empDetail.controls['phonenumber'].setValue(emp.phonenumber);
    this.empDetail.controls['emailid'].setValue(emp.emailid);

  }

  updateEmployee() {

    this.empObj.id = this.empDetail.value.id;
    this.empObj.fname = this.empDetail.value.fname;
    this.empObj.lname = this.empDetail.value.lame;
    this.empObj.phonenumber = this.empDetail.value.phonenumber;
    this.empObj.emailid = this.empDetail.value.emailid;

    this.empService.updateEmployee(this.empObj).subscribe(res=>{
      console.log(res);
      this.getAllEmployee();
    },err=>{
      console.log(err);
    })

  }

}
