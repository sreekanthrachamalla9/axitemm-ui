import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      loginUser: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation error if form is invalid and submitted', () => {
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(authServiceMock.loginUser).not.toHaveBeenCalled();
  });

  it('should login successfully and store token in localStorage', () => {
    const mockToken = 'mock-token';
    const mockResponse = { data: { token: mockToken } };

    const setItemSpy = jest.spyOn(localStorage, 'setItem');

    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    authServiceMock.loginUser.mockReturnValue(of(mockResponse));

    component.onSubmit();

    expect(authServiceMock.loginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });

    expect(setItemSpy).toHaveBeenCalledWith('token', mockToken);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should log error if login fails', () => {
    const error = new Error('Login failed');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    component.loginForm.setValue({ email: 'wrong@example.com', password: 'wrongpass' });
    authServiceMock.loginUser.mockReturnValue(throwError(() => error));

    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('❌ Login Error:', error);
  });
});
