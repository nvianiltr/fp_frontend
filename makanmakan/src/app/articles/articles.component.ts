import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  isArticleAvailable:  boolean;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  	this.getArticles();
  }

  getArticles(): void {
  	this.articleService.getArticles()
  		.subscribe(articles => {
  		  if(articles.length!=0) {
        this.articles = articles;
        this.isArticleAvailable = true;
      }
      else {
        this.isArticleAvailable = false;
      }});
  }

  saveCollection():void{

  }

}
