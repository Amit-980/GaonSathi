# GaonSathi

GaonSathi is a simple village services booking app with a Spring Boot backend and React frontend.

## Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

H2 database console:

```text
http://localhost:8080/h2-console
```

Use this JDBC URL in the H2 console:

```text
jdbc:h2:file:./data/gaonsathi
```

## Run Frontend

```bash
cd frontend
npm start
```

Frontend URL:

```text
http://localhost:3000
```

## MySQL Mode

Start MySQL, create a database named `gaonsathi`, then run:

```bash
cd backend
DB_PASSWORD='your_mysql_password' ./mvnw spring-boot:run -Dspring-boot.run.profiles=mysql
```

## Checks

```bash
cd backend
./mvnw test
./mvnw -DskipTests package

cd ../frontend
npm test -- --watchAll=false
npm run build
```
