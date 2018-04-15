import { Component,OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'makanmakan';

  public ngOnInit()
  {
    $(document).ready(function(){
      $("#personal-article-topic").click(function(){
        $(this).hide();
      });
    });
  }

}
