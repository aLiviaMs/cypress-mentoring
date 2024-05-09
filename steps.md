Inicializar um projeto Node.
``` npm init --yes ```

Instalar o cypress
``` npm install -D cypress ```

Configurar scripts cypress
```   
  "scripts": {
    "cypress:open": "npx cypress open",
    "cypress:headless": "npx cypress run --browser electron",
    "cypress:headless:chrome": "npx cypress run --browser chrome"
  }, 
```