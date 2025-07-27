# مرحله build با Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# کپی و نصب وابستگی‌ها
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./
COPY . .

RUN npm install
RUN npm run build

# مرحله نهایی: سرو با NGINX
FROM nginx:alpine

# کپی فایل‌های ساخته‌شده به nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# حذف کانفیگ پیش‌فرض و جایگزینی با کانفیگ React routing-friendly
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
