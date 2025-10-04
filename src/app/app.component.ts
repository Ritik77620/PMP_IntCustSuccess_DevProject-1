import { Component, signal } from '@angular/core'; 
import { HeaderComponent } from '../pages/header/header.components';
import { SidebarComponent } from './sidebar/sidebar/sidebar';


@Component({
  selector: 'app-root',
  standalone: true,
imports: [HeaderComponent, SidebarComponent],

  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('PMS_System');
}