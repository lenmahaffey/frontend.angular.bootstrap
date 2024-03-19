import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RightSideBarComponent } from './right-side-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RightSideBarComponent', () => {
  let component: RightSideBarComponent;
  let fixture: ComponentFixture<RightSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSideBarComponent ],
      imports: [ HttpClientTestingModule, SharedModule ],
    });
    fixture = TestBed.createComponent(RightSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
