import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextFieldModule} from '@angular/cdk/text-field';
import {
  MatToolbarModule,
  MatToolbar,
  MatButtonModule,
  MatButton,
  MatIconModule,
  MatIcon,
  MatSidenavModule,
  MatSidenav,
  MatSidenavContent,
  MatSidenavContainer,
  MatFormFieldModule,
  MatFormField,
  MatInputModule,
  MatInput,
  MatNavList,
  MatListModule,
  MatCardModule,
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardSubtitle,
  MatCardContent,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
  MatTabsModule,
  MatTooltipModule,
  MatSliderModule,
  MatGridListModule,
  MatSortModule,
  MatDialogModule,
  MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';
import { DragDropDirective } from '../common/directives/drag-and-drop.directive';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NewestPostsComponent } from '../components/newest-posts/newest-posts.component';
import { PostCardComponent } from '../blog/post-card/post-card.component';
import { PostOptionsComponent } from '../blog/post-options/post-options.component';

@NgModule({
  declarations: [
    PostCardComponent,
    DragAndDropComponent,
    DragDropDirective,
    SidebarComponent,
    NewestPostsComponent,
    PostOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    TextFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSliderModule,
    MatGridListModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    MDBBootstrapModule,
    MatSlideToggleModule,
  ],

  exports: [
    MatToolbar,
    MatButton,
    MatIcon,
    MatCardModule,
    MatSidenav,
    MatSidenavContent,
    MatSidenavContainer,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    MatNavList,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    CommonModule,
    MatMenuModule,
    TextFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    PostCardComponent,
    MDBBootstrapModule,
    MatSlideToggleModule,
    DragAndDropComponent,
    DragDropDirective,
    SidebarComponent,
    NewestPostsComponent,
    PostOptionsComponent,
    MatSidenavModule
  ]
})
export class SharedModule {}