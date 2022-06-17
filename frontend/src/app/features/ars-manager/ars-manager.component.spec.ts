import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsManagerComponent } from './ars-manager.component';

describe('ArsManagerComponent', () => {
  let component: ArsManagerComponent;
  let fixture: ComponentFixture<ArsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
