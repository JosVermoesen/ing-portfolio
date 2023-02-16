# Portfolio - Uw verzekeringsdocumenten bij de hand

## Getting started for users

Web version: [demo](https://mijn.rv.be)

Your own added data is stored as json files inside the localStorage of the browser you are using (if you do not use (our) broker servers). Profit. :tada:

## Getting started for developers

### Install and update the frameworks

- [Install NodeJS](https://nodejs.org/). Hint: eventually install and use [nvm](https://medium.com/@Joachim8675309/installing-node-js-with-nvm-4dc469c977d9) for easy installing and/or switching between node versions
- [Angular CLI](https://www.npmjs.com/package/@angular/cli): `npm i -g @angular/cli`
- [Ionic CLI](https://www.npmjs.com/package/@ionic/cli): `npm i -g @ionic/cli`
- [Capacitor CLI](https://www.npmjs.com/package/@capacitor/cli): `npm i -g @capacitor/cli`

#### Do not forget to update regularly Angular for your Ionic project

- Upgrading to latest Angular: `ng update @angular/core @angular/cli`
- Latest ionic toolkit: `npm i @ionic/angular-toolkit@latest`

### Get our app code on github

- Clone this repository: `git clone https://github.com/JosVermoesen/ing-portfolio.git`.
- Run `npm install` inside the project root.
- Run `ionic serve` in a terminal from the project root.
- You are allowed to use our dotnet core server for registering and testing.
- Profit. :tada:

## environment.prod.ts

## environment.ts

Add your own environment for versions and api codes

```json
  production: true|false,
  version: '4.2.0',
  googleMapsAPIKey: 'yourkey1',

  // should be http when SSL not enabled
  // you are alowed to test with our server
  apiUrl: 'https://rv-services.be/api/',

  // add your api keys to use contactmail with our server
  apiVsoftMailGuid: 'yourkey2',
  apiVsoftSendFromAddress: 'yourmailaddress@yourdomain.be',
  apiVsoftSendFromName: 'Your Mailsender Title'
```

## Develop it yourself

- [Visual Studio Code](https://code.visualstudio.com/)
- New project: `ionic start portfolio9 blank --type=angular --capacitor`
- Initialize capacitor: `npx portfolio be.vsoft.portfolio`
- Initialize app: `npx cap init`
- If needed PWA Elements: `npm install @ionic/pwa-elements` ng add @angular/pwa
- Add Android platform: `npx cap add android`
- First build (important!): `ionic build` or production build: `ionic build --prod`
- After every build (important!): `npx cap copy`
- Open Android IDE (after latest build): `npx cap open android`
- Profit. :tada:

### Try also

ionic cap run android -l --external

## NPM packages used for this app

- [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core): `npm i @ngx-translate/core`
- [@ngx-translate/http-loader](https://www.npmjs.com/package/@ngx-translate/http-loader): `npm i @ngx-translate/http-loader`
- [jsqr](https://www.npmjs.com/package/jsqr): `npm i jsqr`
- [x](https://github.com/techiediaries/ngx-qrcode): `npm i @techiediaries/ngx-qrcode`

- install all packages in one commandline: `npm i @ngx-translate/core @ngx-translate/http-loader jsqr @techiediaries/ngx-qrcode`

### PWA (think twice before implementing..)

- Angular PWA: `ng add @angular/pwa`
- Ionic PWA Elements: `npm install @ionic/pwa-elements`

## Updating

### Ionic

- Info on current Ionic version: `Ionic -v`
- Updating Ionic globaly: `npm update -g ionic`
- Updating your project: `ionic lib update`
- Get available versions on npm: `npm info ionic`
- Get all info on your current ionic, capacitor, used framework and npm: `ionic info`

### Angular

This app is on Angular 11. Update to latest Angular 11 with:
`ng update @angular/cli@11 @angular/core@11`

Follow the instructions eventualy for fixes

## From Angular 10+ warnings

In angular.json, to avoid CommonJs warnings, add **allowedCommonJsDependencies** in the options section for **qrcode**:

```bash
"builder": "@angular-devkit/build-angular:browser",
          "options": {

            "allowedCommonJsDependencies": [
              "qrcode",
              "url"
            ],

```

## VS CODE Extensions 2021

indent rainbow
rest client
css peek (ctrl+hover)

## tsconfig.json changes for using version stamp in app

Before building, set resolveJsonModule to 'true' :

```bash
"compilerOptions": {

    "resolveJsonModule": true,

```

## Best practices: use lazy loading modules

- Generate modules ex. a hosting module: `ng generate module modules/hosting --route hosting --module app.module`
- Generate modules ex. a contact module: `ng generate module modules/contact --route contact --module app.module`

## Good practice: Updating Angular as needed

This app is on Angular 11. Update to latest Angular 11 with:
`ng update @angular/cli@11 @angular/core@11`

Follow the instructions eventualy for fixes
