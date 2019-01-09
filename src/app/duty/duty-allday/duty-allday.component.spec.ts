import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyAlldayComponent } from './duty-allday.component';

describe('DutyAlldayComponent', () => {
  let component: DutyAlldayComponent;
  let fixture: ComponentFixture<DutyAlldayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyAlldayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyAlldayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
