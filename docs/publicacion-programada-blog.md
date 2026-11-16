# Publicación programada del blog

Los artículos con una fecha `fecha` futura no se generan como páginas ni se muestran en el listado del blog. Al llegar su fecha, el sitio requiere un despliegue estático para incluirlos.

El flujo `.github/workflows/publicar-articulos-programados.yml` solicita ese despliegue en los horarios definidos. Se puede agregar el secreto `VERCEL_DEPLOY_HOOK` en GitHub para llamar directamente a un Deploy Hook. Si no se configura, la acción genera un commit vacío en `main`, que solicita el despliegue cuando el proyecto está conectado a GitHub en Vercel.

Los disparadores incluidos son de una sola fecha (16 de noviembre de 2026, hora de Chile continental). GitHub Actions puede iniciar un trabajo programado con retraso. Para nuevas publicaciones hay que editar el flujo con las nuevas fechas y poner el timestamp de publicación en el frontmatter.
