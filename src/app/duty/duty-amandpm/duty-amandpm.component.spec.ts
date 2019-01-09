import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyAmandpmComponent } from './duty-amandpm.component';

describe('DutyAmandpmComponent', () => {
  let component: DutyAmandpmComponent;
  let fixture: ComponentFixture<DutyAmandpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyAmandpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyAmandpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
