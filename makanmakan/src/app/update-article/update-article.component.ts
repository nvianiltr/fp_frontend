import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Article } from '../models/Article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  @Input() article: Article;  
  
  constructor(
    private route:ActivatedRoute,
    private articleService: ArticleService,
    private location: Location) { }

  ngOnInit():void {
  	this.getArticle();
  }

  getArticle():void {
    const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.articleService.getArticleByID(id).subscribe(article => {this.article = article;});
      //.subscribe(article => this.article = article);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    const id = +this.route.snapshot.paramMap.get('id');
  	this.articleService.updateArticle(this.article, id).subscribe(()=>this.goBack());
  }

}
