import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';

import {RecipesComponent} from './recipes/recipes.component';
import {RecipeEditorComponent} from './recipe-editor/recipe-editor.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

import {ArticlesComponent} from './articles/articles.component';
import {ArticleEditorComponent} from './article-editor/article-editor.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';

import {RecipeCollectionComponent} from './recipe-collection/recipe-collection.component';
import {AuthGuard} from './auth.guard';

import {PersonalArticleComponent} from './personal-article/personal-article.component';
import {SavedRecipeComponent} from './saved-recipe/saved-recipe.component';
import {SavedArticleComponent} from './saved-article/saved-article.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'search/:name', component: SearchComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'article/:id', component: ArticleDetailComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: 'create-article', component: ArticleEditorComponent, canActivate: [AuthGuard]},
  {path: 'create-recipe', component: RecipeEditorComponent, canActivate: [AuthGuard]},
  {path: 'my-recipe-collection', component: RecipeCollectionComponent, canActivate: [AuthGuard]},
  {path: 'update-recipe/:id', component: RecipeEditorComponent, canActivate: [AuthGuard]},
  {path: 'update-article/:id', component: ArticleEditorComponent, canActivate: [AuthGuard]},
  {path: 'my-article-collection', component: PersonalArticleComponent, canActivate: [AuthGuard]},
  {path: 'saved-recipe', component: SavedRecipeComponent, canActivate: [AuthGuard]},
  {path: 'saved-article', component: SavedArticleComponent, canActivate: [AuthGuard]},
  {path: ':name', component: UserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
