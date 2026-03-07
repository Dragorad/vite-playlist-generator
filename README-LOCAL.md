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