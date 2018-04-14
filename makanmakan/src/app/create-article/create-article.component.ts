import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { User } from '../models/User';
import { UserService } from '../user.service';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';



@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

	@Input() article: Article;

  user: User;
  message: string;
  res: any = {};

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private articleService: ArticleService,
    private location: Location,
    private userService: UserService, private datepipe: DatePipe,
   private firebaseApp: FirebaseApp
  ) { }


  ngOnInit() {
    this.article = new Article();
  }

  filename: string;
  selectedFile: File = null;

  createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid+'.jpg';
  }

  uploadImage() {
    this.selectedFile =<File> $('#image')[0].files[0];
    const fd = new FormData();
    fd.append('image',this.selectedFile, this.article.imageURL);
    this.http.post('https://us-central1-makanmakan-e28a1.cloudfunctions.net/uploadFile',fd).subscribe(res=>{console.log(res)});
  }

  add() {
    if($('#image')[0].files[0] == null){
      this.article.imageURL = "default.jpg";
    }
    else {
      this.article.imageURL = this.createUUID();
      this.uploadImage();
    }
    this.user = this.userService.getUser();
    this.article.user_id = this.user.id;
    this.article.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.articleService.addArticle(this.article).subscribe(res => {
      this.article = res;
      console.log(this.article);
      this.router.navigate(['/article/'+this.article.id]);
      location.reload();
    }, err => {
      this.res = err;
       console.log(this.res);
      this.message = this.res.error.error;
    });

  }
}
