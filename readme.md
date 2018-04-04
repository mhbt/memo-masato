# Memo Mesato
  @quickDoc

## Directories
  @Directory and their shared responsibilities

  * .git -> version control system
  * .sourcemaps -> contains map files.
  * node_modules -> Required modules to run the app.
  * resources -> Android and IOS required resource files.
  * src -> Application code.
  * www -> Destination folder | build folder. contains build Application

## Application requirements --Development

  * node ~8.9.4 and npm ~5.6.*
  * ionic 3.*
  * cordova-cli

## Application setup --Development

  * Download node or brew install node.
  * Go to the app directory.
  * Run - `npm install`

## Running Application --Development

  * Run - `ionic serve` or `ionic lab`
  (Application will be hosted at http://locahlhost:8100/ionic-lab )

## Application Entry Point --Development

  * `./src/app/app.module.ts` is where app registers modules.
  * `./src/app/app.component.ts` is app entry point. 

## Application Insights

  * Whole app is written on top of `StorageProvider<class>` exsists at `./src/providers/storage/storage.ts`.
  * Pages are visual components with :
    * Controller : `[name].ts`
    * Style : `[name].scss`
    * UI/UX : `[name].html`
  * `app.module.ts` registers modules, components, pages and providers.
  * The non-commented files are ** boiler plate ** Generated through commands provided by `ionic` or `cordova`.
  * Ionic Native or Ionic component used in this application can be found at https://ionicframework.com/docs/
