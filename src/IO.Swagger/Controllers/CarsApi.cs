/*
 * Car Workshop
 *
 * <h2> WILL BE UPDATED!</h2></br><b>Incomplete</b> API for car workshop system (lacks employees and parts management).</br><a href=\"https://app.swaggerhub.com/apis/soft_eng/project/0.1.1\">Swagger project (contains models)</a>.
 *
 * OpenAPI spec version: 0.1.1
 * Contact: k.baciejowski@gmail.com
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.SwaggerGen;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using IO.Swagger.Attributes;
using IO.Swagger.Security;
using Microsoft.AspNetCore.Authorization;
using IO.Swagger.Models;

namespace IO.Swagger.Controllers
{ 
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    public class CarsApiController : ControllerBase
    { 
        /// <summary>
        /// Add new car to the system
        /// </summary>
        
        /// <param name="body"></param>
        /// <response code="400">Validation exception</response>
        [HttpPost]
        [Route("/soft_eng/project/0.1.1/car")]
        [ValidateModelState]
        [SwaggerOperation("AddCar")]
        public virtual IActionResult AddCar([FromBody]Car body)
        { 
            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);


            throw new NotImplementedException();
        }

        /// <summary>
        /// Find car by id
        /// </summary>
        
        /// <param name="carId">Id of car to return</param>
        /// <response code="200">Successful operation</response>
        /// <response code="400">Invalid Id supplied</response>
        /// <response code="404">Car not found</response>
        [HttpGet]
        [Route("/soft_eng/project/0.1.1/car/{carId}")]
        [ValidateModelState]
        [SwaggerOperation("GetCar")]
        [SwaggerResponse(statusCode: 200, type: typeof(Car), description: "Successful operation")]
        public virtual IActionResult GetCar([FromRoute][Required]int? carId)
        { 
            //TODO: Uncomment the next line to return response 200 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(200, default(Car));

            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);

            string exampleJson = null;
            exampleJson = "{\n  \"model\" : \"Škoda Fabia 2012\",\n  \"type\" : \"sedan\",\n  \"carId\" : 301\n}";
            
            var example = exampleJson != null
            ? JsonConvert.DeserializeObject<Car>(exampleJson)
            : default(Car);
            //TODO: Change the data returned
            return new ObjectResult(example);
        }

        /// <summary>
        /// Find insurance by car Id
        /// </summary>
        
        /// <param name="carId">Id of car assigned to insurance</param>
        /// <response code="200">Successful operation</response>
        /// <response code="400">Invalid Id supplied</response>
        /// <response code="404">Car not found</response>
        [HttpGet]
        [Route("/soft_eng/project/0.1.1/car/{carId}/insurance")]
        [ValidateModelState]
        [SwaggerOperation("GetInsurance")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<Insurance>), description: "Successful operation")]
        public virtual IActionResult GetInsurance([FromRoute][Required]int? carId)
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

        /// <summary>
        /// Find diagnostic profile by car Id
        /// </summary>
        
        /// <param name="carId">Id of car assigned to the diagnostic profile</param>
        /// <response code="200">Successful operation</response>
        /// <response code="400">Invalid Id supplied</response>
        /// <response code="404">Car not found</response>
        [HttpGet]
        [Route("/soft_eng/project/0.1.1/car/{carId}/profile")]
        [ValidateModelState]
        [SwaggerOperation("GetProfile")]
        [SwaggerResponse(statusCode: 200, type: typeof(DiagnosticProfile), description: "Successful operation")]
        public virtual IActionResult GetProfile([FromRoute][Required]int? carId)
        { 
            //TODO: Uncomment the next line to return response 200 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(200, default(DiagnosticProfile));

            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);

            string exampleJson = null;
            exampleJson = "{\n  \"sensors\" : \"parking sensors\",\n  \"miscellaneous\" : [ \"miscellaneous\", \"miscellaneous\" ],\n  \"engine\" : \"2120.00cm3\",\n  \"lowVoltage\" : \"12V\",\n  \"brakes\" : \"brakes\",\n  \"conditionig\" : \"full\",\n  \"body\" : \"black\",\n  \"lighting\" : \"lighting\"\n}";
            
            var example = exampleJson != null
            ? JsonConvert.DeserializeObject<DiagnosticProfile>(exampleJson)
            : default(DiagnosticProfile);
            //TODO: Change the data returned
            return new ObjectResult(example);
        }

        /// <summary>
        /// Add/overwrite car insurance
        /// </summary>
        /// <remarks>Adds or overwrites car insurance. Performed action is determined by type of insurance (i.e. if liability insurance exists it will be replaced).</remarks>
        /// <param name="carId">Id of car assigned to insurance</param>
        /// <param name="insurance">New insurance object</param>
        /// <response code="400">Validation exception</response>
        /// <response code="404">Car not found</response>
        [HttpPut]
        [Route("/soft_eng/project/0.1.1/car/{carId}/insurance")]
        [ValidateModelState]
        [SwaggerOperation("PutInsurance")]
        public virtual IActionResult PutInsurance([FromRoute][Required]int? carId, [FromBody]ModelClient insurance)
        { 
            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);


            throw new NotImplementedException();
        }

        /// <summary>
        /// Overwrite car profile
        /// </summary>
        /// <remarks>Overwrites diagnostic profile of designated car.</remarks>
        /// <param name="carId">Id of car assigned to the diagnostic profile</param>
        /// <param name="profile">New diagnostic profile object</param>
        /// <response code="400">Validation exception</response>
        /// <response code="404">Profile not found</response>
        [HttpPut]
        [Route("/soft_eng/project/0.1.1/car/{carId}/profile")]
        [ValidateModelState]
        [SwaggerOperation("SetProfile")]
        public virtual IActionResult SetProfile([FromRoute][Required]int? carId, [FromBody]DiagnosticProfile profile)
        { 
            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);


            throw new NotImplementedException();
        }
    }
}
