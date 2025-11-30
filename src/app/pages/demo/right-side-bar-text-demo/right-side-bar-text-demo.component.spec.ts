import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightSideBarTextDemoComponent } from './right-side-bar-text-demo.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RightSideBarTextComponent', () => {
  let component: RightSideBarTextDemoComponent;
  let fixture: ComponentFixture<RightSideBarTextDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports:[ SharedModule ],
      providers:[]
    }).compileComponents()
    fixture = TestBed.createComponent(RightSideBarTextDemoComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
