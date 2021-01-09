namespace se_project.Models
{
    public class SignInResponse
    {
        public string Guid { get; set; }
        public string Role { get; set; }

        public SignInResponse(bool authorized, string guid, string role)
        {
            Guid = guid;
            Role = role;
        }
    }
}