import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLayoutComponent, HeaderComponent, FooterComponent, LeftSideBarComponent, RightSideBarComponent],
      imports: [SharedModule, ServicesModule, RouterModule],
      providers: []
    }).compileComponents()
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
