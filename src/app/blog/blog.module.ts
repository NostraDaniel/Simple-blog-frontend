import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsResolverService } from './services/post-resolver.service';import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SinglePostComponent } from './single-post/single-post.component';
import { LightboxModule } from 'ngx-lightbox';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';

@NgModule({
  declarations: [
    EditPostDialogComponent,
    AllPostsComponent, 
    CreatePostComponent, 
    SinglePostComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    CKEditorModule,
    LightboxModule,
    MasonryGalleryModule
  ],
  entryComponents: [
    EditPostDialogComponent
  ],
  providers: [
    PostsResolverService
  ]
})
export class BlogModule { }
