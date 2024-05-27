# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# Use the official ASP.NET image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
# Ensure Data Protection Keys directory exists and has the correct permissions
RUN mkdir -p /home/app/.aspnet/DataProtection-Keys \
    && chown -R app:app /home/app/.aspnet

# Use the official SDK image for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["online-documents-storage-API.csproj", "."]
RUN dotnet restore "./online-documents-storage-API.csproj"

COPY . .
WORKDIR "/src/."
RUN dotnet build "./online-documents-storage-API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./online-documents-storage-API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# CMD [ "dotnet", "online-documents-storage-API.dll"]
COPY ./entrypoint.sh ./
CMD ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ["./entrypoint.sh"]
