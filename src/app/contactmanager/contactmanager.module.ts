import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';

import { MaterialModule } from '../shared/material.module';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainContentComponent } from './components/main-content/main-content.component';

// Routes
const routes: Routes = [
  { path: '', component: ContactmanagerAppComponent, 
    children: [
      { path: '', component: MainContentComponent }
    ] 
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [ContactmanagerAppComponent, ToolbarComponent, SidenavComponent, MainContentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ContactmanagerModule { }