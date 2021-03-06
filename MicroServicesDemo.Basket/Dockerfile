#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 5002

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["MicroServicesDemo.sln", "."]
COPY ["EventBus/EventBus/EventBus.csproj", "EventBus/EventBus/"]
COPY ["EventBus/EventBusRabbitMQ/EventBusRabbitMQ.csproj", "EventBus/EventBusRabbitMQ/"]
COPY ["MicroServicesDemo.Basket/MicroServicesDemo.Basket.csproj", "MicroServicesDemo.Basket/"]

RUN dotnet restore "MicroServicesDemo.sln"

COPY . .
WORKDIR /src/MicroServicesDemo.Basket
RUN dotnet build "MicroServicesDemo.Basket.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MicroServicesDemo.Basket.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MicroServicesDemo.Basket.dll"]