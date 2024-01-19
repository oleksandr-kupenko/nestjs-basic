## Stack
- NestJs
- Sqlite

## Description
Backend application with basic functionality. Allow you to create reports (reviews) about the car. 
The administrator can approve them. A get query with filtering returns the average price with the specified report characteristics.

## Functional
- Two entities (user and reports)
- Validation ([class-validator](https://docs.nestjs.com/techniques/validation))
- Serialization interceptor: exclude extraneous values from response, like password. It's more flexible approach than in the documentation
- Cookies authorization ([cookie-session](https://www.npmjs.com/package/cookie-session)): middleware find current user by id (from cookie) and put it to request
- Role of administrator and user: user can create reports, admin can also approve it (change value of approved)
- Environment settings: different databased for tests and development
- Ormconfig for different environments
- Working unit and e2e test examples (only for users)

## Commands
```bash
 #run dev
 npm run start:dev

 #unit tests
  npm run test:watch

  #e2e tests
  npm run test:e2e
  
  #create migration
  npm run typeorm migration:generate -n migrations/[migration name] -- -o
  
  #run migration
  npm run typeorm migration:run

```
