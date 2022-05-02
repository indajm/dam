# Desarrollo de aplicaciones Multiplataforma. Especialización IoT. FIUBA

Para correr el programa:
- Backend: `docker-compose up` en la carpeta de backend
- Frontend: `ionic serve` en la carpeta de frontend

## Backend

Primero, en el backend se definen las dependencias y puertos a utilizar. A continuación, se define el ruteo para lo que voy a usar, que en este caso es una carpeta para dispositivos, otra para mediciones y otra para las elecroválvulas. Las 3 carpetas se ubican en `src/backend/routes`:

### Routes: dispositivo

Primero se definen las dependencias, que en este caso son ExpressJS y la base de MySQL que tiene los datos que se van a procesar. Luego, se programa lo que debe estar en cada pantalla de la aplicación:

- En primer lugar, se van a imprimir todos los dispositivos que están en la tabla Dispositivos. Para eso, se usa una query `SELECT * from Dispositivos` y se devuelve el resultado
- También es necesario completar la pantalla para cada dispositivo en particular. La ruta que llevará a eso es, por ejemplo, http://localhost:8100/dispositivos/1. Entonces, se necesita una query que devuelva únicamente la información del dispositivo que se eligió. Se logra con `SELECT * FROM Dispositivos WHERE Dispositivos.dispositivoId = ?`, donde `?` será reemplazado por el ID del dispositivo que se busca en ese momento
- Otra necesidad es saber cuál es la última medición del sensor. Más adelante, esa información se ploteará en un gráfico. Para eso, se define que la ruta será, por ejemplo, http://localhost:8100/dispositivos/1/ultima-medicion. La query que cumple con lo pedido es `SELECT * from Mediciones WHERE Mediciones.dispositivoId=? ORDER BY Mediciones.fecha DESC LIMIT 1`, donde, nuevamente, el `?` será reemplazado por el ID del dispositivo en cuestión. Además, primero se ordenan todas las mediciones del dispositivo por fecha (usando ORDER BY), y luego se filtra solamente la primera (LIMIT 1), con el objetivo de obtener la medición más actualizada

### Routes: medición

En este caso, se necesita imprimir todas las mediciones de un sensor. Se define la ruta, por ejemplo, http://localhost:8100/dispositivos/1/mediciones. La query que cumple con lo pedido es `SELECT * from Mediciones WHERE dispositivoId=?`. Esta información se usará más adelante para plotear la ruta en cuestión

### Routes: log de electroválvulas

El objetivo es leer la tabla Log_Riegos de la database y devolverlos en un array, que luego será ploteado. Para eso, se usa la query `SELECT * From Log_Riegos WHERE electrovalvulaId = ?`



## Frontend

### Routeo

En la carpeta `frontend/src/src/app/app-routing.module.ts` se definen distintos paths: `home`, `dispositivo/:id`, `dispositivo/:id/mediciones` y `dispositivo/:id/logs`, que serán detallados a continuación

Para crear estas carpetas, se usa el comando `ionic generate page nombreModulo`, donde nombreModulo podría ser home, dispositivo o lo que se necesite. Esto creará los archivos necesarios (por ejemplo, el .ts y el .html), y definirá los links al selector, el template y el estilo.

### Home

Carpeta: `src/frontend/src/app/home`

En el archivo `home.page.ts` se define el selector, el template y el estilo. También se importa el servicio `dispositivo.service`

#### Servicio: dispositivo.service

En este  servicio tengo definidos los dispositivos que levantaré en el template de abajo. Se usa el modelo de Dispositivos definido en `model/Dispositivo.ts`

#### Template: home.page.html:

En el home se tiene el título del proyecto ("*Sistema de riego automatizado*") y el listado de dispositivos, leído de `dispositivoServ.listado` y recorrido con `*ngFor`. Cada sensor está linkeado a su respectiva página, usando `routerLink` (es decir, acá se define que, al apretar un botón, te redirija a la página que corresponde, como podría ser http://localhost:8100/dispositivo/1. Esto puede verse en `frontend/src/app/home/home.page.html`


### Dispositivo/:id

En el archivo .html se define el título de la página, se verifica si el sensor tiene mediciones (en caso de no tener, se imprimirá un mensaje indicándolo) y se crean los botones (con el link que corresponde) para ver las mediciones y el log de un sensor. En el archivo de TypeScript se crea el gráfico que indicará la última medición de cada sensor. Por ejemplo, si el último valor es 60 se indicará:

![image-20220502081433521](https://user-images.githubusercontent.com/31355184/166236613-30514cfe-007e-47b9-80ce-2d29c532089f.png)

Si el último valor es 30:

![image-20220502081551252](https://user-images.githubusercontent.com/31355184/166236945-31374f4f-f06c-4ab7-b465-2fe6910008e1.png)

Además, en la consola de logs se imprimirá un mensaje según lo definido en el enunciado. Por ejemplo, cuando la última medición es de 30 kPA, dirá *"El suelo está seco. Debe regarse de inmediato"*

#### Dispositivo/:id/mediciones

El objetivo es completar una pantalla como la siguiente:

![image-20220502081913283](https://user-images.githubusercontent.com/31355184/166236970-87a7a04d-0a5a-4bb8-928e-a4b198facf97.png)

Se trae la información que hay en, por ejemplo, http://localhost:8000/dispositivo/2/mediciones. Notar que en el puerto 8000 se verá la información como:

![image-20220502090635590](https://user-images.githubusercontent.com/31355184/166237018-dee188e5-73a5-44d8-8b80-c44ed4e6b4d3.png)

#### Dispositivo/:id/logs

Para traer los logs de la tabla Logs_Riego, por ejemplo, de http://localhost:8000/dispositivo/2/log, se usa el archivo log.service.ts que lee:

![image-20220502090956986](https://user-images.githubusercontent.com/31355184/166237038-2a8be041-04da-4c89-b3b2-7a313ec4db7c.png)

y, luego, del procesamiento completo, se imprime en el puerto 8100 como:

![image-20220502091031303](https://user-images.githubusercontent.com/31355184/166237051-096c7f48-bf5a-42b2-b423-960f56f32115.png)

















