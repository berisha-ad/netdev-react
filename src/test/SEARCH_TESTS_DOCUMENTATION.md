# Dokumentation der Suchlogik-Tests

Dieses Dokument beschreibt die 4 Testfälle, die für die Suchfunktionalität in der NetDev-Frontend-Anwendung erstellt wurden.

## Testübersicht

Die Tests befinden sich in `src/test/search.test.tsx` und konzentrieren sich auf die Kernlogik der Suche, die in der `SearchBar`-Komponente implementiert ist.  
Sie stellen sicher, dass Suchanfragen korrekt verarbeitet, validiert und zur richtigen URL navigiert werden.

## Testfälle

### 1. Navigation mit gültiger Suchanfrage

**Testname**: `should navigate to search page with search query when form is submitted`

**Zweck**: Überprüft, dass bei einer gültigen Suchanfrage nach dem Absenden des Formulars korrekt zur Suchseite navigiert wird und die Anfrage als URL-Parameter übergeben wird.

**Testschritte**:

- `SearchBar`-Komponente rendern
- "Adrian Berisha" ins Suchfeld eingeben
- Suchbutton anklicken
- Navigation zu `/search?search=Adrian%20Berisha` überprüfen

**Erwartetes Verhalten**:  
Die Suchanfrage sollte korrekt URL-kodiert und als Parameter angehängt werden.

---

### 2. Behandlung leerer Suchanfragen

**Testname**: `should navigate to search page without search parameter when query is empty`

**Zweck**: Stellt sicher, dass bei einer leeren Suchanfrage zur Suchseite navigiert wird, jedoch ohne unnötige URL-Parameter.

**Testschritte**:

- `SearchBar`-Komponente rendern
- Suchbutton ohne Eingabe anklicken
- Navigation zu `/search` (ohne Suchparameter) überprüfen

**Erwartetes Verhalten**:  
Leere Suchen sollen zur Basis-Suchseite ohne Parameter führen.

---

### 3. Whitespace-Entfernung

**Testname**: `should trim whitespace from search query before navigation`

**Zweck**: Überprüft, dass führende und nachfolgende Leerzeichen aus der Suchanfrage entfernt werden, bevor diese verarbeitet wird.

**Testschritte**:

- `SearchBar`-Komponente rendern
- " JavaScript Developer " (mit Leerzeichen) eingeben
- Suchbutton anklicken
- Navigation zu `/search?search=JavaScript%20Developer` überprüfen

**Erwartetes Verhalten**:  
Leerzeichen am Anfang und Ende werden entfernt, und die bereinigte Anfrage wird verwendet.

---

### 4. Kodierung von Sonderzeichen

**Testname**: `should properly encode special characters in search query`

**Zweck**: Stellt sicher, dass Sonderzeichen in der Suchanfrage korrekt URL-kodiert werden, um Navigationsprobleme zu vermeiden.

**Testschritte**:

- `SearchBar`-Komponente rendern
- "C# & .NET Developer" eingeben
- Suchbutton anklicken
- Navigation zu `/search?search=C%23%20%26%20.NET%20Developer` überprüfen

**Erwartetes Verhalten**:  
Sonderzeichen wie `#`, `&` und `.` werden korrekt kodiert.

---

## Testkonfiguration

### Abhängigkeiten

- **vitest**: Test-Framework
- **@testing-library/react**: React-Test-Utilities
- **@testing-library/jest-dom**: Zusätzliche DOM-Matcher
- **jsdom**: DOM-Umgebung für Node.js-Tests

### Mock-Setup

Die Tests verwenden Mocks für:

- `useNavigate`-Hook aus `react-router-dom`
- `useSearch`-Hook aus der Anwendung
- `useAuth`-Kontext
- API-Aufrufe

### Tests ausführen

```bash
# Tests im Watch-Modus
npm test

# Tests einmalig ausführen
npm run test:run
```
