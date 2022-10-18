using ASPA.DAL.Security;
using spa.DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace ASPA.DAL.Repository.ApplicationUser
{
    public class ApplicationUserRepository : RepositoryBase<User, int>, IApplicationUserRepository
    {
        public ApplicationUserRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
