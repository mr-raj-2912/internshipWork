import { Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {

  constructor(private EmployeeService:EmployeeService, private dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: any ){}
  myForm! : FormGroup ;
  
  ngOnInit(): void {
    this.myForm = new FormGroup({
      FirstName: new FormControl("", [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      LastName: new FormControl("", [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      Email: new FormControl("", [Validators.required, Validators.email]),
      Phone: new FormControl("", [Validators.required,Validators.pattern(/^\d{10}$/)]),
      EmployeeCode: new FormControl("", Validators.required),
      DepartmentID: new FormControl("", [Validators.required,Validators.pattern(/^[0-9]+$/)]),
      cityID: new FormControl("", [Validators.required,Validators.pattern(/^[0-9]+$/)]),
      reportingEmployeeID: new FormControl("", [Validators.required,Validators.pattern(/^[0-9]+$/)]),
    });
    if(this.data!==null){
      this.myForm.patchValue({
        FirstName: this.data.Employee.firstName,
        LastName: this.data.Employee.lastName,
        Email: this.data.Employee.email,
        Phone: this.data.Employee.phone,
        EmployeeCode: this.data.Employee.employeeCode,
        DepartmentID: this.data.Employee.departmentID,
        cityID: this.data.Employee.cityID,
        reportingEmployeeID: this.data.Employee.reportingEmployeeID,
      });
    }
  }
  onSubmit(){
    if(this.data === null){
      if (this.myForm.valid) {
        this.EmployeeService.addEmployee(this.myForm.value).subscribe(
          (response) => {
            this.dialog.closeAll();
            console.log('Employee added successfully:', response);
            this.myForm.reset();
          },
          (error) => {
            console.error('Error adding Employee:', error);
          }
        );
      }
    }
    else{
      if (this.myForm.valid) {
        const id=this.data.Employee.employeeID;
        this.myForm.addControl('EmployeeID', new FormControl(id, Validators.required));
        const EmployeeData=this.myForm.value;
        this.EmployeeService.editEmployee(EmployeeData).subscribe(
          (response) => {
            this.dialog.closeAll();
            console.log('Employee updated successfully:', response);
            this.myForm.reset();
            this.myForm.reset();
          },
          (error) => {
            console.error('Error updating Employee:', error);
          }
        );
      }
    }
  }

}
