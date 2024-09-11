import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TabMenuModule } from 'primeng/tabmenu';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartnersComponent } from './components/partners/partners.component';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    KanbanBoardComponent,
    DashboardComponent,
    PartnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    TabMenuModule,
    DialogModule,
    ImageModule,
    DataViewModule,
    TagModule,
    FileUploadModule,
    ChartModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
