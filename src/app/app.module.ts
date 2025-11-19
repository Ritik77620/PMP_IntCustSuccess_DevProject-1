import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// Import components
import { AppComponent } from './app.component';
import { NavbarComponent } from './masters/layout/navbar/navbar';
import { SidebarComponent } from './masters/layout/sidebar/sidebar';
import { LayoutComponent } from './masters/layout/layout';
import { LoginComponent } from './masters/login/login';

// Define routes
const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    // Move standalone components from here
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // Add standalone components to the imports array
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
