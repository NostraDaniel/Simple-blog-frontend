import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { PostsResolverService } from './services/post-resolver.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { SinglePostResolverService } from './services/single-post-resolver.service';

const routes: Routes = [
  { path: '', component: AllPostsComponent, pathMatch: 'full', resolve: {posts: PostsResolverService } },
  { path: 'create-post', component: CreatePostComponent, },
  { path: 'post/:id', component: SinglePostComponent, resolve: {post: SinglePostResolverService }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }

