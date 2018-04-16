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
import {RecipeCollectionComponent} from './recipe-collection/recipe-collection.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { PersonalArticleComponent} from './personal-article/personal-article.component';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';

import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './auth.guard';
import {AppComponent} from './app.component';


const routes: Routes = [
  	{ path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'user/:id/personal-article/article/:id/update', redirectTo: 'article/:id/update', pathMatch: 'full'},
    { path: 'user/:id/recipe-collection/recipe/:id/update', redirectTo: 'recipe/:id/update', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
	  { path: 'login', component: LoginComponent },
	  { path: 'signup', component: SignupComponent },
  	{ path: 'search/:name', component: SearchComponent },
  	{ path: 'articles', component: ArticlesComponent },
  	{ path: 'article/:id', component: ArticleDetailComponent },
  	{ path: 'recipes', component: RecipesComponent },
   	{ path: 'recipe/:id', component: RecipeDetailComponent },
    { path: 'create/article', component: CreateArticleComponent, canActivate: [AuthGuard]},
    { path: 'create/recipe', component: CreateRecipeComponent, canActivate: [AuthGuard]},
    { path: 'user/:id/recipe-collection', component: RecipeCollectionComponent, canActivate: [AuthGuard]},
    { path: 'article/:id/update', component:UpdateArticleComponent, canActivate: [AuthGuard]},
    { path: 'recipe/:id/update', component:UpdateRecipeComponent, canActivate: [AuthGuard]},
    { path: 'user/:id/personal-article', component: PersonalArticleComponent, canActivate: [AuthGuard]},
    { path: 'user/:id/saved-recipe', component: SavedRecipeComponent, canActivate: [AuthGuard]},
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
