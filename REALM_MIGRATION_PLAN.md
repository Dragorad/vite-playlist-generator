# План за миграция от MongoDB Realm SDK

## Текущо състояние на проекта

### Използвани технологии (ще бъдат депрекирани септември 2025):
- **Realm Web SDK** (`realm-web`) - цялата библиотека
- **App Services Authentication** - анонимна автентикация
- **App Services Functions** - 4 функции за плейлисти
- **Data API** - HTTP достъп до MongoDB

### Текуща архитектура:
```javascript
// Realm Web SDK (ще спре да работи)
export const app = new RealmWeb.App({ id: APP_ID });
const user = app.logIn(RealmWeb.Credentials.anonymous());

// Functions (ще спрат да работят)
app.currentUser.callFunction('generatePlaylist', inputObj);
app.currentUser.callFunction('updateTitleUrl', urlObj);
app.currentUser.callFunction('updateTitleGenres', genreObj);
app.currentUser.callFunction('updateTitleInstruments', instrumObj);
```

### Данни за колекцията:
- **532 документа** (не 5000 както първоначално предполагахме)
- **700KB общ размер** данни
- **100MB индекси** (няма да се кешират)
- **2 индекса** за оптимизация на заявките

## Препоръчителни опции за миграция

### 1. Vercel Functions (препоръчително)
**Предимства:**
- Безплатен план: 100 GB-hours/месец
- Лесна интеграция с Vite приложението
- Автоматичен deploy от Git
- Edge locations по света

**Ограничения:**
- 10 секунди timeout за HTTP заявки
- 1024MB RAM лимит
- Hobby план няма cron jobs

### 2. AWS Lambda + API Gateway
**Предимства:**
- 1 милион заявки/месец безплатно
- 400,000 GB-секунди compute време
- Повече контрол и възможности

**Недостатъци:**
- По-сложна настройка
- Изисква AWS познания

### 3. Други безплатни алтернативи:
- **Google Cloud Functions**: 2 милиона извиквания/месец
- **Railway**: $5 кредит/месец
- **Render**: 750 часа/месец
- **Cloudflare Workers**: 100,000 заявки/ден

## Оптимизационна стратегия: In-Memory кеширане

### Ключови предимства:
- **700KB данни** са идеални за пълно кеширане
- **Мигновени заявки** след зареждане (1ms вместо 100-200ms)
- **Няма network latency** към MongoDB
- **Драматично по-бързо** от MongoDB заявки дори с индекси

### Предварително кеширане при логин:
```javascript
// След успешен логин
const user = app.logIn(credentials).then(user => {
  // Стартирай кеширането асинхронно
  fetch('/api/warmup-cache', { method: 'POST' });
});
```

### Performance анализ:
- **Cold start без кеш**: 350ms
- **Cold start с кеш**: 250ms (зареждане 50ms)
- **Warm заявки с кеш**: ~1ms
- **Warm заявки без кеш**: ~150ms

## Оптимизация на рандомизацията

### Проблем:
MongoDB `$sample` е по-качествен от JavaScript `Math.random().sort()`

### Решение: Reservoir Sampling
```javascript
function reservoirSample(array, k) {
  const result = array.slice(0, k);
  
  for (let i = k; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j < k) {
      result[j] = array[i];
    }
  }
  return result;
}
```

**Предимства:**
- O(n) сложност но само една итерация
- Uniform distribution като MongoDB $sample
- Минимален memory footprint
- Идеален за малки samples от големи колекции

## Скалиране до 10,000 документа

### При 10K документа:
- **Memory**: ~13MB (все още OK)
- **Cold start**: 2-5 секунди (риск от timeout)
- **Bandwidth**: 13% от Vercel лимита

### Препоръчителни стратегии:
1. **Частично кеширане** по жанрове
2. **Lazy loading** - зареждай само нужните данни
3. **Chunked loading** - зареждай на части
4. **Hybrid подход** - кеширай метаданни, заявявай детайли

## Keepalive стратегии за предотвратяване на cold start

### Безплатни опции:
- **UptimeRobot**: Ping на всеки 5 минути
- **Cron-job.org**: HTTP GET заявки
- **GitHub Actions**: Scheduled workflows

### Vercel Pro план:
- **Cron Jobs**: Вградени scheduled функции

## Следващи стъпки

1. **Изберете платформа** (препоръка: Vercel Functions)
2. **Имплементирайте кеширане** с предварително зареждане
3. **Заменете рандомизацията** с Reservoir Sampling
4. **Тествайте performance** спрямо текущото решение
5. **Настройте keepalive** за production

## Важни бележки

- **Крайният срок**: Септември 2025
- **Triggers остават активни** в Atlas
- **Functions работят само с Triggers** след депрекацията
- **In-memory филтрирането** е по-бързо от MongoDB заявки за малки колекции
- **Reservoir Sampling** осигурява максимално разнообразие в плейлистите