# NgTypedDate

  

Directive that uses the native date picker and binds the typed value to Date.

  

### How to install with npm ?

```

npm i @ng-not-found/ng-typed-date --save

```

  

### What is this component for? ###

  

This te directive has the purpose of facilitating the use of date fields, making the binding in the model in a typed way.

  

When working with dates in Angular, it binds with a string and that's usually not what we need. We need it to be a valid Date.

  

### How do I use it? ###

  

```module.ts

import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

  

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { NgTypedDateModule } from '@ng-not-found/ng-typed-date';

  

@NgModule({

declarations: [

  AppComponent,

],

imports: [

  FormsModule,

  BrowserModule,

  AppRoutingModule,

  NgTypedDateModule

],

providers: [],

bootstrap: [AppComponent]

})

export class AppModule { }

  

```

```.html

  

<form #form="ngForm">

  <input type="date" [(ngModelDate)]="data" name="data" />

</form>

  

```

### Properties ###


| Name  |  Type |
| ------------ | ------------ |
| min  |  Date / string  |
| max |  Date / string  |
