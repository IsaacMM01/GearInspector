import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUser, heroIdentification, heroChartBar } from '@ng-icons/heroicons/outline';
import { featherLogOut, featherMenu } from '@ng-icons/feather-icons'
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  viewProviders:[provideIcons({ heroUser, heroIdentification, heroChartBar, featherLogOut, featherMenu })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    initFlowbite();
  }

  onLogOut(): void {
    this.authService.logout();
  }
}
