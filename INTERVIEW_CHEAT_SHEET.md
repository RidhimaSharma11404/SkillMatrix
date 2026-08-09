# 🎯 Cognizant Interview Cheat Sheet for SkillMatrix

Use this guide to confidently explain your project and answer technical questions during your Cognizant Full-Stack Java interview.

---

## 🎙️ 1. Your 30-Second Project Introduction Pitch

> *"I developed **SkillMatrix**, an enterprise full-stack web application designed to solve an internal challenge faced by IT consultancies like Cognizant: efficiently matching bench developers to new client projects based on technical skill sets and experience levels.*
> 
> *On the backend, I used **Spring Boot 3** with a layered architecture (`Controller` $\rightarrow$ `Service` $\rightarrow$ `Repository`), implementing the DTO pattern, Bean Validation, and centralized Global Exception Handling with `@RestControllerAdvice`. I used **Spring Data JPA** for data persistence with an in-memory H2 database.*
> 
> *On the frontend, I built a responsive UI with **React** using functional components and hooks (`useState`, `useEffect`, `useCallback`) to support real-time skill filtering, instant allocation status updates, and interactive analytics."*

---

## 🏛️ 2. Key Architecture Concepts in this Project

```
[React Frontend (Vite)]  <--- HTTP / JSON REST APIs (CORS Configured) --->  [Spring Boot Backend]
      │                                                                           │
      ├── useState & useEffect                                                    ├── Controller Layer (@RestController)
      ├── Modular Components                                                      ├── DTO Layer (Validation with @Valid)
      └── Async REST Service (Fetch)                                              ├── Service Layer (@Service, @Transactional)
                                                                                  ├── Repository Layer (Spring Data JPA)
                                                                                  └── Database (H2 / Hibernate ORM)
```

---

## ❓ 3. Top 15 Cognizant Technical Questions & Exact Answers

### Q1: Why did you use a Layered Architecture (`Controller` -> `Service` -> `Repository`)?
**Answer:** 
- **Separation of Concerns**: Each layer has a single responsibility.
  - `Controller`: Handles HTTP requests, endpoint routing, and status codes.
  - `Service`: Encapsulates business logic, transactions (`@Transactional`), and entity-DTO conversions.
  - `Repository`: Communicates directly with the database using Spring Data JPA.
- This promotes loose coupling, high testability (we can mock the repository to unit test the service with Mockito), and maintainability.

---

### Q2: What is the difference between `@Controller` and `@RestController`?
**Answer:**
- `@Controller` is used in traditional Spring MVC applications where methods return view names (like JSP or Thymeleaf templates).
- `@RestController` is a convenience annotation that combines `@Controller` and `@ResponseBody`. It automatically serializes return values into JSON/XML payloads for HTTP response bodies.

---

### Q3: Why did you use DTOs instead of returning JPA Entities directly in the Controller?
**Answer:**
1. **Security & Data Encapsulation**: Prevents exposing internal database structures or sensitive fields (e.g., internal audit timestamps, passwords).
2. **Decoupling**: Prevents breaking external API clients when internal database schemas change.
3. **Avoid Infinite Recursion**: Prevents circular reference issues when serializing entities with `@ManyToMany` or bidirectional relationships to JSON.
4. **Validation**: Allows validating client inputs specifically tailored for create/update operations via `@NotBlank`, `@Email`, etc.

---

### Q4: How does Global Exception Handling work in your project?
**Answer:**
I used `@RestControllerAdvice` in `GlobalExceptionHandler.java` with `@ExceptionHandler` methods:
- Catches custom exceptions like `ResourceNotFoundException` and returns a clean `404 Not Found` response.
- Catches `DuplicateResourceException` and returns `409 Conflict`.
- Catches `MethodArgumentNotValidException` (triggered when `@Valid` fails on DTOs) and returns `400 Bad Request` with an array of specific field validation error messages.

---

### Q5: How did you configure CORS between React (Port 5173) and Spring Boot (Port 8080)?
**Answer:**
Browsers block cross-origin requests by default due to the Same-Origin Policy.
In Spring Boot, I implemented `WebMvcConfigurer` in `CorsConfig.java` and allowed origins `http://localhost:5173`, enabling HTTP methods `GET, POST, PUT, PATCH, DELETE`. In Vite, I also configured a proxy in `vite.config.js`.

---

### Q6: What is the difference between `PUT` and `PATCH` methods in your API?
**Answer:**
- `PUT` (`/api/v1/developers/{id}`): Used for **complete replacement/update** of the developer profile (name, email, role, skills, experience).
- `PATCH` (`/api/v1/developers/{id}/allocate`): Used for **partial modification** of specific fields (only updating the developer's `status` and `currentProject`).

---

### Q7: What are the benefits of Spring Data JPA over traditional JDBC?
**Answer:**
1. Eliminates boilerplate SQL code and `ResultSet` mapping.
2. Provides built-in CRUD and pagination methods out of the box (`findAll()`, `save()`, `deleteById()`).
3. Supports derived query methods (e.g., `findByStatus(status)`) and custom JPQL queries.
4. Handles automatic transaction management and connection pooling.

---

### Q8: What is Inversion of Control (IoC) and Dependency Injection (DI) in Spring?
**Answer:**
- **IoC (Inversion of Control)**: The framework (Spring IoC Container) controls the lifecycle and creation of objects instead of the developer manually instantiating them with `new`.
- **DI (Dependency Injection)**: The process where the container injects dependent beans into other beans (e.g., injecting `DeveloperRepository` into `DeveloperServiceImpl` via constructor injection).

---

### Q9: Why is Constructor Injection preferred over `@Autowired` on fields?
**Answer:**
1. **Immutability**: Allows fields to be declared as `final`.
2. **Testability**: Makes it trivial to pass mock objects directly in unit tests without needing Spring reflection.
3. **Fail-Fast**: Prevents `NullPointerException` at runtime if a dependency is missing.

---

### Q10: How do React Hooks like `useState` and `useEffect` work in your UI?
**Answer:**
- `useState`: Manages local component state (e.g., list of developers, search query, modal open/close status).
- `useEffect`: Triggers side effects such as fetching developers and stats from the backend REST API when the component mounts or when filter states change.
- `useCallback`: Memoizes the fetch function to prevent unnecessary re-creations across renders.

---

### Q11: What is the Virtual DOM in React?
**Answer:**
The Virtual DOM is an in-memory representation of the real DOM. When component state changes, React updates the Virtual DOM, performs a diffing algorithm (Reconciliation) against the previous tree, and batches only the minimum required changes to the real browser DOM, resulting in superior performance.

---

### Q12: How does `@Transactional` work in your Service layer?
**Answer:**
`@Transactional` creates a transactional boundary using Spring AOP proxy. If an unchecked exception (`RuntimeException`) occurs during execution, the transaction rolls back automatically to ensure database consistency. For read-only operations (`getAllDevelopers`), `@Transactional(readOnly = true)` optimizes database queries by disabling dirty checking.

---

### Q13: What happens when the Spring Boot application starts?
**Answer:**
1. `SpringApplication.run()` is invoked.
2. Spring Boot sets up the ApplicationContext and registers beans.
3. Auto-configuration activates based on classpath dependencies (Tomcat embedded server starts on 8080, Hibernate initializes schema for H2).
4. `DataInitializer` (`CommandLineRunner`) runs to populate realistic seed developer profiles.

---

### Q14: How did you test your application?
**Answer:**
- **Unit Testing**: Used **JUnit 5** and **Mockito** in `DeveloperServiceTest.java` to test service logic in isolation by mocking the repository layer.
- **API Testing**: Used the interactive **Swagger / OpenAPI UI** at `/swagger-ui.html` for manual API validation.

---

### Q15: If you had more time, what enhancements would you add?
**Answer:**
1. **Spring Security & JWT**: Add role-based authentication (Admin vs Project Manager).
2. **Database Migration**: Switch from H2 to PostgreSQL/MySQL using Flyway/Liquibase.
3. **Kafka Event Streaming**: Publish an event whenever a developer is allocated so other microservices (like Billing/Payroll) are automatically notified.
