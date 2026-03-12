# Build stage
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /build

# Copy and install parent POM
COPY pom.xml ./
RUN mvn -N install

# Copy auth-service
COPY auth-service auth-service/

# Build auth-service
WORKDIR /build/auth-service
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy JAR
COPY --from=build /build/auth-service/target/*.jar app.jar

# Expose port
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8081/actuator/health || exit 1

# Run
ENTRYPOINT ["java", "-jar", "app.jar"]
