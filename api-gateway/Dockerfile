# Build stage
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy parent POM and install it (non-recursive)
COPY pom.xml ./pom.xml
RUN mvn install -N

# Copy service POM
COPY api-gateway/pom.xml api-gateway/pom.xml

# Download dependencies
WORKDIR /app/api-gateway
RUN mvn dependency:go-offline -B

# Copy source code
COPY api-gateway/src ./src

# Build application
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/api-gateway/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
