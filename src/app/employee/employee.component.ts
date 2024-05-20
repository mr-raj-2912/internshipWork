import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {

  data : any[] = [];

  constructor(private EmployeeService:EmployeeService, private dialog : MatDialog, private route : ActivatedRoute  ){}

    ngOnInit(): void {
     const request = Number(this.route.snapshot.paramMap.get('id'));

     if(request>0){
      this.EmployeeService.getEmployeeById(request).subscribe(res=>{ 
        this.data=res;
        console.log(this.data);
      });
     }
     else{
      this.EmployeeService.getEmployee().subscribe(res=>{ 
        this.data=res;
        console.log(this.data);
      });
     }
    }

    deletEmployee(id : number){
      this.EmployeeService.deletEmployee(id).subscribe(res=>{
        if(res.code===200){
          this.ngOnInit();
        } 
      });
    }

    addEmployee(){
      let dialogRef = this.dialog.open(AddEmployeeComponent , {
        height: 'auto',
        width: 'auto',
        disableClose: true,
       
      });
      dialogRef.afterClosed().subscribe(()=>{
        this.ngOnInit();
      });
    }

    editEmployee(Employee : any) {
      let dialogRef = this.dialog.open(AddEmployeeComponent , {
        height: 'auto',
        width: 'auto',
        disableClose: true,
        data : {Employee}
      });
      dialogRef.afterClosed().subscribe(()=>{
        this.ngOnInit();
      });
    }
}