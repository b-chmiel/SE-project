using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Moq;
using se_project;
using se_project.Controllers;
using se_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace se_project_tests
{
    public class CarsApiControllerTest
    {
        private const string TEST_LICENSE_PLATE = "test";
        private const string TEST_GUID = "123";
        private const string TEST_USERNAME ="username";
        private Mock<CompanyDBEntities> dbEntities;
        private Mock<DbSet<Car>> carsDbSet;
        private HeaderDictionary headers;
        private ControllerContext controllerContext;
        private CarsApiController controller;

        private void Init(List<Car> cars, List<User> users)
        {
            dbEntities = new Mock<CompanyDBEntities>();

            var usersDbSet = MockDbSet(users);
            dbEntities.Setup(x => x.Users).Returns(usersDbSet.Object);

            carsDbSet = MockDbSet(cars);
            dbEntities.Setup(x => x.Cars).Returns(carsDbSet.Object);

            var mockRequest = new Mock<HttpRequest>();
            headers = new HeaderDictionary();
            headers["Guid"] = TEST_GUID;
            mockRequest.Setup(x => x.Headers).Returns(headers);

            var httpContext = Mock.Of<HttpContext>(_ =>
                _.Request == mockRequest.Object
            );
            //Controller needs a controller context 
            controllerContext = new ControllerContext()
            {
                HttpContext = httpContext
            };
            controller = new CarsApiController(dbEntities.Object)
            {
                ControllerContext = controllerContext
            };

        }

        private static Mock<DbSet<T>> MockDbSet<T>(List<T> list) where T : class
        {
            var result = new Mock<DbSet<T>>();
            var data = list.AsQueryable();

            result.As<IQueryable<T>>().Setup(m => m.Provider).Returns(data.Provider);
            result.As<IQueryable<T>>().Setup(m => m.Expression).Returns(data.Expression);
            result.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(data.ElementType);
            result.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            return result;
        }

        #region Get Car
        [Fact]
        public void TestGetCarEmptyLicensePlate()
        {
            CarsApiController controller = new CarsApiController(null);
            StatusCodeResult result = controller.GetCar(null) as StatusCodeResult;
            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode);
        }

  

        [Fact]
        public void TestGetCarSuccessful()
        {
            List<User> users = new List<User>
            {
                new User() {Guid = TEST_GUID, Username = TEST_USERNAME}
            };
            List<Car> cars = new List<Car>
            {
                new Car() { LicensePlate = TEST_LICENSE_PLATE, Username = TEST_USERNAME }
            };

            Init(cars, users);
            ObjectResult result = controller.GetCar(TEST_LICENSE_PLATE) as ObjectResult;
            dbEntities.Verify(x => x.Users, Times.Once());
            dbEntities.Verify(x => x.Cars, Times.Once());
            Assert.NotNull(result);
        }

        [Fact]
        public void TestGetCarInvalidUser()
        {
            List<User> users = new List<User>
            {
                new User() {Guid = "Wrong Guid", Username = TEST_USERNAME}
            };
            List<Car> cars = new List<Car>
            {
                new Car() { LicensePlate = TEST_LICENSE_PLATE, Username = TEST_USERNAME }
            };

            Init(cars, users);

            ObjectResult result = controller.GetCar(TEST_LICENSE_PLATE) as ObjectResult;
            Assert.NotNull(result);
            Assert.Equal(401, result.StatusCode);
        }

        [Fact]
        public void TestInvalidCarUsername()
        {
            List<User> users = new List<User>
            {
                new User() {Guid = TEST_GUID, Username = TEST_USERNAME, UserType = UserType.CLIENT}
            };
            List<Car> cars = new List<Car>
            {
                new Car() { LicensePlate = TEST_LICENSE_PLATE, Username = "Invalid Username" }
            };

            Init(cars, users);

            StatusCodeResult result = controller.GetCar(TEST_LICENSE_PLATE) as StatusCodeResult;
            Assert.NotNull(result);
            Assert.Equal(403, result.StatusCode);
        }

        [Fact]
        public void TestGetCarNotFound()
        {
            List<User> users = new List<User>
            {
                new User() {Guid = TEST_GUID, Username = TEST_USERNAME}
            };
            List<Car> cars = new List<Car>
            {
                new Car() { LicensePlate = "1", Username = TEST_USERNAME }
            };

            Init(cars, users);
            StatusCodeResult result = controller.GetCar(TEST_LICENSE_PLATE) as StatusCodeResult;
            Assert.NotNull(result);
            Assert.Equal(404, result.StatusCode);

        }
        #endregion


        [Fact]
        public void TestGetServiceEmployeeCarsSuccessful()  //fails, as it returns empty list instead of a list with one car
        {
            List <EmployeeVisit> visitList = new List<EmployeeVisit>();
            var employeeVisit = new EmployeeVisit();
            Visit visit = new Visit();
            employeeVisit.Visit = visit;
            visitList.Add(employeeVisit);

            List<User> users = new List<User>
            {
                new User() {Guid = TEST_GUID, Username = TEST_USERNAME, AssignedVisits = visitList }
            };
            Car car = new Car() { LicensePlate = TEST_LICENSE_PLATE, Username = TEST_USERNAME };
            List<Car> cars = new List<Car>
            {
                car
            };
            visit.Car = car;

            Init(cars, users);
            ObjectResult result = controller.GetCars() as ObjectResult;
            Assert.NotNull(result);
            List<Car> expectedCars = result.Value as List<Car>;
            Assert.NotNull(expectedCars);
            Assert.Single(expectedCars);
            Assert.Equal(expectedCars[0], car);
        }


        [Fact]
        public void TestGetClientCarsSuccessful() 
        {
            List<EmployeeVisit> visitList = new List<EmployeeVisit>();
            var employeeVisit = new EmployeeVisit();
            Visit visit = new Visit();
            employeeVisit.Visit = visit;
            visitList.Add(employeeVisit);

            List<User> users = new List<User>
            {
                new User() {Guid = TEST_GUID, Username = TEST_USERNAME, AssignedVisits = visitList, UserType = UserType.CLIENT }
            };
            Car car = new Car() { LicensePlate = TEST_LICENSE_PLATE, Username = TEST_USERNAME };
            List<Car> cars = new List<Car>
            {
                car
            };
            visit.Car = car;

            Init(cars, users);
            ObjectResult result = controller.GetCars() as ObjectResult;
            Assert.NotNull(result);
            List<Car> expectedCars = result.Value as List<Car>;
            Assert.NotNull(expectedCars);
            Assert.Single(expectedCars);
            Assert.Equal(expectedCars[0], car);
        }

        [Fact]
        public void TestGetCarsInvalidUser()
        {
            List<User> users = new List<User>
            {
                new User() {Guid = "Wrong Guid", Username = TEST_USERNAME}
            };
            List<Car> cars = new List<Car>
            {
                new Car() { LicensePlate = TEST_LICENSE_PLATE, Username = TEST_USERNAME }
            };

            Init(cars, users);

            ObjectResult result = controller.GetCars() as ObjectResult;
            Assert.NotNull(result);
            Assert.Equal(401, result.StatusCode);
        }
    }
}
