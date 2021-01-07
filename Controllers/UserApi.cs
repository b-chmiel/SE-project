using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using se_project.Attributes;
using se_project.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace se_project.Controllers
{
    [ApiController]
    public class UserApi : ControllerBase
    {
        private readonly CompanyDBEntities _context;
        public UserApi(CompanyDBEntities context)
        {
            _context = context;
        }
        
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
            body.Guid = Guid.NewGuid().ToString();
            Console.WriteLine(body);
            _context.Add(body);

            return StatusCode(201, body);
            
            //return StatusCode(400);


            throw new NotImplementedException();
        }

        /// <summary>
        /// Find user by GUID
        /// </summary>
        /// <remarks>Returns a single user</remarks>
        /// <param name="guid">GUID of user to return</param>
        /// <response code="200">Successful operation</response>
        /// <response code="400">Invalid GUID supplied</response>
        /// <response code="404">User not found</response>
        [HttpGet]
        [Route("/api/0.1.1/user/{guid}")]
        [ValidateModelState]
        [SwaggerOperation("GetUserByGuid")]
        [SwaggerResponse(statusCode: 200, type: typeof(User), description: "Successful operation")]
        public virtual IActionResult GetUserByGuid([FromRoute][Required]string guid)
        {
            if (string.IsNullOrEmpty(guid))
            {
                return StatusCode(400);
            }
            
            var user = _context.Users.FirstOrDefault(x => x.Guid.Equals(guid));
            if (user is null)
            {
                return StatusCode(400);
            }
            return new ObjectResult(user);
        }

        /// <param name="body">New user attributes</param>
        /// <response code="400">Validation exception</response>
        [HttpPost]
        [Route("/api/0.1.1/user/signin")]
        [ValidateModelState]
        [SwaggerOperation("SignIn")]
        public virtual IActionResult SignIn([FromBody]Authentication body)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username.Equals(body.Username) && x.Password.Equals(body.Password));
            if (user is null)
            {
                return StatusCode(404);
            }
            return new ObjectResult(user.Guid);
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