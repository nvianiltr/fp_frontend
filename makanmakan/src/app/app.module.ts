import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule }    from '@angular/common/http';

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
import { ArticleService } from './article.service';
import { CreateArticleComponent } from './create-article/create-article.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    SearchComponent,
    RecipeDetailComponent,
    ArticleDetailComponent,
    RecipesComponent,
    ArticlesComponent,
    CreateArticleComponent,
    CreateRecipeComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }


