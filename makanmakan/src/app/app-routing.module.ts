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
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { CreateArticleComponent } from './create-article/create-article.component';


import { ArticlesComponent } from './articles/articles.component';
import {AuthGuard} from './auth.guard';
import {AppComponent} from './app.component';


const routes: Routes = [
  	{ path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
	  { path: 'login', component: LoginComponent },
	  { path: 'signup', component: SignupComponent },
  	{ path: 'search', component: SearchComponent },
  	{ path: 'articles', component: ArticlesComponent },
  	{ path: 'article/:id', component: ArticleDetailComponent },
  	{ path: 'recipes', component: RecipesComponent },
   	{ path: 'recipe/:id', component: RecipeDetailComponent },
    { path: 'create/article', component: CreateArticleComponent},
    { path: 'create/recipe', component: CreateRecipeComponent },
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
