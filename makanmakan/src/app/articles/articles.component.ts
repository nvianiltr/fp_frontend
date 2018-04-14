import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { DatePipe } from '@angular/common';

import * as $ from 'jquery';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[];
  isArticleAvailable: boolean;

  constructor(private articleService: ArticleService, private firebase: FirebaseApp) { }

  ngOnInit() {
    this.getArticles();
  }

  getImage():void {
    var storage = this.firebase.storage();
    var storageRef = storage.ref();
    this.articles.forEach(function (article) {
      if(article.imageURL != "default.jpg"){
        var spaceRef = storageRef.child(article.imageURL);
        spaceRef.getDownloadURL().then(function(url) {
          var _src = url;
          $("#image")[0].src = _src;
        }).catch(function(error) {});
      }
      else{
      }
    })
  }
  getArticles(): void {
  	this.articleService.getArticles()
  		.subscribe(articles => {
  		  if(articles.length!=0) {
          this.isArticleAvailable = true;
          this.articles = articles;
          this.getImage();
      }
      else {
        this.isArticleAvailable = false;
      }});
  }

}
