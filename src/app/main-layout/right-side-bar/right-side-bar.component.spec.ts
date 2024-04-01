import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightSideBarComponent } from './right-side-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RightSideBarComponent', () => {
  let component: RightSideBarComponent;
  let fixture: ComponentFixture<RightSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ SharedModule ],
      providers: []
    }).compileComponents()
    fixture = TestBed.createComponent(RightSideBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
