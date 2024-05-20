import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  data: any[] = [];
  filteredData: any[] = [];
  searchString = '';
  pageSizeReader = 5;
  pageSizeOption = [
    { value: 1, viewValue: 1 },
    { value: 3, viewValue: 3 },
    { value: 5, viewValue: 5 }
  ];

  currentPage: number = 1;
  totalItems=0;
  pageSize! : any;

  constructor(private userService: UserService, private dialog: MatDialog, private route: ActivatedRoute, private jwtHelper: JwtHelperService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    debugger
    const userData = {};
    this.userService.getusers(userData).subscribe(res => {
      this.data = res.users;
      this.totalItems = this.data.length;
    });
    // var request = 0;
    // var user = localStorage.getItem('loggedInUser')
    // if(user !== null){
    //   request=Number(JSON.parse(user).primarysid)
    // }
    // const userData = { UserID : request};
    // if(request>0){
    //   this.userService.getUserById(userData).subscribe(res=>{
    //     this.data= res.users;
    //     //console.log(this.data);
    //   });
    // }
    // else{
    //   this.userService.getusers(userData).subscribe(res=>{
    //     this.data= res.users;
    //     console.log(userData);
    //   });
    // }
  }
 

  deletusers(id: number) {
    if (confirm("Are you sure") == true) {
      this.userService.deletusers(id).subscribe(res => {
        if (res.code === 200) {
          this.ngOnInit();
        }
      });
      this.snackBar.open("user deleted successfully", "X", {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "right",
        panelClass: ["custom-style"],
      })
    } else {
      this.snackBar.open("You canceled", "X", {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "right",
        panelClass: ["custom-style"],
      })
    }
  }

  addUser() {
    let dialogRef = this.dialog.open(AddUserComponent, {
      height: 'auto',
      width: 'auto',
      disableClose: true,

    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  editusers(user: any) {
    let dialogRef = this.dialog.open(AddUserComponent, {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: { user }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  search() {

    if (this.searchString.trim() !== '') {

      if (this.searchString != null) {
        const searchData = { email: this.searchString.trim(), pageNo: this.currentPage, pageSize: this.pageSize };
        this.userService.getusers(searchData).subscribe(res => {
          if (res.code == 200) {
            this.filteredData = res.users;
            this.data = this.filteredData;
          }
        });
      }
    } else if (this.searchString == "") {
      this.ngOnInit();
    } 
  }
  fetchUsers() {
    const userData = {
      pageNo: this.currentPage,
      pageSize: this.pageSize
    };
    this.userService.getusers(userData).subscribe(res => {
      this.data = res.users;
      
    });
  }
  onSizeSelected(event: any) {
    this.pageSize = event.value;
    this.currentPage = 1; // Reset current page to 1 when changing page size
    this.fetchUsers();
  }
  onLeft() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers();
    }
  }
  onRight() {debugger
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.fetchUsers();
    }
  }
}
