import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../models/User';
import {UserService} from '../user.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-personal-article',
  templateUrl: './personal-article.component.html',
  styleUrls: ['./personal-article.component.css']
})
export class PersonalArticleComponent implements OnInit {


  articles: Article[];
  isArticleAvailable: boolean = true;
  user: User;
  selectedArticle: number;
  private _articles: Article[];

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private userService: UserService) { }

  public ngOnInit()
  {
    this.user = this.userService.getUser();
    this.getPersonalArticles();
  }

  search() {
    var string = $('#searchField').val().toLowerCase();
    if(string == ""){
      this.articles = this._articles;
    }
    this.articles = this._articles.filter(function (element) {
      return element.title.toLowerCase().includes(string);
    });
  }


  getPersonalArticles(): void {
    this.articleService.getPersonalArticle(this.user.id).
    subscribe(articles => {
      if(articles.length!=0) {
        this.articles = this._articles = articles;
        console.log(this.articles);
        this.isArticleAvailable = true;
      }
      else {
        this.isArticleAvailable = false;
      }});
  }

  setSelectedArticle(id: any) {
    this.selectedArticle = id;
  }

  deleteArticle(){
    this.articleService.deletePersonalArticle(this.selectedArticle).subscribe(article => {location.reload()});
  }
}
