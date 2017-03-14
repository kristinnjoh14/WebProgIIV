/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestbed } from '@angular/core/testing';
import { SellersService, Seller, Product} from './sellers.service';
import {BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('Service: SellersService', () => {
  let backend: MockBackend;
  let service: SellersService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [BaseRequestOptions, MockBackend, SellersService{
        deps: [
          MockBackend,
          BaseRequestOptions
        ],
        provide: Http,
        useFactory: (backend: MockBackend, defaultOpgions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }
      }
      ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(SellersService);
  });
  function setupConnections(backend: MockBackend, options: any){
    backend.connections.subscribe((connection: MockConnection) => {
      if(connection.request.url == 'api/sellers'){
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);
        connection.mockRespond(response);
      }
    })
  }
  it('should return a list of all sellers',() => {
    setupConnections(backend,{
        data: [
          {
          id : 1;
          name: 'siggi';
          category : 'stuff';
          imagePath : 'somepath';
          },
          {
          id : 2;
          name: 'kiddi';
          category : 'boringStuff';
          imagePath : 'someOtherpath';
          },
          {
          id : 3;
          name: 'maggi';
          category : 'evenMoreBoringStuff';
          imagePath : 'someOtherDifferentpath';
          }
        ],
        status: 200
    });

    service.getSellers().subscribe((data: Sellers[]) => {
      expect(data.length).toBe(3);
      expect(data[0].name).toBe('siggi');
      expect(data[1].name).toBe('kiddi');
      expect(data[2].name).toBe('maggi');
    })
  })
  it('should return a seller',() => {
    setupConnections(backend,{
        data: [
          {
          id : 1;
          name: 'siggi';
          category : 'stuff';
          imagePath : 'somepath';
          }
          {
          id : 2;
          name: 'kiddi';
          category : 'boringStuff';
          imagePath : 'someOtherpath';
          },
          {
          id : 3;
          name: 'maggi';
          category : 'evenMoreBoringStuff';
          imagePath : 'someOtherDifferentpath';
          }
        ],
        status: 200
    });

    service.getSellerById().subscribe((data: Seller) => {
      expect(data.name).toBe('siggi');
      expect(data.id).toBe(1);
      expect(data.category).toBe('stuff');
    })
  })

  it('should return a list of all products with that sellers ID',() => {
    setupConnections(backend,{
        data: [
        {
        id: 1;
        product: {
          id: 2;
          name: 'productName';
          price: 1000;
          quantitySold: 3;
          quantityInStock: 3;
          imagePath: 'path';
          }
        ],
        status: 200
    });

    service.getProductsBySellerId(1).subscribe((data: Products[]) => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe(1);
      expect(data[0].product.id).toBe(2);
      expect(data[0].product.name).toBe('productName');
    })
  })
});
