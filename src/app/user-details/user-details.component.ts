import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
 user: User = {}; 
constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
      console.log('User data from navigation state:', this.user);
    } else {
      this.route.paramMap.subscribe(params => {
        const user = history.state.user;
        if (user) {
          this.user = user;
          console.log('User data from history.state:', this.user);
        } else {
          console.warn('No user data, redirecting to login.');
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
