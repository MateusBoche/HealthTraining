import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareToStartComponent } from './prepare-to-start.component';

describe('PrepareToStartComponent', () => {
  let component: PrepareToStartComponent;
  let fixture: ComponentFixture<PrepareToStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareToStartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepareToStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
