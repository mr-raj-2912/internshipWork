import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router,private snackBar: MatSnackBar) {}
  myForm!: FormGroup;

  ngOnInit(): void {
    localStorage.clear();
    this.myForm = new FormGroup({
      Email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      Password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.userService.authenticateUser(this.myForm.value).subscribe(
        (response) => {
          if (response.code == 200) {
            localStorage.setItem("jwt", response.token);
            this.router.navigate(['/user']);
            console.log('User authenticate successfully:', response);
          } else {
            //alert(response.message);
            this.snackBar.open(response.message,"X",{
              duration: 2000,
              verticalPosition: "top",
              horizontalPosition: "right",
              panelClass: ["custom-style"],
            })
          }
        },
        (error) => {
          console.error('Error authenticate user:', error);
        }
      );
    }
  }
}
