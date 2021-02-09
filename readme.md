# Medieval - Solution de gestion Locative

## Description du projet

Solution de gestion locative multi-plateformes avec options de base de données embarquée ou hébergée.

## Stack technique

Application Ionic avec React (hooks) et base de données SQLite, pouvant être buildée pour Desktop (Electron - Windows et MacOS), mobile (Android et iOS) et PWA.
Après la mise en place de l'architecture de base et d'une POC il est prévu de passer au maximum en Typescript.

## Client NPM

---

Yarn n'est pas supporté actuellement par la plateforme [@capacitor-community/electron](https://github.com/capacitor-community/electron/issues/68) et génère des erreurs lors de son ouverture (`npx cap open @capacitor-community/electron`). On reste donc sur npm pour l'instant.

💡 A plusieurs reprises lors de builds nous avons eu des **erreurs liées à des conflits de dépendances**.
Nous avons pu les résoudres en supprimant le package-lock.json ainsi que les nodes_modules
puis en réinstallant ces derniers.

```
rm -R -Force ./node_modules
rm -Force ./package-lock.json
npm install
```

## Ionic CLI

L'installation d'[Ionic-CLI](https://ionicframework.com/docs) permet notamment la génération d'un starter-template via la commande ionic start.

Il faut l'installer globalement via npm:

```
npm install -g @ionic/cli
```

```
​C:\
λ  ionic start

Pick a framework!

Please select the JavaScript framework to use for your new app. To bypass this prompt next time, supply a value for the
--type option.

? Framework: (Use arrow keys)
> Angular | https://angular.io
  React   | https://reactjs.org
  Vue     | https://vuejs.org
```

Il permet de lancer les commandes de build, synchronisation sur les différentes plateformes (via capacitor), etc.

```
// equivalent to npm run build

ionic build
```

## Capacitor

[Capacitor](https://capacitorjs.com/) est le lien entre l'application web et les fonctionnalités natives, via toute une série de plugins. C'est aussi l'outil qui permet de builder l'application pour les différentes plateformes (hormis PWA). Il est développé par Ionic et est un remplaçant pour Cordova, désormais préconisé en lieu et place de ce dernier. Toutefois, Les plugins Cordova sont compatibles et eux-mêmes utilisés par Capacitor. Il n'est pas nécessaire d'installer Capacitor globalement, il est inclus dans les nodes modules (de base avec les versions récentes d'Ionic). On peut lancer les commandes via le CLI Ionic ou npx, au choix:

```
// Add a native platform project to your project

ionic cap add <plateform>   // "android", "ios", "@capacitor-community/electron"
```

```
// Copy the web app build and Capacitor configuration file into the native platform
// project. Run this each time you make changes to your web app or change a
// configuration value in capacitor.config.json.

ionic cap copy [<plateform>]
```

```
// Updates the native plugins and dependencies referenced in package.json`

ionic cap update [<plateform>]
```

```
// Run the Copy and Update commands together

ionic cap sync  [<plateform>]
```

```
// Opens the native project workspace in the specified native IDE (Xcode for iOS,
// Android Studio for Android). Once open, use the native IDEs to build, simulate,
// and run your app on a device.

ionic cap open <plateform>
```

## SQLite3

Pour les **builds natifs** nous utilisons le plugin [**cordova-sqlite-storage**](https://github.com/storesafe/cordova-sqlite-storage) en combinaison avec [**@ionic-native/sqlite**](https://ionicframework.com/docs/native/sqlite/). Il conviendra de se renseigner sur d'éventuels problèmes [indiqués ici](https://github.com/storesafe/cordova-sqlite-storage#warning-multiple-sqlite-problem-on-multiple-platforms). Nous n'avons pas retenu le plugin [capacitor-data-storage-sqlite](https://github.com/jepiqueau/capacitor-data-storage-sqlite) car il permet uniquement de stocker des chaînes de caractères sous forme de paires clef-valeur.

Pour **Electron** il faudra installer manuellement sqlite3 dans le dossier electron. Cependant, Electron n'étant pas un environnement node standard, il faudra rebuilder le module pour cette plateforme spécifique via electron-builder. Cela nécessitera quelques opérations préalables, dont l'installation globale de [node-gyp](https://github.com/nodejs/node-gyp), venant elle-même avec ses prérequis.

Sur **Windows**, il faudra installer la [version actuelle de **python**](https://docs.python.org/3/using/windows.html#the-microsoft-store-package), ainsi que les **windows-build-tools**.

```
npm install --global windows-build-tools
npm install -g node-gyp
```

Il faudra ensuite ajouter le script suivant au package.json **du dossier electron**:

```
"scripts": {
   "postinstall": "install-app-deps"
   ...
}
```

```
cd electron
npm install --save-dev electron-builder
npm install --save sqlite3
npm run postinstall
```

## Android Studio

Pour faire tourner Android Studio, il faut préalablement [installer le dernier JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (Java Development Kit).

Ensuite, on peut télécharger [Android Studio](https://developer.android.com/studio/).

💡 J'ai eu une mauvaise expérience (Erreur de variables Java non-ajoutées au Path et erreurs d'approbation de certificats) en laissant le dossier d'installation par défaut! (dans _Program Files_, il n'a peut-être pas aimé l'espace dans le chemin du dossier). Sur une autre machine en modifiant le dossier de destination je n'ai plus eu ces erreurs.

Une fois installé, il faudra encore télécharger le SDK pour Android 10 (API Level 29). Pour ce faire, aller dans `File > Settings > System Settings > Android SDK` et lancer le téléchargement du SDK requis (cfr. niveau d'API renseigné dans l'erreur).

On peut tester l'application sur un appareil virtuel (plusieurs modèles disponibles en téléchargement via AS) ou physique. Pour tester sur un appareil physique, il faut d'abord activer les outils de développement sur celui-ci en allant dans
`Paramètres > A Propos Du Téléphone > Informations Sur Le Logiciel` et tapper 7 fois sur le `Numéro de version`. Ensuite, aller dans le menu `Options De Développement` qui sera apparu dans les paramètres et `activer le débogage USB`. Une fois connecté via USB, l'appareil sera accessible pour installer l'application et vous pourrez accéder aux outils de développement dans chrome à l'addresse `chrome://inspect#devices` (après un temps de chargement votre appareil devrait s'afficher et il suffira de cliquer sur `inspect` pour ouvrir les devtools).

## Typescript

💡 Pour faciliter le dévelopement, activer la validation dans VSCode ce paramètre `"typescript.validate.enable": true,` dans votre settings.json. L'éditeur renseignera directement les erreurs sans devoir passer par le compilateur.

💡 Pour utiliser l'autocomplétion résultant de l'utilisation de TS, utiliser `CTRL + space`

💡 Pour connaitre le type d'une variable, la survoler avec la souris (chercher ce qui vient après le ":")
