import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stockmanagement } from './stockmanagement';

describe('Stockmanagement', () => {
  let component: Stockmanagement;
  let fixture: ComponentFixture<Stockmanagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stockmanagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stockmanagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
