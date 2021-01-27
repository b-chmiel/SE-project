## Table of contents
- [Overview](#overview)

- [How to run app](#run)

- [Service](#service)

  - [General info](#service)

  - [Architecture](#service-architecture)

  - [Functionalities](#service-functionality)

  - [Database](#about-database)

  - [Configuration files](#service-configuration-files)
  
 
## Overview

Car workshop service web application allows client and employee to manage car visit in the workshop. Client adds a car and report accident, so that an appoinment can be made. Employee accepts visit and update cars state while repairing or maintaing the car. Clear employee interface allows to choose suitable visit to do. After fixes are done and visit is paid the car is ready to collect. 

## How to run app

Install Node.js and .NET framework

Clone project

```
  git clone https://github.com/bachm44/SE-project
   ```

Go to project directory 

 ```
  cd SE-project
   ```

Run project 

 ```
  dotnet run
   ```

Go to 

```
  localhost:5001
   ```
~~Project is also available here
(depricated)
https://se-project-2020.herokuapp.com~~
   
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

Currently used endpoints along with their documentation can be found [here](https://se-project-2020.herokuapp.com/swagger); prepared with OpenAPI – available [here](https://se-project-2020.herokuapp.com/swagger-implemented.json) and in [project files (*wwwroot/swagger-implemented.json*)](wwwroot/swagger-implemented.json).

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
