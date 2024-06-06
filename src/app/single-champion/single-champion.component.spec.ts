import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChampionComponent } from './single-champion.component';

describe('SingleChampionComponent', () => {
  let component: SingleChampionComponent;
  let fixture: ComponentFixture<SingleChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleChampionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
