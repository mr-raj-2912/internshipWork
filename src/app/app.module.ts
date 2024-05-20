import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth/auth.guard';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    JwtModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    AuthGuard,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
