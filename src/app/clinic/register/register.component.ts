import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.message = 'Реєстрація успішна!';
        setTimeout(() => this.router.navigate(['/main']), 1500);
      },
      error: (err) => this.error = 'Логін або пароль вже зайняті або не відповідають умовам'
    });
  }
}
