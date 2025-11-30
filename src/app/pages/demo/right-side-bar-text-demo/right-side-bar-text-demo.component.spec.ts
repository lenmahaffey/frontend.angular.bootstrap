import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightSideBarTextComponent } from './right-side-bar-text-demo.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RightSideBarTextComponent', () => {
  let component: RightSideBarTextComponent;
  let fixture: ComponentFixture<RightSideBarTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[ SharedModule ],
      providers:[]
    }).compileComponents()
    fixture = TestBed.createComponent(RightSideBarTextComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
