﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using se_project.Models;
namespace se_project.Functions
{
    public class ValidationException : Exception
    {
        public ValidationException(){}

        public ValidationException(string message): base(message){}

        public ValidationException(string message, Exception inner): base(message, inner){}
    }
    public static class Validator
    {
        public static void Validate(CompanyDBEntities _context, Car car)
        {
            if (car.LicensePlate.Length < 4) throw new ValidationException("Too short license plate");
            var user = _context.Users.First(x => x.Username.Equals(car.Username));
            if (user is null) throw new ValidationException("User does not exist");
        }
    }
}
