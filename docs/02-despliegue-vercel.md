# Despliegue en Vercel

El proyecto es un sitio estático de Astro: no necesita adaptador ni variables de
entorno. Vercel detecta Astro automáticamente.

---

## 1. Antes de subir

```bash
npm install
npm run build            # debe terminar sin errores
node tools/auditar.mjs   # debe decir «Sin hallazgos»
```

Confirmar además:

- `src/data/site.ts` con los datos reales y `AVISO_PENDIENTES = false`.
- `astro.config.mjs` → `site` con el dominio definitivo.
- `public/robots.txt` con el dominio definitivo en la línea del sitemap.

---

## 2. Cuenta y repositorio

1. Crear la cuenta de Vercel a nombre del cliente.
2. Subir el proyecto a un repositorio de GitHub (puede ser privado).
3. En Vercel: *Add New → Project → Import Git Repository*.
4. Framework preset: **Astro** (lo detecta solo). Build command `npm run build`,
   output directory `dist`. No agregar variables de entorno.
5. Deploy. Queda disponible en `https://<proyecto>.vercel.app`.

Cada `git push` genera un despliegue nuevo y cada pull request genera una URL de
vista previa para revisar cambios sin tocar producción.

---

## 3. Dominio

Opción A, comprar el dominio dentro de Vercel: lo más simple, porque DNS, SSL y
renovación quedan en un solo lugar. En *Settings → Domains* se agrega
`aeternacare.cl` y `www.aeternacare.cl`, y se elige cuál redirige a cuál.

Opción B, dominio comprado en otro proveedor (NIC Chile u otro). Se agrega el
dominio en Vercel y luego se crean estos registros en el proveedor:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Vercel muestra los valores exactos al agregar el dominio: usar los que aparezcan
en pantalla, porque pueden variar. El certificado SSL se emite automáticamente
al propagarse el DNS (puede tardar de minutos a algunas horas).

---

## 4. Correo corporativo y formulario

El formulario debe llegar a un correo del cliente. Recomendaciones:

- Correo corporativo: Google Workspace o Zoho Mail apuntando al dominio.
- Envío del formulario: Formspree, Basin, Resend o un webhook a un CRM.
  Cualquiera de ellos entrega una URL que se pega en `src/data/site.ts` →
  `formularioEndpoint`.

Sin endpoint configurado, el formulario funciona igual: al enviarlo se abre
WhatsApp con los datos escritos, para no perder el contacto.

---

## 5. Después del despliegue

- Verificar `https://dominio/robots.txt` y `https://dominio/sitemap-index.xml`.
- Dar de alta el sitio en Google Search Console.
- Crear la ficha de Google Business Profile con la misma dirección y horario del
  sitio: es el factor local más importante para este rubro.
- Revisar en móvil: menú, formulario y botón de WhatsApp.
