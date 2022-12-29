import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkPageComponent } from './header/link-page/link-page.component';
import { AuthGuard } from './Authentication/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./Authentication/auth.module').then((auth) => auth.AuthModule),
  },
  { path: 'link', component: LinkPageComponent, canActivate: [AuthGuard] },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./products/product.module').then((prod) => prod.ProductModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((prof) => prof.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
