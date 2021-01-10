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
        public virtual IActionResult AddUser([FromBody] User body)
        {
            body.Guid = Guid.NewGuid().ToString();
            _context.Users.Add(body);
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return StatusCode(400);
            }

            return StatusCode(200, body);
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
        public virtual IActionResult GetUserByGuid([FromRoute] [Required] string guid)
        {
            if (string.IsNullOrEmpty(guid))
            {
                return StatusCode(400);
            }

            var user = _context.Users.FirstOrDefault(x => x.Guid.Equals(guid));
            if (user is null)
            {
                return StatusCode(404);
            }
            return new ObjectResult(user);
        }

        /// <param name="body">New user attributes</param>
        /// <response code="400">Validation exception</response>
        [HttpPost]
        [Route("/api/0.1.1/user/signin")]
        [ValidateModelState]
        [SwaggerOperation("SignIn")]
        public virtual IActionResult SignIn([FromBody] Authentication body)
        {
            var user = _context.Users.FirstOrDefault(x =>
                x.Username.Equals(body.Username) && x.Password.Equals(body.Password));
            if (user is null) return StatusCode(404);
            return new ObjectResult(new SignInResponse(user.Guid, user.UserType.ToString()));
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
        public virtual IActionResult UpdateUser([FromBody] User body)
        {
            var user = _context.Users.FirstOrDefault(x => x.Guid.Equals(body.Guid));
            if (user is null)
            {
                return StatusCode(404);
            }

            if (!string.IsNullOrEmpty(body.Name))
            {
                user.Name = body.Name;
            }
            if (!string.IsNullOrEmpty(body.Surname))
            {
                user.Surname = body.Surname;
            }
            if (!string.IsNullOrEmpty(body.Username) && _context.Users.FirstOrDefault(x => x.Guid.Equals(body.Guid)) == null)
            {
                user.Username = body.Username;
            }
            if (!string.IsNullOrEmpty(body.Password))
            {
                user.Password = body.Password;
            }
            if (!string.IsNullOrEmpty(body.Email))
            {
                user.Email = body.Email;
            }
            if (!string.IsNullOrEmpty(body.PhoneNumber))
            {
                user.PhoneNumber = body.PhoneNumber;
            }
            if (!string.IsNullOrEmpty(body.UserType.ToString()))
            {
                user.UserType = body.UserType;
            }

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return StatusCode(400);
            }

            return StatusCode(200, body);
        }

        /// <summary>
        /// Get all client&#39;s visits
        /// </summary>
        /// <param name="username"></param>
        /// <response code="200">Successful operation</response>
        /// <response code="404">Client not found</response>
        [HttpGet]
        [Route("/api/0.1.1/user/{username}/visits")]
        [ValidateModelState]
        [SwaggerOperation("GetUserVisits")]
        [SwaggerResponse(statusCode: 200, type: typeof(List<Visit>), description: "Successful operation")]
        public virtual IActionResult GetClientVisits([FromRoute][Required]string username)
        { 
            var user = _context.Users.FirstOrDefault(x => x.Username.Equals(username));
            if (user is null)
            {
                return StatusCode(404);
            }

            if (user.UserType != UserType.CLIENT)
            {
                return StatusCode(404);
            }

            var visits = _context.Visits.Where(x => x.CarOwnerUsername == username);

            return new ObjectResult(visits);
        }
        
        /// <summary>
        /// Set client&#39;s discount
        /// </summary>
        /// <remarks>Accepts discount in percentage (0-30)</remarks>
        /// <param name="username">Client id</param>
        /// <param name="body">New client&#39;s discount</param>
        /// <response code="400">Validation exception</response>
        /// <response code="404">Client not found</response>
        [HttpPut]
        [Route("/api/0.1.1/user/{username}/set_discount")]
        [ValidateModelState]
        [SwaggerOperation("SetDiscount")]
        public virtual IActionResult SetDiscount([FromRoute][Required]string username, [FromBody]Body2 body)
        { 
            var user = _context.Users.FirstOrDefault(x => x.Username.Equals(username));
            if (user is null)
            {
                return StatusCode(404);
            }

            if (user.UserType != UserType.CLIENT)
            {
                return StatusCode(400);
            }

            user.Discount = body.Discount;
            return new ObjectResult(user);
        }
    }
}