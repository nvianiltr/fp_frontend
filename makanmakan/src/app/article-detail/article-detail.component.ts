import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';

import * as $ from 'jquery';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {

  article: Article;

  constructor(
    private route:ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private firebase: FirebaseApp
  ) { }

  ngOnInit():void {
    this.article = new Article();
    this.getArticle();
    // this.getImage();
  }

  getImage():void {
    var storage    = this.firebase.storage();
    var storageRef = storage.ref();
    var spaceRef = storageRef.child(this.article.imageURL);
    spaceRef.getDownloadURL().then(function(url) {
      var test = url;
      console.log(test);
      $("#image")[0].src = test;
    }).catch(function(error) {

    });
  }

  getArticle():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleByID(id).subscribe(article => {this.article = article;
    this.getImage();
    });

  }

}
