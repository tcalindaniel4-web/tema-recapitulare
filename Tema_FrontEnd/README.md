------------------------TEMA RECAPITULARE--------------------------
1. URL Utilizat:
Am folosit API public de test care ne-a fost recomandat: `https://jsonplaceholder.typicode.com/posts`. Am salvat adresa printr-o variabila si am comunicat cu serverul prin "fetch".
Pt afisare:`const response = await fetch(apiUrl);`
Pt trimitere: `const response = await fetch(apiUrl, { method: 'POST', ... });`

2. Cum am rezovlat problema CORS:
Am folosit extensia Live Server in VS Code pt a vedea timp real modificarile pe care codul introdus de mine le produce.

3.Ce status Codes tratez si cum:
**200 OK/ 201 Created: Aceasta reprezinta succesul proiectului. Prelucrez JSON primit si afisez dinamic in interfata fara sa dau refresh la pagina.
**Erori 4xx/5xx: le- interceptez manual folosind conditia `if (!response.ok)`. daca serverul returneaza o eroare de tip 404 sau 500, opresc executia si afisez un mesaj de eroare text.
**Erori de retea: Sunt prinse de blocul `catch`. in caz ca utilizatorul nu are internet si nu se poate conecta la server, afisez un mesaj de eroare in interfata pt blocarea invizibila a aplicatiei.

