import { NgModule } from "@angular/core";
import { LayoutPageComponent } from "./pages/layout-page/layout-page";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing-module";
import { MaterialModule } from "../material/material-module";
import { LoginComponent } from "./pages/login-page/login-page";



@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
