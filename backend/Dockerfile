FROM eclipse-temurin:24-jdk
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]