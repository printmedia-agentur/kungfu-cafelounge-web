import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedProfileComponent } from './verified-profile.component';

describe('VerifiedProfileComponent', () => {
  let component: VerifiedProfileComponent;
  let fixture: ComponentFixture<VerifiedProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
