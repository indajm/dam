# Desarrollo de aplicaciones Multiplataforma. Especialización IoT. FIUBA





## Frontend

### Home

Carpeta: `src/frontend/src/app/home`

En el archivo `home.page.ts` se define el selector, el template y el estilo. También se importa el servicio `dispositivo.service`

#### Servicio: dispositivo.service

En este  servicio tengo definidos los dispositivos que levantaré en el template de abajo

#### Template: home.page.html:

En el home se tiene el título del proyecto ("Sistema de riego automatizado") y el listado de dispositivos, leído de `dispositivoServ.listado` y recorrido con `*ngFor`. Cada sensor está linkeado a su respectiva página, usando `routerLink`. Esto puede verse en `frontend/src/app/home/home.page.html` y se obtiene la siguiente imagen.

![image-20220427055610541](/home/juan/.config/Typora/typora-user-images/image-20220427055610541.png)


## Backend

