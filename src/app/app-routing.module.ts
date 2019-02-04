import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContentComponent } from './content/content.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientsComponent } from './clients/clients.component';
import { PricingComponent } from './pricing/pricing.component';

import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { ArticleComponent } from './article/article.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoutegaurdService } from './routegaurd.service'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleCreateComponent } from './article-create/article-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'about', component: IntroComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'services', component: ContentComponent },
  { path: 'testimonials', component: TestimonialComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'blog', component: BlogComponent, canActivate: [RoutegaurdService] },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'article-edit/:id', component: ArticleEditComponent, canActivate: [RoutegaurdService] },
  { path: 'article-create', component: ArticleCreateComponent, canActivate: [RoutegaurdService] },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: "/404" },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
    declarations:[],
  exports: [RouterModule]
})
export class AppRoutingModule { }
