# Modal Proof
The goal of this proof is to implement the Angular Bootstrap modal component. View and edit in ` Stackblitz`

[View and Edit with STACKBLITZ](https://stackblitz.com/github/buildmotion/buildmotion-modal/tree/master/source/modal-proof)


## Let Create a new App!
Or, you can create the application using:

```
ng new modal-proof
```

Update the ` index.html ` file to reference the [Bootstrap Css](http://getbootstrap.com/) - using the CDN.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
```

## Packages
The web application will require the ` @ng-bootstrap-bootstrap ` package and any dependencies. 

```
npm install --save @ng-bootstrap/ng-bootstrap@1.0.2
npm install --save ajv@^6.0.0
```

## Modal Component
Create a new component ` ModalComponent ` as a generic modal component. We will only need to provide the component a ` title ` and reference a specific ` component ` as content for the ` body ` of the modal dialog.

```text
ng generate component modal
```

1. update the import to include `@Input`
    * add the `@Input() title` with a default title value.
2. inject the ` public activeModal: NgbActiveModal ` in the constructor.
    * allows the modal to hide

Next, update the component with the following.

```typescript
import { Component, Input, OnInit } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title = `Information`;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

}
```

### Modal Template
The modal template uses Bootstrap classes for styling. The main sections of the modal are:

* modal-header
* modal-title
* modal-body
* modal-footer

The ` modal-body ` section includes an `ng-content` directive to allow for components to be rendered in the body.

```html
<div role="document" class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ng-content></ng-content>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  </div>
</div>
```

## Usage
Now that we have a generic template for the modal. In our sample, we will have an ` About ` component display in the ` modal`. This will demonstrate that we can use any component in our application as content for the ` modal-body`. 

Create a new ` About ` component. This component will represent ` any ` of our application components that we would like to render as modals.

```
ng g component about
```

The template is updated to include some additional content with formatting - you get the idea. In my production application, the about component will retrieve application information using a RESTful API call and display more useful information. 

```html
<h1>Does it really?</h1>
<p>
  about works!
</p>
```

Next, let's create a new component called `AboutModalComponent`. 

```
ng g component modalAbout
```

### Wrap the About Component in the Modal Component
Now the fun part. Update the template for the `AppModalComponent`. We are wrapping the ` AboutComponent` in the `ModalComponent`. 

* add a `title` attribute (matches the @Input of the ModalComponent) so that you can supply a title for the modal.

```html
<app-modal title="About the App">
  <app-about></app-about>
</app-modal>
```

### Trigger the Modal
Now that we have all of the working parts of a modal and content to view. We need to trigger the modal to popup. We will add a simple button to invoke a `(click)` event. When the button is clicked the `open()` method will handle the click event.

```html
<button class="btn btn-lg btn-outline-primary" (click)="open()">Launch demo modal</button>
```

### Handle the Button Click
We'll need to update the consumer of the modal. Notice that there is no other modal component references or HTML in the template of the ` AppComponent`. We only have the button. We will dynamically load a component using the ` NgbModal` injected as `modalService` in the component constructor. 

```typescript
import { Component } from '@angular/core';

import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalAboutComponent } from './modal-about/modal-about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private modalService: NgbModal) {}

  open() {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(ModalAboutComponent);
    modalRef.componentInstance.title = 'About';
  }
}
```


### AppModule
The modal service will `open` the specified component `ModalAboutComponent`. In order to enable the `ModalAboutComponent` to be used in this manner, you 
will need to update the `AppModule` configuration

```json
entryComponents: [
    ModalAboutComponent
  ]
```

Before we can run the application, you will need to make sure the ` components` are imported and declared.

1. import `import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';`
2. add `NgbModule.forRoot()` to the `imports` array.
3. provide: `NgbActiveModal` in the `providers` array.

```typescript
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
```

## Stackblitz

```html
<a class="stackblitz" target="_blank" title="Edit in StackBlitz" href="app/components/modal/demos/customclass/stackblitz.html">
    <img alt="StackBlitz icon" height="22" src="img/stackblitz-icon.svg">
</a>
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
