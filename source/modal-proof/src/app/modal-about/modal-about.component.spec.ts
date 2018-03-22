import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAboutComponent } from './modal-about.component';

describe('ModalAboutComponent', () => {
  let component: ModalAboutComponent;
  let fixture: ComponentFixture<ModalAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
