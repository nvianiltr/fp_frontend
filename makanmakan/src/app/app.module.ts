import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
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
import { UserService } from './user.service';
import { RecipeService } from './recipe.service';
import { RecipeCollectionComponent } from './recipe-collection/recipe-collection.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { PersonalArticleComponent } from './personal-article/personal-article.component';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { ReviewService } from './review.service';
import { ReportReviewComponent } from './report-review/report-review.component';

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
    CreateRecipeComponent,
    RecipeCollectionComponent,
    UpdateArticleComponent,
    UpdateRecipeComponent,
    PersonalArticleComponent,
    SavedRecipeComponent,
    ReportReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ArticleService, UserService, RecipeService, DatePipe, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }


