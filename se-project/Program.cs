using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;

namespace se_project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    var port = Environment.GetEnvironmentVariable("PORT");
                    if (port == null)
                    {
                        webBuilder.UseStartup<Startup>();
                    }
                    else
                    {
                        webBuilder.UseStartup<Startup>()
                            .UseUrls("http://*:" + port);
                    }
                });
    }
}