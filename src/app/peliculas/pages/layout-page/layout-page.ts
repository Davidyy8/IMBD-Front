import { Component } from "@angular/core";
import { AuthService } from "../../../auth/services/auth-service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.html',
  styles: ``,
  standalone: false
})

export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './listado'},
    { label: 'Favoritos', icon: 'favorite', url: './favoritas' },
  ]

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();

    this.router.navigate(['/auth/login']);
  }
}
