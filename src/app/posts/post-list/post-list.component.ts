import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  // posts = [
  //   {title: 'First Post', content: 'This is the first post.'},
  //   {title: 'Second Post', content: 'This is the second post.'},
  //   {title: 'Third Post', content: 'This is the third post.'},
  //   {title: 'Fourth Post', content: 'This is the fourth post.'}
  // ];

  @Input() posts: Post[] = [];

  constructor() { }

  ngOnInit() {
  }

}
