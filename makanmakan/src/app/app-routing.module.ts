import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ArticlesComponent } from './articles/articles.component';


const routes: Routes = [
  	{ path: '', component: HomeComponent },
	  { path: 'login', component: LoginComponent },
	  { path: 'signup', component: SignupComponent },
  	{ path: 'search', component: SearchComponent },
  	{ path: 'articles', component: ArticlesComponent },
  	{ path: 'article/1', component: ArticleDetailComponent },
  	{ path: 'recipes', component: RecipesComponent },
   	{ path: 'recipe/1', component: RecipeDetailComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
