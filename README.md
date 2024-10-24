# CookieCrumbs - FMAT CTF

## Descripción
"CookieCrumbs" es un reto de Hacking Web, creado por mí para el CTF realizado en Septiembre del 2024 en la Universidad Autónoma de Yucatán.


## Contexto
En un futuro cercano los robots están dominando al cookie world, y se han propuesto eliminar a cualquiera que se esconda entre las galletas, así que como buen agente secreto, investiga y evita esto a toda costa.

## Solución

Comenzamos con una página web que, a simple vista, solo contiene imágenes de robots. Parece que no hay mucho que ver. 
![Página con imágenes de robots](images/robots-page.png)

Al investigar un poco más, sabemos que algunas webs tienen un archivo llamado `robots.txt`. Así que probamos acceder a él, y nos encontramos con algo interesante.
![Contenido del archivo robots.txt](images/robots-txt.png)

Aquí descubrimos dos cosas: una ruta llamada `/galleta` y una pequeña pista que dice "agente-come-galletas".

Siguiendo la pista, accedemos a la ruta `/galleta`, pero lo primero que nos encontramos es un mensaje de "Acceso denegado. Intenta de nuevo."
![Acceso denegado a la ruta galleta](images/access-denied-galleta.png)

La pista "agente-come-galletas" nos sugiere que hagamos algo relacionado con el "user agent" del navegador. Entonces, descargamos una extensión para modificar el user agent.
![Modificación del user agent del navegador](images/user-agent-extension.png)

Después de cambiar el user agent y aplicar los cambios, actualizamos la página con `Ctrl + R` y, ¡sorpresa! Ahora nos muestra un mensaje diferente, dándonos la ruta de la flag, pero nada más.
![Mensaje con la ruta de la flag](images/flag-route-message.png)

Al inspeccionar la aplicación un poco más, nos damos cuenta de que la cookie que maneja está codificada en base64.
![Cookie codificada en base64](images/base64-cookie.png)

Así que, con la ruta que nos proporcionó la web, probamos codificarla. Para asegurarnos de que funcione en cualquier ruta, la codificamos como `../../../../../var/app/flag/flag.txt`.
![Codificación de la ruta a la flag](images/flag-route-encoding.png)

Sin embargo, no obtenemos la flag, solo un nuevo mensaje: "Archivo no encontrado o acceso denegado". Esto nos indica que la aplicación está intentando leer un archivo.
![Mensaje de archivo no encontrado o acceso denegado](images/file-not-found.png)

Es probable que esté detectando los `../` y los elimine, así que intentamos con `....//`. Esto debería borrar solo un patrón `../`, permitiéndonos retroceder y leer el archivo.
![Prueba con la ruta modificada ....//](images/modified-route.png)

¡Eureka! ¡Pudimos leer la flag!
![Flag obtenida](images/flag-obtained.png)

Espero que este desafío haya sido divertido para todos los jugadores. Un agradecimiento a Julián y todos los encargados de este CTF por invitarme a desarrollar algo nuevo para mí.

By: Perceval
