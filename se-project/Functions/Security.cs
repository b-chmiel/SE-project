using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using se_project.Models;

namespace se_project.Functions
{
    public class SecurityException : Exception
    {
        public SecurityException() { }

        public SecurityException(string message) : base(message) { }

        public SecurityException(string message, Exception inner) : base(message, inner) { }
    }
    public class Security
    {
        public static (string username, Models.UserType type) SolveGUID(CompanyDBEntities _context, string guid)
        {
            var user = _context.Users.First(x => x.Guid.Equals(guid));
            if (user is null)
            {
                throw new SecurityException("Guid not found");
            }
            return (user.Username, user.UserType);
        }
    }
}
