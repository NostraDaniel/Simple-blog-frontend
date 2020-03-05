import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/common/interfaces/post';
import { Lightbox } from 'ngx-lightbox';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  private post: IPost;
  private masonryImages: string[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly lightbox: Lightbox
  ) { }

  open(index: number): void {
    console.log(this.post['__gallery__'][index]);
  }

  close(): void {
    this.lightbox.close();
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.post = data.post;
        this.masonryImages = data.post.__gallery__.map(image => image.src);
      }
    );
  }

  public get images(): IMasonryGalleryImage[] {
    return this.masonryImages.map(m => <IMasonryGalleryImage>{
      imageUrl: m
    });
  }

  clickedImage(event): void {
    const gallery = this.post['__gallery__'];
    const index = gallery.findIndex(image => image['src'] === event['imageUrl']);

    this.lightbox.open(this.post['__gallery__'], index);
  }
}
