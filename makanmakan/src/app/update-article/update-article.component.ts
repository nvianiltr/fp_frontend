import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {DatePipe,Location} from '@angular/common';

import { Article } from '../models/Article';
import { ArticleService } from '../article.service';

import { User } from '../models/User';
import {UserService} from '../user.service';


@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {

  @Input() article: Article;

  user: User;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private location: Location,
    private userService: UserService, private datepipe: DatePipe) { }

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
    this.user = this.userService.getUser();
    this.article.user_id = this.user.id;
   this.article.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
     const id = +this.route.snapshot.paramMap.get('id');
  	this.articleService.updateArticle(this.article, id).subscribe(()=>this.goBack());
  }

}
