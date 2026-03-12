# Debug: Tester les API Statistics

## Test 1: Vérifier l'utilisateur dans localStorage

Ouvrez la console du navigateur (F12) et exécutez:

```javascript
// Vérifier l'utilisateur
console.log('User:', localStorage.getItem('user'))
console.log('Token:', localStorage.getItem('token'))

// Parser l'utilisateur
try {
  const userStr = localStorage.getItem('user')
  const user = JSON.parse(userStr)
  console.log('Parsed user:', user)
  console.log('User ID:', user.id)
} catch (e) {
  console.error('Error parsing user:', e)
}
```

## Test 2: Vérifier les headers envoyés

Dans l'onglet Network (Réseau) de la console:
1. Ouvrir l'onglet "Network"
2. Essayer de définir un objectif
3. Cliquer sur la requête POST à `/api/statistics/goals`
4. Vérifier les "Request Headers"
5. Chercher `X-User-Id` dans les headers

## Si X-User-Id est manquant:

Le problème vient du stockage de l'utilisateur. Solution:

1. **Se déconnecter**
2. **Se reconnecter**
3. **Retester**

## Test 3: Tester directement l'API

```javascript
// Test direct de l'API statistics
fetch('/api/statistics', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'X-User-Id': '1' // Remplacer par votre ID
  }
})
.then(r => r.json())
.then(d => console.log('Statistics:', d))
.catch(e => console.error('Error:', e))
```

## Solutions

### Solution 1: Corriger le localStorage
```javascript
// Dans la console du navigateur
const token = localStorage.getItem('token')
// Remplacer 1 par votre vrai ID utilisateur
localStorage.setItem('user', JSON.stringify({ id: 1, username: 'votre_username' }))
localStorage.setItem('token', token)
```

### Solution 2: Code fix (si le problème persiste)
Le problème peut venir de la façon dont l'utilisateur est stocké après login.

---

**Testez ces étapes et dites-moi ce que vous trouvez!**
