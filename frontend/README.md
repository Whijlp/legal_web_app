
Aplicación Preator – Gestión de Tutelas

Descripción

Esta aplicación web está diseñada para la gestión de información judicial mediante una interfaz clara y organizada. Permite a los usuarios acceder a diferentes módulos y pestañas para registrar, consultar y actualizar datos, todo sincronizado con una base de datos en MongoDB.

Incluye funcionalidades como:

Landing Page con noticias destacadas.
Login seguro con manejo de roles 
Registro de tutelas con campos estructurados.
Manejo de roles diferenciados: Administrador, Notificador y Consultor.
Cálculo automático de fechas de vencimiento con base en días hábiles.
Sincronización de la información entre pestañas mediante un contexto global (TabsContext).
Guardado de tutelas en una base de datos MongoDB a través de un backend en Node.js/Express.
Validaciones con Yup para garantizar la integridad de los datos.
Autenticación con protección de rutas y permisos según rol.

Tecnologías utilizadas
Frontend

React (con hooks useState, useEffect, useContext)
JSX, JS,  HTML, CSS 
React Context API para manejo global del estado de las pestañas

Backend

Node.js + Express → Servidor API REST
Mongoose → Modelado y conexión con MongoDB
JWT (JSON Web Token) → Autenticación y autorización por roles
Middlewares personalizados → Validación de permisos (permit), autenticación (auth), validación de datos con Yup

Base de Datos
MongoDB (con colecciones para tutelas, fallos, apelaciones, incidentes, etc.)

https://github.com/Whijlp/legal_web_app
