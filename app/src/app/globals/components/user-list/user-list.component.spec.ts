import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { AuthService } from '../../services/auth.service';

// Create a mock AuthService
const mockAuthService = {
  getDashboard: jest.fn(),
  deleteUser: jest.fn()
};

// Create a mock Router
const mockRouter = {
  navigate: jest.fn()
};

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UserListComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    jest.clearAllMocks(); // clear mocks before each test
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const mockUsers = [{ id: 1, username: 'John', email: 'john@example.com' }];
    mockAuthService.getDashboard.mockReturnValue(of({ data: mockUsers }));

    component.ngOnInit();

    expect(mockAuthService.getDashboard).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should handle error when loading users', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('API error');
    mockAuthService.getDashboard.mockReturnValue(throwError(() => error));

    component.loadUsers();

    expect(consoleSpy).toHaveBeenCalledWith(
      // expect.stringContaining('Error loading users'),
      // expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it('should navigate to /signup on onAddUser()', () => {
    component.onAddUser();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signup']);
  });

  it('should navigate to edit-user on editUser()', () => {
    component.editUser(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-user', 1]);
  });

  it('should navigate to view-user on viewUser()', () => {
    component.viewUser(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/view', 2]);
  });

  it('should call deleteUser and reload users on delete', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    mockAuthService.deleteUser.mockReturnValue(of({}));
    mockAuthService.getDashboard.mockReturnValue(of({ data: [] }));

    component.onDelete(1);

    expect(mockAuthService.deleteUser).toHaveBeenCalledWith(1);
    expect(mockAuthService.getDashboard).toHaveBeenCalled(); // reload
    confirmSpy.mockRestore();
  });

  it('should not call deleteUser if confirm is false', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

    component.onDelete(99);

    expect(mockAuthService.deleteUser).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });

  it('should handle error on delete failure', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockAuthService.deleteUser.mockReturnValue(throwError(() => new Error('Delete error')));

    component.onDelete(3);

    expect(consoleSpy).toHaveBeenCalledWith(
      // expect.stringContaining('Delete failed:'),
      // expect.any(Error)
    );

    confirmSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
