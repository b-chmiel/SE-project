using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.SwaggerGen;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using se_project.Attributes;
using Microsoft.AspNetCore.Authorization;
using se_project.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Validator = se_project.Functions.Validator;
using ValidationException = se_project.Functions.ValidationException;
using se_project.Functions;

namespace se_project.Controllers
{ 
    [ApiController]
    public class CarsApiController : ControllerBase
    {
        private readonly CompanyDBEntities _context;
        public CarsApiController(CompanyDBEntities context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("/api/0.1.1/cars")]
        [ValidateModelState]
        [SwaggerOperation("AddCar")]
        public virtual IActionResult AddCar([FromBody]Car car)
        {
            (string, UserType) sender;
            try
            {
                sender = Security.SolveGUID(_context, Request.Headers["Guid"]);
            }
            catch (Exception e)
            {
                return StatusCode(401, e.Message);
            }
            if (!String.IsNullOrEmpty(car.Username)&&(!car.Username.Equals(sender.Item1)&&sender.Item2!=UserType.WORKSHOP_EMPLOYEE))
                return StatusCode(403);
            if (String.IsNullOrEmpty(car.Username))
            {
                car.Username = sender.Item1;
            }
            try
            {
                Validator.Validate(_context, car);
            }
            catch (ValidationException e)
            {
                return StatusCode(400, e.Message);
            }
            car.Owner = _context.Users.First(x => x.Username.Equals(car.Username));

            DiagnosticProfile diagnosticProfile = new DiagnosticProfile
            {
                LicensePlate = car.LicensePlate
            };
            car.DiagnosticProfile = diagnosticProfile;

            _context.Add(car);
            _context.Add(diagnosticProfile);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return StatusCode(400, e.Message+" -> "+e.InnerException.Message);
            }
            return new ObjectResult (car);
        }

        [HttpGet]
        [Route("/api/0.1.1/cars/{licensePlate}")]
        [ValidateModelState]
        [SwaggerOperation("GetCar")]
        [SwaggerResponse(statusCode: 200, type: typeof(Car), description: "Successful operation")]
        public virtual IActionResult GetCar([FromRoute][Required]string licensePlate)
        {
            if (string.IsNullOrEmpty(licensePlate))
            {
                return StatusCode(400);
            }
            (string, UserType) sender;
            try
            {
                sender = Security.SolveGUID(_context, Request.Headers["Guid"]);
            }
            catch (Exception e)
            {
                return StatusCode(401, e.Message);
            }
            var car = _context.Cars.First(x => x.LicensePlate.Equals(licensePlate));
            if ((!car.Username.Equals(sender.Item1))&&!(sender.Item2==UserType.WORKSHOP_EMPLOYEE||sender.Item2==UserType.INSURANCE_EMPLOYEE))
                return StatusCode(403);
            if (car is null)
            {
                return StatusCode(404);
            }
            return new ObjectResult(car);
        }

        [HttpGet]
        [Route("/api/0.1.1/cars")]
        [ValidateModelState]
        [SwaggerOperation("GetCars")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<Car>), description: "Successful operation")]
        public virtual IActionResult GetCars()
        {
            (string, UserType) sender;
            try
            {
                sender = Security.SolveGUID(_context, Request.Headers["Guid"]);
            }
            catch (Exception e)
            {
                return StatusCode(401, e.Message);
            }
            List<Car> cars;
            if (sender.Item2 == UserType.CLIENT)
                cars = _context.Cars.Where(x => x.Username.Equals(sender.Item1)).ToList();
            else if (sender.Item2 == UserType.WORKSHOP_EMPLOYEE) {
                var visits = _context.Users.First(x => x.Username.Equals(sender.Item1)).AssignedVisits;
                if (visits != null || visits.Count != 0) cars = new List<Car>();
                else cars = visits.Select(x => x.Visit.Car).ToList();
            }
            else if (sender.Item2 == UserType.INSURANCE_EMPLOYEE)
                cars = _context.Cars.ToList();
            else return StatusCode(403);
            return new ObjectResult(cars);
        }

        [HttpGet]
        [Route("/api/0.1.1/cars/{licensePlate}/insurance")]
        [ValidateModelState]
        [SwaggerOperation("GetInsurance")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<Insurance>), description: "Successful operation")]
        public virtual IActionResult GetInsurance([FromRoute][Required]int? licensePlate)
        { 
            //TODO: Uncomment the next line to return response 200 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(200, default(List<Insurance>));

            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);

            string exampleJson = null;
            exampleJson = "[ {\n  \"coverage\" : 100000,\n  \"dateOfExpiry\" : \"2020-12-30T23:59:59.999+01\",\n  \"type\" : \"liability insurance\"\n}, {\n  \"coverage\" : 100000,\n  \"dateOfExpiry\" : \"2020-12-30T23:59:59.999+01\",\n  \"type\" : \"liability insurance\"\n} ]";
            
            var example = exampleJson != null
            ? JsonConvert.DeserializeObject<List<Insurance>>(exampleJson)
            : default(List<Insurance>);
            //TODO: Change the data returned
            return new ObjectResult(example);
        }

        [HttpGet]
        [Route("/api/0.1.1/cars/{licensePlate}/profile")]
        [ValidateModelState]
        [SwaggerOperation("GetProfile")]
        [SwaggerResponse(statusCode: 200, type: typeof(DiagnosticProfile), description: "Successful operation")]
        public virtual IActionResult GetProfile([FromRoute][Required]string licensePlate)
        {
            if (string.IsNullOrEmpty(licensePlate))
            {
                return StatusCode(400);
            }
            (string, UserType) sender;
            try
            {
                sender = Security.SolveGUID(_context, Request.Headers["Guid"]);
            }
            catch (Exception e)
            {
                return StatusCode(401, e.Message);
            }
            var diagnosticProfile = _context.DiagnosticProfiles.First(x => x.LicensePlate.Equals(licensePlate));
            if ((!diagnosticProfile.Car.Username.Equals(sender.Item1)) && !(sender.Item2 == UserType.WORKSHOP_EMPLOYEE || sender.Item2 == UserType.INSURANCE_EMPLOYEE))
                return StatusCode(403);
            if (diagnosticProfile is null)
            {
                return StatusCode(404);
            }
            return new ObjectResult(diagnosticProfile);
        }

        [HttpPut]
        [Route("/api/0.1.1/cars/{licensePlate}/insurance")]
        [ValidateModelState]
        [SwaggerOperation("PutInsurance")]
        public virtual IActionResult PutInsurance([FromRoute][Required]int? licensePlate, [FromBody]Client insurance)
        { 
            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);


            throw new NotImplementedException();
        }

        [HttpPut]
        [Route("/api/0.1.1/cars/{licensePlate}/profile")]
        [ValidateModelState]
        [SwaggerOperation("SetProfile")]
        public virtual IActionResult SetProfile([FromRoute][Required]string licensePlate, [FromBody]DiagnosticProfile profile)
        {
            if (string.IsNullOrWhiteSpace(licensePlate))
            {
                throw new ArgumentException($"'{nameof(licensePlate)}' cannot be null or whitespace", nameof(licensePlate));
            }
            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);


            throw new NotImplementedException();
        }
    }
}
