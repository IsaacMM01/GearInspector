import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.css'
})
export class WhoWeAreComponent implements OnInit {

  product = {
    name: '',
    price: 0,
    description: ''
  };

  constructor(
    private api: ApiService,
    private alertService: AlertService,
  ) {}
  user = {
    name: 'Isaac21',
    email: 'maresmezaisaac212@gmail.com',
    password: '123456'
  }
  ngOnInit(): void {
    this.api.getUsers().subscribe(data=>{
      console.log(data);
    });
    // this.api.registerUser(this.user).subscribe(data=>{
    //   console.log(data);
    // });
  }
}
