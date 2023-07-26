using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace reactnet.API
{
    public class Startup
    {
        // Startup.cs
        public void ConfigureServices(IServiceCollection services)
        {
            // Diğer servis konfigürasyonları...

            services.AddCors(options =>
            {
                options.AddPolicy("ReactAppPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Diğer yapılandırmalar...

            app.UseCors("ReactAppPolicy");
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

    }
}

