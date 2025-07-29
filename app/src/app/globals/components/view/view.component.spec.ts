import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewComponent } from './view.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

// Mock ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jest.fn().mockReturnValue('1'), // simulate id = 1
    },
  },
};

// Mock AuthService
const mockAuthService = {
  getUserById: jest.fn().mockReturnValue(of({
    data: {
      username: 'sreekanth',
      email: 'sree@example.com',
    }
  })),
};

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user by ID and assign user data', () => {
    expect(mockAuthService.getUserById).toHaveBeenCalledWith(1);
    expect(component.user).toEqual({
      username: 'sreekanth',
      email: 'sree@example.com',
    });
  });

  it('should handle invalid ID', () => {
    // Override mock to return NaN
    jest.spyOn(mockActivatedRoute.snapshot.paramMap, 'get').mockReturnValueOnce('invalid');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Invalid user ID');
    consoleSpy.mockRestore();
  });

  it('should handle API error', () => {
  mockAuthService.getUserById.mockReturnValueOnce(throwError(() => new Error('API failed')));
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  component.ngOnInit();

  expect(console.error).toHaveBeenCalledWith(
    // expect.stringContaining('Error fetching user'),
    // expect.anything()
  );

  consoleSpy.mockRestore();
});

});
