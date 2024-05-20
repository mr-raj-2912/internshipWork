import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  
  constructor(private userService:UserService, private dialog : MatDialog, @Inject(MAT_DIALOG_DATA) public data: any ){}
 
  myForm! : FormGroup ;
  searchString ='';
  Roles: any[] = [];
  Countries: any[] = [];
  States: any[] = [];
  Cities: any[] = [];
  searchName: any;

  ngOnInit(): void {
    this.userService.getRole().subscribe(res=>{
      this.Roles=res;
      if(this.data!==null)
        {
          this.myForm.patchValue({
          Role:  this.Roles.find(({role})=> role === this.data.user.role).roleId
          })
        }
    })
    this.userService.getCountry().subscribe(res=>{
      this.Countries=res;
      if(this.data!==null)
        {
          if(this.data.user.country !==""){
            this.myForm.patchValue({
            Country:  this.Countries.find(({countryName})=> countryName === this.data.user.country).countryId
            })
            this.onCountrySelected(this.myForm.get("Country")?.value)
          }
        }
    })
    
    this.myForm = new FormGroup({
      FullName: new FormControl("", [Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl("", Validators.required),
      Address: new FormControl("", Validators.required),
      City: new FormControl("", [Validators.required]),
      State: new FormControl("", [Validators.required]),
      Country: new FormControl("", [Validators.required]),
      Role: new FormControl("" , [Validators.required])
    });
  
    if(this.data!==null){
      this.myForm.patchValue({
        FullName: this.data.user.fullName,
        Email: this.data.user.email,
        Password: this.data.user.password,
        Address: this.data.user.address
      });
    }
  }
  onCountrySelected(event:any) {

    const countryId = typeof event === 'number' ? event : event.value;
    
    if(countryId>0){
      this.userService.getState(countryId).subscribe(res=>{
        this.States=res;
        if(this.data!==null)
          {
            this.myForm.patchValue({

            State: this.States.find(({stateName})=> stateName === this.data.user.state).stateId
            })
            this.onStateSelected(this.myForm.get("State")?.value)
          }
      })
    }
 }
  onStateSelected(event:any) {

  const stateId = typeof event === 'number' ? event : event.value;

  if(stateId>0){
    this.userService.getCity(stateId).subscribe(res=>{
      this.Cities=res;
      if(this.data!==null)
        {
          this.myForm.patchValue({          
          City: this.Cities.find(({cityName})=> cityName === this.data.user.city).cityId
          })
        }
    })
  }
 }
  onSubmit(){
    if(this.data === null){
      if (this.myForm.valid) {
        this.userService.addUser(this.myForm.value).subscribe(
          (response) => {
            this.dialog.closeAll();
            console.log('User added successfully:', response);
            this.myForm.reset();
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        );
      }
    }
    else{
      if (this.myForm.valid) {
       
        const id=this.data.user.userID;
        this.myForm.addControl('UserID' ,new FormControl(id, Validators.required));
      
        const userData=this.myForm.value;
        this.userService.editUser(userData).subscribe(
          (response) => {
            debugger
            if (response.code == 200) {
              this.dialog.closeAll();
              console.log('User updated successfully:', response);
              this.myForm.reset();
            } else {
            this.dialog.closeAll();
            console.log('User cannot updated:', response);
            this.myForm.reset();
            }
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      }
    }
  }
}
