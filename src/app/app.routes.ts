import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WhoWeAreComponent } from './views/who-we-are/who-we-are.component';
import { ChartsComponent } from './views/charts/charts.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
          { path: '', component: LoginComponent },
        ]
      },
      {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'who_we_are', component: WhoWeAreComponent },
          { path: 'charts', component: ChartsComponent },
        ]
      },
      { path: '**', redirectTo: '' },
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
