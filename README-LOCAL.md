# Vite Playlist Generator - Migration Status

## 🎯 Migration: Realm → Firebase + Custom Backend

### ✅ Completed
- **Backend:** Express API with Firebase Auth + MongoDB Atlas
- **Frontend:** React + Vite with Firebase Client SDK
- **Oracle VM:** Docker + Nginx configured, ready for deployment

### 🔄 In Progress
- **CI/CD:** GitHub Actions pipeline created (needs secrets)
- **SSL:** Let's Encrypt configuration ready (needs domain)
- **Production Deploy:** Ready to deploy (needs GitHub secrets setup)

---

## 🏗️ Architecture

### **Production Stack:**
```
Frontend (Vercel) → Backend (Oracle VM) → MongoDB Atlas
     ↓                    ↓
Firebase Auth      Firebase Admin SDK
```

### **Local Development:**
```
Frontend :5173 → Backend :3000 → MongoDB Atlas
```

---

## 🚀 Local Development

### **Prerequisites:**
- Node.js 20+
- MongoDB Atlas URI
- Firebase project credentials

### **Setup:**
```bash
# Install all dependencies
npm run install:all

# Configure environment files:
# backend/.env - MongoDB URI + Firebase Admin SDK
# frontend/.env.local - Firebase Client config

# Start development
npm run dev
```

### **URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health check: http://localhost:3000/health

---

## 🐳 Production Deployment

### **Oracle VM Setup:** ✅ COMPLETED
- Ubuntu 22.04 with Docker + Docker Compose
- SSL directories created
- Firewall configured (80, 443, SSH)

### **Next Steps:**
1. **GitHub Secrets** - Add deployment credentials
2. **Domain/SSL** - Configure Let's Encrypt
3. **Deploy** - Push to main triggers auto-deployment

### **Deployment Flow:**
```bash
git push main → GitHub Actions → SSH to Oracle VM → Docker deploy
```

---

## 📋 API Endpoints

### **Authentication:** Firebase Bearer Token
```
Authorization: Bearer <firebase-id-token>
```

### **Endpoints:**
- `POST /api/playlists/generate` - Generate playlist
- `PUT /api/titles/genres` - Update genres
- `PUT /api/titles/url` - Update URL
- `PUT /api/titles/instruments` - Add instruments
- `GET /health` - Health check

---

## 🔧 Key Changes from Realm

### **Authentication:**
- **Before:** RealmWeb.Credentials
- **After:** Firebase signInWithEmailAndPassword()

### **Database Access:**
- **Before:** Direct Realm → MongoDB
- **After:** Frontend → Express API → MongoDB Atlas

### **Functions:**
- **Before:** Realm Functions
- **After:** Express routes with same business logic

### **Deployment:**
- **Before:** MongoDB managed
- **After:** Vercel (frontend) + Oracle VM (backend)

---

## 🎉 Migration Status

**Code Migration:** ✅ Complete
**Local Development:** ✅ Working
**Production Setup:** 🔄 Oracle VM ready, needs deployment
**Next Step:** GitHub Secrets → First deployment


---

## 🔐 OCI Production Configuration & SSL Setup

### 1. **OCI Infrastructure**

#### Network Security:
- **Security List**: Ingress Rule за порт 3000 (TCP, Source: 0.0.0.0/0)
- **Route Rules**: Internet Gateway конфигуриран (0.0.0.0/0)
- **Public IP**: 130.162.41.167 (статичен)

#### OS Level (Ubuntu):
- **iptables**: Порт 3000 отворен за входящ трафик
- **PM2**: Инсталиран и конфигуриран за автоматично стартиране при reboot

### 2. **DNS конфигурация**

- **Домейн**: dragora-api.duckdns.org
- **DNS Provider**: DuckDNS
- **A Record**: dragora-api.duckdns.org → 130.162.41.167
- **DuckDNS Token**: 76a97149-01af-4409-90da-a2ab185e17f5

### 3. **SSL/TLS сертификати**

- **Certificate Authority**: Let's Encrypt
- **Tool**: Certbot
- **Сертификат**: `/etc/letsencrypt/live/dragora-api.duckdns.org/fullchain.pem`
- **Private Key**: `/etc/letsencrypt/live/dragora-api.duckdns.org/privkey.pem`
- **Валидност**: До 2026-06-09 (автоматично обновяване)
- **Auto-renewal**: Certbot cron job конфигуриран

### 4. **Nginx конфигурация**

**Файл**: `/etc/nginx/sites-available/default`

```nginx
server {
    listen 80;
    server_name dragora-api.duckdns.org;

    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://localhost:3000/health;
        proxy_set_header Host $host;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/dragora-api.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dragora-api.duckdns.org/privkey.pem;
}
```

**Функции**:
- HTTP (port 80) и HTTPS (port 443)
- Reverse proxy към localhost:3000
- SSL termination

### 5. **Backend код промени**

**Файл**: `backend/src/index.js`

**CORS конфигурация**:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://dragora-playlist-generator-vite.vercel.app',
  'https://dragora-api.duckdns.org',
  /^https:\/\/.*\.vercel\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => 
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    )) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Промени**:
- Добавен `https://dragora-api.duckdns.org` в allowed origins
- Добавен logging за блокирани origins
- Подобрена логика за no-origin requests

### 6. **Backend environment variables**

**Файл**: `~/playlist-backend/backend/.env` (на OCI)

```env
# MongoDB
MONGODB_URI=mongodb+srv://backendAccess:NoRealm2025@cluster0.ep2da.gcp.mongodb.net/Dragora_Selector

# Firebase Admin SDK
FIREBASE_PROJECT_ID=mongo-db-to-firebase-migration
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@mongo-db-to-firebase-migration.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Server
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://dragora-playlist-generator-vite.vercel.app
```

### 7. **MongoDB Atlas**

- **IP Whitelist**: 130.162.41.167/32 добавен (описание: "Oracle backend")
- **Connection String**: Същият като локално

### 8. **PM2 Process Manager**

**Конфигурация**:
```bash
pm2 start src/index.js --name backend
pm2 save
pm2 startup systemd
```

**Статус**: 
- Process ID: 0
- Name: backend
- Status: online
- Restarts: 0 (стабилен)
- Auto-restart: enabled

### 9. **Frontend конфигурация**

#### Локален frontend:
**Файл**: `frontend/.env.local`
```env
VITE_API_BASE_URL=http://130.162.41.167:3000/api
#VITE_API_BASE_URL=http://localhost:3000/api
```

#### Vercel frontend:
**Environment Variable**:
```
VITE_API_BASE_URL=https://dragora-api.duckdns.org/api
```

### 10. **Git repository**

**Branch**: `realm-migration`

**Commit-нати файлове**:
- `backend/src/index.js` - CORS промени

**Не се commit-ват** (в .gitignore):
- `backend/.env`
- `frontend/.env.local`

### 11. **Тестване и валидация**

✅ **Health check**: `curl https://dragora-api.duckdns.org/health`
✅ **SSL валидация**: Зелено катинарче в браузъра
✅ **CORS**: Vercel frontend успешно прави заявки
✅ **Playlist generation**: Работи без грешки
✅ **Mixed content**: Решен (HTTPS навсякъде)

---

## 🤖 CI/CD Готовност

### Какво е автоматизирано:
- ✅ SSL renewal (certbot cron)
- ✅ PM2 auto-restart при crash
- ✅ PM2 startup при server reboot

### Какво трябва да се автоматизира:
- ⏳ Git pull при push към repository
- ⏳ PM2 restart след code update
- ⏳ Environment variables management
- ⏳ Database migrations
- ⏳ Health check monitoring
- ⏳ Rollback mechanism

### Препоръки за CI/CD:
1. **GitHub Actions** или **GitLab CI** за автоматичен deploy
2. **Webhook** от GitHub към OCI за trigger на deploy
3. **Deploy script** на OCI за pull + restart
4. **Environment-specific configs** (.env.production)
5. **Backup strategy** преди deploy
6. **Monitoring** (PM2 Plus, CloudWatch, или Datadog)

---

## 📝 Production URLs

- **Frontend (Vercel)**: https://vite-playlist-generator-80yscj3md-drags-projects-50e6ca0b.vercel.app/
- **Backend API**: https://dragora-api.duckdns.org/api
- **Health Check**: https://dragora-api.duckdns.org/health
- **OCI IP**: 130.162.41.167
