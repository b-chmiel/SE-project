using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using se_project.Attributes;
using se_project.Functions;
using se_project.Models;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using ValidationException = se_project.Functions.ValidationException;
using Validator = se_project.Functions.Validator;

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
        public virtual IActionResult AddCar([FromBody] Car car)
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
            if (!String.IsNullOrEmpty(car.Username) && (!car.Username.Equals(sender.Item1) && sender.Item2 != UserType.WORKSHOP_EMPLOYEE))
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
            car.Owner = _context.Users.FirstOrDefault(x => x.Username.Equals(car.Username));

            DiagnosticProfile diagnosticProfile = new DiagnosticProfile
            {
                LicensePlate = car.LicensePlate
            };
            car.DiagnosticProfile = diagnosticProfile;
            diagnosticProfile.Car = car;
            car.Insurances = new List<Insurance>();

            _context.Add(car);
            _context.Add(diagnosticProfile);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                return StatusCode(400, e.Message + " -> " + e.InnerException.Message);
            }
            return new ObjectResult(car);
        }

        [HttpGet]
        [Route("/api/0.1.1/cars/{licensePlate}")]
        [ValidateModelState]
        [SwaggerOperation("GetCar")]
        [SwaggerResponse(statusCode: 200, type: typeof(Car), description: "Successful operation")]
        public virtual IActionResult GetCar([FromRoute][Required] string licensePlate)
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
            var car = _context.Cars.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate));
            if ((car != null && !car.Username.Equals(sender.Item1)) && !(sender.Item2 == UserType.WORKSHOP_EMPLOYEE || sender.Item2 == UserType.INSURANCE_EMPLOYEE))
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
            else if (sender.Item2 == UserType.WORKSHOP_EMPLOYEE)
            {
                var visits = _context.Users.FirstOrDefault(x => x.Username.Equals(sender.Item1)).AssignedVisits;
                if (visits == null) cars = new List<Car>();
                else cars = visits.Select(x => x.Visit.Car).ToList();
            }
            else if (sender.Item2 == UserType.INSURANCE_EMPLOYEE)
                cars = _context.Cars.ToList();
            else return StatusCode(403);
            return new ObjectResult(cars);
        }

        [HttpGet]
        [Route("/api/0.1.1/cars/{licensePlate}/insurances")]
        [ValidateModelState]
        [SwaggerOperation("GetInsurance")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<Insurance>), description: "Successful operation")]
        public virtual IActionResult GetInsurance([FromRoute][Required] string licensePlate)
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
            var car = _context.Cars.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate));
            if ((car != null && !car.Username.Equals(sender.Item1)) && !(sender.Item2 == UserType.WORKSHOP_EMPLOYEE || sender.Item2 == UserType.INSURANCE_EMPLOYEE))
                return StatusCode(403);
            if (car is null)
                return StatusCode(404);
            return new ObjectResult(_context.Insurances.Where(x => x.LicensePlate.Equals(licensePlate)).ToArray());
        }

        [HttpGet]
        [Route("/api/0.1.1/cars/{licensePlate}/profile")]
        [ValidateModelState]
        [SwaggerOperation("GetProfile")]
        [SwaggerResponse(statusCode: 200, type: typeof(DiagnosticProfile), description: "Successful operation")]
        public virtual IActionResult GetProfile([FromRoute][Required] string licensePlate)
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
            var diagnosticProfile = _context.DiagnosticProfiles.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate));
            //Due to problem with diagnosticProfile.car = null:
            Car car = _context.Cars.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate));
            if ((car != null && !car.Username.Equals(sender.Item1)) && !(sender.Item2 == UserType.WORKSHOP_EMPLOYEE || sender.Item2 == UserType.INSURANCE_EMPLOYEE))
                return StatusCode(403);
            //if ((!diagnosticProfile.Car.Username.Equals(sender.Item1)) && !(sender.Item2 == UserType.WORKSHOP_EMPLOYEE || sender.Item2 == UserType.INSURANCE_EMPLOYEE))
            //return StatusCode(403);
            if (diagnosticProfile is null)
            {
                return StatusCode(404);
            }
            return new ObjectResult(diagnosticProfile);
        }

        [HttpPut]
        [Route("/api/0.1.1/cars/{licensePlate}/insurances")]
        [ValidateModelState]
        [SwaggerOperation("PutInsurance")]
        public virtual IActionResult PutInsurance([FromRoute][Required] string licensePlate, [FromBody] Insurance body)
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
            var insurance = _context.Insurances.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate) && x.Type == body.Type);
            //Due to problem with diagnosticProfile.car = null:
            Car car = _context.Cars.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate));
            if ((car != null && !car.Username.Equals(sender.Item1)) && !(sender.Item2 == UserType.WORKSHOP_EMPLOYEE || sender.Item2 == UserType.INSURANCE_EMPLOYEE))
                return StatusCode(403);
            //if ((insurance != null && !insurance.Car.Username.Equals(sender.Item1)) && !(sender.Item2 == UserType.WORKSHOP_EMPLOYEE || sender.Item2 == UserType.INSURANCE_EMPLOYEE))
            //    return StatusCode(403);
            body.LicensePlate = licensePlate;
            if (insurance is null)
                _context.Add(body);
            else
            {
                insurance.Coverage = body.Coverage;
                insurance.DateOfExpiry = body.DateOfExpiry;
            }
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return StatusCode(400);
            }
            return new ObjectResult(_context.Insurances.Where(x => x.LicensePlate.Equals(licensePlate)).ToArray());
        }

        [HttpPut]
        [Route("/api/0.1.1/cars/{licensePlate}/profile")]
        [ValidateModelState]
        [SwaggerOperation("SetProfile")]
        public virtual IActionResult SetProfile([FromRoute][Required] string licensePlate, [FromBody] DiagnosticProfile body)
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
            var diagnosticProfile = _context.DiagnosticProfiles.FirstOrDefault(x => x.LicensePlate.Equals(licensePlate));
            if (sender.Item2 != UserType.WORKSHOP_EMPLOYEE)
                return StatusCode(403);
            if (diagnosticProfile is null)
                return StatusCode(404);
            if (body.Engine != null) diagnosticProfile.Engine = body.Engine;
            if (body.Body != null) diagnosticProfile.Body = body.Body;
            if (body.LowVoltage != null) diagnosticProfile.LowVoltage = body.LowVoltage;
            if (body.Lighting != null) diagnosticProfile.Lighting = body.Lighting;
            if (body.Brakes != null) diagnosticProfile.Brakes = body.Brakes;
            if (body.Sensors != null) diagnosticProfile.Sensors = body.Sensors;
            if (body.Miscellaneous != null) diagnosticProfile.Miscellaneous = body.Miscellaneous;
            if (body.Conditioning != null) diagnosticProfile.Conditioning = body.Conditioning;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return StatusCode(400);
            }
            return new ObjectResult(diagnosticProfile);
        }
    }
}
