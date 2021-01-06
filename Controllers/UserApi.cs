using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using se_project.Attributes;
using se_project.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace se_project.Controllers
{
    [ApiController]
    public class UserApi : ControllerBase
    {
        /// <summary>
        /// Add new user to the system
        /// </summary>
        
        /// <param name="body">New user attributes</param>
        /// <response code="400">Validation exception</response>
        [HttpPost]
        [Route("/api/0.1.1/user")]
        [ValidateModelState]
        [SwaggerOperation("AddUser")]
        public virtual IActionResult AddUser([FromBody]User body)
        { 
            Console.WriteLine(Guid.NewGuid());
            return StatusCode(400);


            throw new NotImplementedException();
        }

        /// <summary>
        /// Find user by GUID
        /// </summary>
        /// <remarks>Returns a single user</remarks>
        /// <param name="Id">GUID of user to return</param>
        /// <response code="200">Successful operation</response>
        /// <response code="400">Invalid GUID supplied</response>
        /// <response code="404">User not found</response>
        [HttpGet]
        [Route("/api/0.1.1/user/{Id}")]
        [ValidateModelState]
        [SwaggerOperation("GetUserByGuid")]
        [SwaggerResponse(statusCode: 200, type: typeof(User), description: "Successful operation")]
        public virtual IActionResult GetUserByGuid([FromRoute][Required]int? Guid)
        { 
            //TODO: Uncomment the next line to return response 200 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(200, default(ModelUser));

            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);

            string exampleJson = null;
            exampleJson = "{\n  \"Id\" : 152,\n  \"phoneNumber\" : \"+48 123 456 789\",\n  \"surname\" : \"Kowalski\",\n  \"name\" : \"Jan\",\n  \"discount\" : 5,\n  \"email\" : \"kowalski@example.com\"\n}";
            
            var example = exampleJson != null
            ? JsonConvert.DeserializeObject<User>(exampleJson)
            : default(User);
            //TODO: Change the data returned
            return new ObjectResult(example);
        }

        /// <summary>
        /// Update an existing user
        /// </summary>
        
        /// <param name="body">New user object</param>
        /// <response code="400">Validation exception</response>
        /// <response code="404">User not found</response>
        [HttpPut]
        [Route("/api/0.1.1/user")]
        [ValidateModelState]
        [SwaggerOperation("UpdateUser")]
        public virtual IActionResult UpdateUser([FromBody]User body)
        { 
            //TODO: Uncomment the next line to return response 400 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(400);

            //TODO: Uncomment the next line to return response 404 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(404);


            throw new NotImplementedException();
        }
    }
}