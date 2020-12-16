# Pull down an image from Docker Hub that includes the .NET core SDK: 
# https://hub.docker.com/_/microsoft-dotnet-core-sdk
# This is so we have all the tools necessary to compile the app.

FROM docker.io/bachm44/ubuntu-dotnet3.1-node:stable AS build


# Copy the source from your machine onto the container.
WORKDIR /src
COPY . .

# Install dependencies. 
# https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-restore?tabs=netcore2x
RUN dotnet restore "./se-project.csproj"

# Compile, then pack the compiled app and dependencies into a deployable unit.
# https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-publish?tabs=netcore21
RUN dotnet publish "se-project.csproj" -c Release -o /app/publish

# Pull down an image from Docker Hub that includes only the ASP.NET core runtime:
# https://hub.docker.com/_/microsoft-dotnet-core-aspnet/
# We don't need the SDK anymore, so this will produce a lighter-weight image
# that can still run the app.
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim

# Copy the published app to this new runtime-only container.
COPY --from=build /app/publish .

# To run the app, run `dotnet se-project.dll`, which we just copied over.
ENTRYPOINT ["dotnet", "se-project.dll"]
