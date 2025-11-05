# La Usina Rifas (MVP listo para Vercel)

Rifas estilo “cine”: reserva por 10 minutos, pago con Mercado Pago y mail de confirmación.

## 1) Subir a Vercel
- Entrá a https://vercel.com → Add New → Project → **Upload** y subí este ZIP.
- En Settings → Environment Variables cargá:
  - `DATABASE_URL` (Postgres de Neon/Supabase)
  - `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` (Upstash)
  - `MP_ACCESS_TOKEN` (Mercado Pago, producción)
  - `RESEND_API_KEY` (Resend)
  - `NEXTAUTH_SECRET` (cadena segura)
  - `CURRENCY` = ARS
  - `BRAND_NAME` = La Usina Rifas
  - `NEXT_PUBLIC_BASE_URL` = la URL que te da Vercel (ej: https://tu-proyecto.vercel.app)

> El build corre `prisma migrate deploy` para crear las tablas.

## 2) Crear tu primera rifa
- Abrí `/admin` y creá una rifa (título, slug, precio, total).
- Abrí `/rifa/TU-SLUG` y elegí números para probar.

## 3) Mercado Pago: Webhook
- En **Mercado Pago → Webhooks** pegá:
  - `https://tu-proyecto.vercel.app/api/mp/webhook`
  - Evento: **payment**

## 4) Emails
- Verificá el remitente/dominio en Resend para asegurar entrega.

## Notas de MVP
- El webhook es simplificado. En producción conviene consultar a la API de MP con el `payment_id` y validar `status=approved` y `preference_id`/`external_reference`.
- /admin sin autenticación (para ir rápido). Se puede sumar NextAuth más adelante.
