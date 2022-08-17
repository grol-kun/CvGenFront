import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { from, of } from 'rxjs';
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let httpClient: HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(service).toBeTruthy();
    });

    /*     it('должен возвращать UserInfo с сервера', inject([AuthService], async (service: AuthService) => {
      //spyOn(httpClient, 'get').and.callFake(() => from(user))
      spyOn(httpClient, 'get').and.returnValue(from(user))

      let result;
      service.getUserInfo().subscribe(data => result = data);
      expect(result).toEqual(user);

    })); */

    /*     it('должен возвращать UserInfo с сервера', inject([AuthService], async (service: AuthService) => {
          const result = service.getToken();
          expect(result).toEqual('1');

        })); */

  });
});
