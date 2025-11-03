src/
 ├─ presentation/        <-- capa de presentación
 │   ├─ controllers/     <-- controladores REST o GraphQL
 │   ├─ dtos/            <-- Data Transfer Objects para validar y mapear datos de entrada
 │   └─ interceptors/    <-- interceptores, pipes o filtros de entrada
 ├─ application/         <-- casos de uso / services del dominio
 ├─ domain/              <-- entidades, reglas de negocio
 └─ infrastructure/      <-- persistencia, mensajería, adaptadores externos


🔥 Regla de oro:
✅ USA DI para TODO lo que esté en infrastructure/:

  🗄️ Repositorios (DB, cache, files)
  🌐 APIs externas (IA, email, SMS)
  📊 Logging (console, files, cloud)
  🔐 Auth (JWT, OAuth, SAML)
  🔔 Notificaciones (push, email, webhook)
  📁 Storage (local, S3, GCS)

❌ NO uses DI para cosas en domain/ y application/:

  🧮 Cálculos puros (math, validation)
  🎨 Formateo (string manipulation)
  🧩 Utils (helpers sin estado)

📋 Conclusión:

  SÍ, usa DI con TODOS los adaptadores. Es el patrón fundamental de arquitectura hexagonal:

  Domain = Sin dependencias externas
  Application = Depende solo de puertos (interfaces)
  Infrastructure = TODOS los adaptadores con DI
  Presentation = Depende solo de application