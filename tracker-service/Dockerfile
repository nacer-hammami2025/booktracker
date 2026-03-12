FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY pom.xml ./pom.xml
RUN mvn install -N
COPY tracker-service/pom.xml tracker-service/pom.xml
WORKDIR /app/tracker-service
RUN mvn dependency:go-offline -B
COPY tracker-service/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/tracker-service/target/*.jar app.jar
EXPOSE 8083
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8083/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
