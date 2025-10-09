# 🚀 CI/CD Deployment Plan

## 📋 Overview
**Frontend:** Vercel (auto-deploy from main)  
**Backend:** Oracle VM (GitHub Actions → Docker + Nginx)  
**Database:** MongoDB Atlas (existing)

## 🔄 Deployment Flow

### 1. **Frontend (Vercel)**
```
git push main → Vercel auto-deploy → https://your-app.vercel.app
```

### 2. **Backend (Oracle VM)**
```
git push main → GitHub Actions → SSH to Oracle VM → Docker build & deploy
```

---

## 📂 Required Files Structure

```
vite-playlist-generator/
├── .github/workflows/
│   └── deploy-backend.yml          # GitHub Actions for backend
├── backend/
│   ├── Dockerfile                  # Already exists
│   ├── docker-compose.prod.yml     # Already exists
│   └── nginx.conf                  # Nginx config
├── frontend/
│   └── vercel.json                 # Vercel config
└── scripts/
    └── deploy.sh                   # Deployment script
```

---

## 🎯 Step-by-Step Deployment Plan

### Phase 1: Environment Setup
- [ ] Oracle VM SSH key setup
- [ ] GitHub Secrets configuration
- [ ] Domain/SSL certificate
- [ ] Environment variables

### Phase 2: Backend Deployment
- [ ] GitHub Actions workflow
- [ ] Docker + Nginx configuration
- [ ] SSL setup (Let's Encrypt)
- [ ] Health checks

### Phase 3: Frontend Deployment
- [ ] Vercel project setup
- [ ] Environment variables
- [ ] Custom domain (optional)
- [ ] CORS configuration

### Phase 4: Integration Testing
- [ ] Frontend → Backend connectivity
- [ ] Firebase Auth flow
- [ ] MongoDB operations
- [ ] End-to-end testing

---

## 🔐 Required Secrets & Environment Variables

### GitHub Secrets (for Actions)
```
ORACLE_VM_HOST=your-vm-ip
ORACLE_VM_USER=ubuntu
ORACLE_VM_SSH_KEY=-----BEGIN PRIVATE KEY-----...
MONGODB_URI=mongodb+srv://...
FIREBASE_SERVICE_ACCOUNT={"type":"service_account"...}
```

### Vercel Environment Variables
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Oracle VM Environment
```
MONGODB_URI=mongodb+srv://...
FIREBASE_SERVICE_ACCOUNT_JSON=...
NODE_ENV=production
PORT=3000
```

---

## 🚀 Deployment Commands

### Manual Backend Deploy
```bash
# On Oracle VM
git pull origin main
cd backend
docker-compose -f docker-compose.prod.yml up -d --build
```

### Manual Frontend Deploy
```bash
# Automatic on git push to main
# Or manual: vercel --prod
```

---

## 🔍 Health Checks & Monitoring

### Backend Health Endpoint
```javascript
GET /health
Response: {"status": "ok", "timestamp": "2025-01-07T..."}
```

### Monitoring Points
- [ ] Backend API response time
- [ ] MongoDB connection status
- [ ] SSL certificate expiry
- [ ] Docker container status

---

## 🛠️ Rollback Strategy

### Backend Rollback
```bash
# Keep previous Docker image
docker tag current-image:latest previous-image:backup
# Rollback command
docker-compose down && docker-compose up -d previous-image:backup
```

### Frontend Rollback
```bash
# Vercel automatic rollback to previous deployment
vercel rollback [deployment-url]
```

---

## 📝 Deployment Checklist

### Pre-deployment
- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] SSL certificate ready
- [ ] Database connection tested

### Post-deployment
- [ ] Health checks passing
- [ ] Frontend loads correctly
- [ ] Auth flow working
- [ ] API endpoints responding
- [ ] CORS configured properly

---

## 🔧 Next Steps

1. **Create GitHub Actions workflow**
2. **Setup Vercel project**
3. **Configure Oracle VM**
4. **Test deployment pipeline**

**Which component should we start with first?**