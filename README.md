## Table of contents

- [Service](#service)

  - [General info](#service)

  - [Architecture](#service-architecture)

  - [Functionalities](#service-functionality)

  - [Database](#about-database)

  - [Configuration files](#service-configuration-files)

## Service

Service enables interactions between UI and database providing multiple (22) methods processing database content to useful form.

### Service architecture

As part of RESTful system the logic of service is deployed as single unit meeting criteria of all-in-one monolithic application. Logic, data computing are carried with controllers while data structures are defined as models. Data access is implemented with entity framework using Npgsql as ADO.NET data provider.

### Service functionality

Service allows:

- creating user accounts,
- to authenticate with UUID,
- managing cars, insurances,
- storing car diagnostic data and
- administering visits.

Currently used endpoints along with their documentation can be found [here](https://se-project-2020.herokuapp.com/swagger); prepared with OpenAPI – available [here](https://se-project-2020.herokuapp.com/swagger-implemented.json) and in [project files (*wwwroot/swagger-implemented.json*)](wwwroot\swagger-implemented.json).

### About database

1. Connection string must be provided in file [*appsettings.json*](appsettings.json) in the same manner as the exemplary data delivered with application. You will need the following data:

   - host address,
   - port (5432 by default),
   - username,
   - password,
   - database name.

2. To deploy database you have to invoke the following commands in the project folder:

   ```
   dotnet ef migrations add migration
   dotnet ef database update
   ```

### Service configuration files

[*appsettings.json*](appsettings.json) contains data required to access database. More in section [above](#about-database).
