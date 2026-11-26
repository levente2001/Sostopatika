# Firebase élesítési útmutató

A statikus weboldal nem igényel Reactet vagy buildet. A demó alapértelmezett, csak fiktív helyi adatokat kezel. Éles módot kizárólag a gyógyszertár jóváhagyása után kapcsoljon be.

1. Firebase Console: külön projekt, Firestore EU régió (létrehozáskor), web app regisztráció.
2. Authentication: Email/password; engedélyezett domainként a végleges HTTPS domain. Hozzon létre munkatársi felhasználókat, a pharmacyAdmin=true custom claimet kizárólag megbízható Admin SDK környezetből állítsa be. Szolgáltatási fiók kulcsát soha ne commitolja. A kliens nem adhat magának adminjogot.
3. Telepítse a firestore.rules szabályokat a megfelelő projektre (Console Rules vagy firebase deploy --only firestore:rules --project <projekt>). Tesztelje a jogosulatlan olvasást és módosítást az emulátorban.
4. App Check: reCAPTCHA Enterprise web app regisztráció, érvényes domain, Firestore enforcement bekapcsolása. Ez nem helyettesít sebességkorlátozást; nyilvános írás előtt szerveroldali visszaélésvédelmet és kvótákat kell beállítani.
5. Adja meg a js/firebase-config.js firebase mezőit, App Check site key-t és a jóváhagyott HTTPS adatkezelési tájékoztató URL-jét. A mode csak ezután legyen live. A config nyilvános, nem titkos kulcs.
6. Élesítés előtt: gyógyszerészeti jogszerűség, GDPR jogalap és adatfeldolgozói szerződés, adatmegőrzés/törlési eljárás (a kliens nem törölhet), hozzáférési audit, többtényezős adminazonosítás, szerveroldali anti-abuse és költségriasztások, biztonsági és funkcionális tesztek. A jelenlegi megvalósítás nem állítja, hogy teljes egészségügyi megfelelőséget biztosít.
7. A Vercel noindex header, robots.txt és az oldalankénti noindex meta csak a végleges jóváhagyás után távolítandó el. A meglévő tárhelyen HTTPS kötelező. A szolgáltatás nem EESZT-integráció, nem kér TAJ-t.

GYIK: a siteContent/faq dokumentum nyilvános olvasásra, kizárólag pharmacyAdmin jogosultságú munkatárs írására szolgál. Maximum 10 kérdés, 300 karakteres cím és 6000 karakteres válasz. Betegadat ide nem kerülhet. Telepítse az új szabályokat. A demóban a módosítások csak helyben tárolódnak.
