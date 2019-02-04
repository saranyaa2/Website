import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }
  createDb() {
    const users = [
      { id: 11, firstName: 'Ammu', lastName: 'Saran', email: 'xyz@gmail.com', password: 'xyzz' },
      { id: 12, firstName: 'Kitty', lastName: 'Teddy', email: 'abc@gmail.com', password: 'xyzz' }
    ];

    const menu = [
      {id: 1, title: 'home', link: '/home'},
      {id: 2, title: 'about', link: '/about'},
      {id: 3, title: 'gallery', link: '/gallery'},
      {id: 4, title: 'services', link: '/services'},
      {id: 5, title: 'testimonials', link: '/testimonials'},
      {id: 6, title: 'clients', link: '/clients'},
      {id: 7, title: 'pricing', link: '/pricing'},
      {id: 8, title: 'blog', link: '/blog'},
    ];

    const posts = [
      { id: 1, title: 'The first Article', author: 'LOLITA', image: 'gallery-image-1.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 2, title: 'The second Article', author: 'LOLITA', image: 'gallery-image-2.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 3, title: 'The third Article', author: 'LOLITA', image: 'gallery-image-3.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 4, title: 'The fourth Article', author: 'LOLITA', image: 'gallery-image-4.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 5, title: 'The fifth Article', author: 'LOLITA', image: 'gallery-image-5.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 6, title: 'The sixth Article', author: 'LOLITA', image: 'gallery-image-6.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 7, title: 'The seven Article', author: 'LOLITA', image: 'gallery-image-1.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 8, title: 'The eight Article', author: 'LOLITA', image: 'gallery-image-3.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 9, title: 'The nine Article', author: 'LOLITA', image: 'gallery-image-5.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 10, title: 'The ten Article', author: 'LOLITA', image: 'gallery-image-2.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'},
      { id: 11, title: 'The eleven Article', author: 'LOLITA', image: 'gallery-image-6.jpg', publishdate: '2019-01-08T07:22Z', excert: 'This is the summary of the article...'}
  ];

    return {users, posts, menu};
  }

  getToken(user){
    return 'this is a token';
  }

  get (reqInfo: RequestInfo){
    if(reqInfo.collectionName === 'posts') {
    return this.getArticles(reqInfo);
  }
   return undefined;
}

getArticles(reqInfo: RequestInfo) {

  return reqInfo.utils.createResponse$(() => {
    const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation
    const collection = reqInfo.collection;
    const id = reqInfo.id;
     const data = id === undefined ? collection : reqInfo.utils.findById(collection, id);

     const options: ResponseOptions = data ?
     {
       body: dataEncapsulation ? { data } : data,
       status: 200
     }:
     {
       body: { error: `Post not found` },
       status: 400
     };

     options.statusText = options.status === 200 ? 'ok': 'Not Found' ;
     options.headers = reqInfo.headers;
     options.url = reqInfo.url;
     return options;
     
   });
}

  post(reqInfo: RequestInfo) {

    if(reqInfo.id === 'login') {
      console.log('from login');
      return reqInfo.utils.createResponse$(() => {
       const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation
        const users = reqInfo.collection.find(user => {
         return reqInfo.req['body'].email === user.email && reqInfo.req['body'].password === user.password;
        });

        let responseBody = {};

        if (users) {
          responseBody = {
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            token: this.getToken(users)
          };
        }

        const options: ResponseOptions = responseBody ?
        {
          body: dataEncapsulation ? { responseBody } : responseBody,
          status: 200
        }:
        {
          body: { error: `'Users with email'='${reqInfo.req['body'].email}' not found` },
          status: 400
        };

        options.statusText = options.status === 200 ? 'ok': 'Not Found' ;
        options.headers = reqInfo.headers;
        options.url = reqInfo.url;
        return options;
        
      });


    }else if(reqInfo.id === 'signup'){
      reqInfo.id = null;
      console.log('from signup');
    }
  }
}
