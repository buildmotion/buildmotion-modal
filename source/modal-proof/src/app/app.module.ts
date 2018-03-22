import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { ModalAboutComponent } from './modal-about/modal-about.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AboutComponent,
    ModalAboutComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalAboutComponent
  ]
})
export class AppModule { }
