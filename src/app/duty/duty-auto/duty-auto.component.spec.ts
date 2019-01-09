import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyAutoComponent } from './duty-auto.component';

describe('DutyAutoComponent', () => {
  let component: DutyAutoComponent;
  let fixture: ComponentFixture<DutyAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
