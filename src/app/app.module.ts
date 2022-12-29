import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LinkPageComponent } from './header/link-page/link-page.component';
import { CoreModule } from './core.module';
import { AuthModule } from './Authentication/auth.module';
import { ProductModule } from './products/product.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LinkPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    ProductModule,
    ProfileModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
