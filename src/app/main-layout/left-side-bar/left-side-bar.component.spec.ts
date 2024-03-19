import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftSideBarComponent } from './left-side-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LeftSideBarComponent', () => {
  let component: LeftSideBarComponent;
  let fixture: ComponentFixture<LeftSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftSideBarComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: []
    });
    fixture = TestBed.createComponent(LeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
