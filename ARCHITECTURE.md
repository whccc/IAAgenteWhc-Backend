# Mi Convención de Arquitectura - ChatIA

## Principios que respeto:
1. **Separación de responsabilidades**: Cada carpeta tiene un propósito específico
2. **Dependencias controladas**: Las dependencias apuntan hacia domain/
3. **Testabilidad**: Cada capa se puede testear independientemente
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades

## Mi estructura definida:

### `domain/` - El corazón del negocio
- **Propósito**: Lógica de negocio pura, independiente de tecnología
- **Contiene**: Entidades, value objects, interfaces de repositorios
- **Regla**: NO puede importar de ninguna otra capa
- **Ejemplo**: `ChatMessage.entity.ts`, `SessionId.vo.ts`

### `application/` - Casos de uso
- **Propósito**: Orquestar la lógica de negocio
- **Contiene**: Servicios de aplicación, casos de uso, DTOs
- **Regla**: Solo puede importar de `domain/`
- **Ejemplo**: `chatIA.service.ts`, `send-message.use-case.ts`

### `infrastructure/` - Adaptadores externos
- **Propósito**: Implementar interfaces definidas en domain/
- **Contiene**: Repositorios, servicios externos, configuraciones
- **Regla**: Implementa interfaces de `domain/`, puede importar de `domain/` y `application/`
- **Ejemplo**: `chatIA.repository.ts`, `openai.service.ts`

### `presentation/` - Interfaz externa
- **Propósito**: Exponer funcionalidad via APIs, manejar requests/responses
- **Contiene**: Controladores, DTOs de API, middlewares
- **Regla**: Solo puede importar de `application/`
- **Ejemplo**: `chatIA.controller.ts`, `send-message.dto.ts`

## Convenciones de nomenclatura:
- **Servicios**: `*.service.ts`
- **Entidades**: `*.entity.ts`
- **Value Objects**: `*.vo.ts`
- **Casos de uso**: `*.use-case.ts`
- **DTOs**: `*.dto.ts`
- **Repositorios**: `*.repository.ts`
- **Controladores**: `*.controller.ts`

## Reglas de escalabilidad:
1. Si un archivo supera 200 líneas → separar por responsabilidades
2. Si un módulo tiene más de 8 archivos en una carpeta → crear subcarpetas
3. Si un dominio tiene más de 5 entidades → considerar split en subdominios

## Ejemplo de crecimiento:
```
application/
├── chatIA.service.ts (inicio - orquestador principal)
├── chat-message.service.ts (cuando crezca)
├── chat-session.service.ts (cuando crezca)
└── ai-processing.service.ts (cuando crezca)
```

Esta es MI convención. La respeto y la hago evolucionar según mis necesidades.