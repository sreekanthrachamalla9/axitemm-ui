import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const dummyUser = { id: 1, username: 'John', email: 'john@example.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    service.getUsers().subscribe((res) => {
      expect(res).toEqual([dummyUser]);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush([dummyUser]);
  });

  it('should login user', () => {
    const loginData = { email: 'john@example.com', password: '1234' };

    service.loginUser(loginData).subscribe((res) => {
      expect(res).toEqual({ token: 'abcd1234' });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'abcd1234' });
  });

  it('should get dashboard', () => {
    service.getDashboard().subscribe((res) => {
      expect(res).toEqual({ message: 'Dashboard data' });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/dashboard');
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Dashboard data' });
  });

  it('should register user', () => {
    const newUser = { username: 'Jane', email: 'jane@example.com' };

    service.registerUser(newUser).subscribe((res) => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/signup');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should delete user', () => {
    service.deleteUser(1).subscribe((res) => {
      expect(res).toEqual({ message: 'User deleted' });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'User deleted' });
  });

  it('should get user by ID', () => {
    service.getUserById(1).subscribe((res) => {
      expect(res).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should update user by PATCH', () => {
    const updateData = { username: 'Updated Name' };

    service.updateUser(1, updateData).subscribe((res) => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('PATCH');
    req.flush({ success: true });
  });

  it('should add user', () => {
    const newUser = { username: 'Jane' };

    service.addUser(newUser).subscribe((res) => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/signup');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should get user by getUserByIds()', () => {
    service.getUserByIds(1).subscribe((res) => {
      expect(res).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should update user by PUT', () => {
    const userData = { username: 'Updated' };

    service.updateUsers(1, userData).subscribe((res) => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });
});
