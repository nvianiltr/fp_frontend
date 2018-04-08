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


import { ArticlesComponent } from './articles/articles.component';


const routes: Routes = [
  	{ path: '', component: HomeComponent },
	  { path: 'login', component: LoginComponent },
	  { path: 'signup', component: SignupComponent },
  	{ path: 'search', component: SearchComponent },
  	{ path: 'articles', component: ArticlesComponent },
  	{ path: 'article/:id', component: ArticleDetailComponent },
  	{ path: 'recipes', component: RecipesComponent },
   	{ path: 'recipe/:id', component: RecipeDetailComponent },
    { path: 'create/article', component: CreateArticleComponent },
    { path: 'create/recipe', component: CreateRecipeComponent },
    { path: 'user/recipe-collection', component: RecipeCollectionComponent},
    { path: 'article/:id/update', component:UpdateArticleComponent },
    { path: 'recipe/:id/update', component:UpdateRecipeComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
