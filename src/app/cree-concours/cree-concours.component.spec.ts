import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeConcoursComponent } from './cree-concours.component';

describe('CreeConcoursComponent', () => {
  let component: CreeConcoursComponent;
  let fixture: ComponentFixture<CreeConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreeConcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreeConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
