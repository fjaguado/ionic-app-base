# Ionic App Base con ES2015/babel

Proyecto base para el desarrollo de una aplicación móvil utilizando 
[Ionic Framwork](http://ionicframework.com/) en su versión 1.3.1. 

## ¿Qué hay en este proyecto base?

La idea principal de este proyecto base era poder utilizar la sintaxis 
[ES2015](https://babeljs.io/docs/learn-es2015/) para desarrollar la aplicación. 

Al reposotior original - que puedes visitar en [Ionic app base](https://github.com/enguerran/ionic-app-base) - 
le he añadido unas modificaciones de estructura y tareas de Gulpjs para 
adaptarlo mejor a mi forma de trabajar.
 
### La estructura

La nueva estructura centraliza todo el código fuente en el directorio *src* 
hacienod que sea Gulpjs el que trate y copie el código final a *www* desde 
donde Ionic pillará el código para ejecutarse. 

Particularmente me gusta tener el código dividido en *src* y *dist*; pero en 
este caso adoptaremos el original de Ionic. 

### Tareas Gulpjs

- *javaScript* convierte código ES2015 en ES5.1 para que puedan entenderlo 
navegadores que no entienden directamente ES2015. 
- *sass* transforma en CSS el código SASS que tenemos en *src/scss*
- *views* genera un módulo de Angular con todos los templates que vamos a 
utilizar para así no tener que ir a buscar el archivo cada vez que necesitamos 
un template. 
- *images* sencillamente copia las imágenes del directorio *src/img* a *www/img*
- *empty* vacía el directorio *www*
- *lib* copia el directorio *src/lib* a *www/lib*
- *index* copia el fichero *src/index.html* a *www*
- *init* es una secuencia, utilizando [Run Sequence](https://github.com/OverZealous/run-sequence) 
que nos asegura que ciertas tareas terminen antes de empezar las siguiente. 

También he añadido un par de watchers más pendiente de cambios en los 
templates e imágenes. El resto son tareas originales de Ionic. 

## Utiliza este proyecto

Lo primero que has de tener instalado es [Ionic CLI](https://github.com/driftyco/ionic-cli)

```bash
$ npm install -g ionic
```

Una vez lo tienes lo único que te queda es clonar directamente este proyecto:

```bash
$ git clone https://github.com/fjaguado/ionic-app-base.git tuProyecto
```

Para saber cómo empezar con Ionic puedes dirigirte a 
[Getting Started](http://ionicframework.com/getting-started) o al repositorio 
[Ionic CLI](https://github.com/driftyco/ionic-cli).

Si quieres saber más sobre ES2015 utilizado en proyectos Angular puedes
 ver la siguiente presentación [(ENG)ANGULARJS AND ES2015+](http://egorsmirnov.me/assets/berlin-angular-meetup-26/).


---

Puedes visitar el repositorio original en [Ionic app base](https://github.com/enguerran/ionic-app-base)