import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftSideBarComponent } from './left-side-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LeftSideBarComponent', () => {
  let component: LeftSideBarComponent;
  let fixture: ComponentFixture<LeftSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSideBarComponent ],
      imports: [SharedModule],
      providers: []
    }).compileComponents()
    fixture = TestBed.createComponent(LeftSideBarComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
