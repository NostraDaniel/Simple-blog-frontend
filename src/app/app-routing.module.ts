import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
// import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'procedures', component: ProceduresComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contacts', component: ContactComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'posts', loadChildren: './posts/posts.module#PostsModule', canActivate: [AuthGuard] },
  // { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
