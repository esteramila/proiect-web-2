import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomChampionComponent } from './random-champion.component';

describe('RandomChampionComponent', () => {
  let component: RandomChampionComponent;
  let fixture: ComponentFixture<RandomChampionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomChampionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
