namespace se_project.Models
{
    public class SignInResponse
    {
        public bool Authorized { get; set; }
        public string Guid { get; set; }
        public string Role { get; set; }

        public SignInResponse(bool authorized, string guid, string role)
        {
            Authorized = authorized;
            Guid = guid;
            Role = role;
        }
    }
}