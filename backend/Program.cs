using API.Data;
using API.Entities;
using API.Interfaces.Managers;
using API.Interfaces.Repositories;
using API.Managers;
using API.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace API
{
    public class Program
    {
        public static string GetGUID() => Guid.NewGuid().ToString();
        public Program(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public object JwtBearerDefault { get; private set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            var jwtOptionsSection = Configuration.GetRequiredSection("Jwt");

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FileStorage", Version = "v1" });

                //for auth token in swagger
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. /n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      /nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                });
                //--
            });

            // code written by me
            services.AddControllersWithViews()
                       .AddNewtonsoftJson(options =>
                       options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<User, IdentityRole<string>>()
                       .AddEntityFrameworkStores<AppDbContext>()
                       .AddDefaultTokenProviders();
            services.AddCors(options =>
            {
                options.AddPolicy(name: "_allowSpecificOrigins",
                                  builder =>
                                  {
                                      builder.WithOrigins("localhost:3000", "http://localhost:3000", "https://localhost:3000", "http://localhost:5173", "https://localhost:5173", "localhost:5173").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                                  });
            });
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer("AuthScheme", options =>
            {
                options.SaveToken = true;
                var secret = Configuration.GetSection("Jwt").GetSection("Token").Get<string>();
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    RequireExpirationTime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddScoped<IAuthManager, AuthManager>();
            services.AddScoped<IAuthTokenManager, AuthTokenManager>();
            services.AddScoped<IDirectoryManager, DirectoryManager>();
            services.AddScoped<IFileManager, FileManager>();
            services.AddScoped<IDirectoryRepository, DirectoryRepository>();
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IFileDataManager, FileDataManager>();
            services.AddScoped<IFileDataRepository, FileDataRepository>();
            services.AddScoped<IUserProfileImageManager, UserProfileImageManager>();
            services.AddScoped<IUserProfileImageRepository, UserProfileImageRepository>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("User", policy => policy.RequireRole("User")
                .RequireAuthenticatedUser().AddAuthenticationSchemes("AuthScheme").Build());

                options.AddPolicy("Admin", policy => policy.RequireRole("Admin")
                .RequireAuthenticatedUser().AddAuthenticationSchemes("AuthScheme").Build());

                options.AddPolicy("Sysadmin", policy => policy.RequireRole("SysAdmin")
                .RequireAuthenticatedUser().AddAuthenticationSchemes("AuthScheme").Build());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IConfiguration configuration, RoleManager<IdentityRole<string>> roleManager, UserManager<User> userManager, AppDbContext appDbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseRouting();

            app.UseCors("_allowSpecificOrigins");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Ensure the database is created.
            appDbContext.Database.EnsureCreated();

            CreateRoles(roleManager).GetAwaiter().GetResult();
            CreateAdmins(userManager, configuration).GetAwaiter().GetResult();
        }

        private static async Task CreateRoles(RoleManager<IdentityRole<string>> roleManager)
        {
            bool userRoleExists = await roleManager.RoleExistsAsync("User");
            bool adminRoleExists = await roleManager.RoleExistsAsync("Admin");
            bool sysAdminRoleExists = await roleManager.RoleExistsAsync("SysAdmin");

            if (!userRoleExists)
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }
            if (!adminRoleExists)
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            if (!sysAdminRoleExists)
            {
                await roleManager.CreateAsync(new IdentityRole("SysAdmin"));
            }
        }

        /// <summary>
        /// Adds the default admin users if they are not present in the database.
        /// </summary>
        private static async Task CreateAdmins(UserManager<User> userManager, IConfiguration configuration)
        {
            //create the default admin
            if (await userManager.FindByNameAsync("admin") == null)
            {
                List<string> adminRoles = new() { "User", "Admin" };
                var adminUser = new User()
                {
                    UserName = "admin",
                    Email = "",
                    EmailConfirmed = true,
                };
                var result = await userManager.CreateAsync(adminUser, configuration.GetValue<string>("RootPasswords:adminPassword"));

                if (!result.Succeeded)
                    throw new Exception("Could not create the default admin!");

                foreach (string role in adminRoles)
                    await userManager.AddToRoleAsync(adminUser, role);
            }

            //create the default sysadmin
            if (await userManager.FindByNameAsync("sysadmin") == null)
            {
                List<string> adminRoles = new() { "User", "Admin", "SysAdmin" };
                var adminUser = new User()
                {
                    UserName = "sysadmin",
                    Email = "",
                    EmailConfirmed = true,
                };

                var result = await userManager.CreateAsync(adminUser, configuration.GetValue<string>("RootPasswords:sysAdminPassword"));

                if (!result.Succeeded)
                    throw new Exception("Could not create the default sysadmin!");

                foreach (string role in adminRoles)
                    await userManager.AddToRoleAsync(adminUser, role);
            }
        }
    }
}
