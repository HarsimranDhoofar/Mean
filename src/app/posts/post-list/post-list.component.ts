import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post} from "../post.model"
import { PostsService } from '../posts.service';
import { Subscription} from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
// posts=[
//   {title:'First Post', content:'This is the first post\'s content'},
//   {title:'Second Post', content:'This is the Second post\'s content'},
//   {title:'Third Post', content:'This is the Third post\'s content'},
// ];
posts:Post[]=[];
isLoading =false;
totalPosts =10;
postsPerPage = 2;
cuurentPage =1;
pageSizeOptions =[1,2,5,10];
private postsSub: Subscription

  constructor( public postsService: PostsService) { 

  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe;
  }

  ngOnInit(): void {
    this.isLoading =true;
    this.postsService.getPosts(this.postsPerPage, 1);
    this.postsSub= this.postsService.getPostUpdateListener().subscribe((posts:Post[]) =>{
      this.isLoading =false;
      this.posts = posts;
    });
  }
  onChangedPage(pageData: PageEvent){
      this.cuurentPage - pageData.pageIndex +1;
      this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.cuurentPage);
  }
  onDelete(postId :string){
    this.postsService.deletePost(postId);
  }

}
