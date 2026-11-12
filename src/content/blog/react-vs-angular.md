---
title: "React vs Angular: A Hands-On Comparison"
description: "Comparing React and Angular in practice: trends, learning curve, tooling, portability, architecture, templates, data binding, control statements and component communication, with side-by-side code."
pubDate: 2018-08-16
tags: ["React", "Angular", "TypeScript", "JavaScript", "Frontend"]
category: "Frontend"
draft: false
featured: false
readingTime: "15 min read"
---

> **Note on versions:** This comparison was written against the React 16 and Angular 8 era. Some tooling mentioned below has since changed. `create-react-app` is deprecated, Protractor was removed in Angular 16, and Augury has been superseded by the official [Angular DevTools](https://angular.dev/tools/devtools). The concepts still hold, but check the current docs before starting a project.

## Overview

There are many front-end frameworks and libraries, and the number grows every year. Among them, the most widely used are [React](https://react.dev) and [Angular](https://angular.dev). Both aim at the same goal, but they take different approaches. Choosing one is always a challenge, and many articles list the pros and cons of each. This article takes a different route: it compares them in practice. Before you choose, get hands-on with both and then decide which suits your needs.

## Trends

Refer to [npmtrends](https://www.npmtrends.com/@angular/core-vs-react) for binary download trends.

For search interest, see the [Google Trends comparison of React and Angular](https://trends.google.com/trends/explore?q=React,Angular&date=today%2012-m) over the last 12 months, including the geographic map.

## Learning curve

### React

[React](https://reactjs.org/) is a JavaScript library developed and maintained by Facebook. It uses plain JavaScript, with HTML-like elements embedded in JavaScript through JSX. If you already know JavaScript and HTML, it is easy to pick up. Developers coming from .NET, Java or other backend technologies may find some concepts harder, and you need to understand state management properly.

React is a UI-only library. To build a full single-page application, you also need to choose other libraries:

- **Routing.** Many routing libraries are available. See the [React routing list](https://reactjs.org/community/routing.html).
- **State container.** React has several ways to manage state. [Redux](https://redux.js.org) is one of the best known.
- **AJAX library.** You can choose any library for HTTP calls, such as the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Rx.js](http://reactivex.io/), [Axios](https://github.com/axios/axios), [jQuery](http://api.jquery.com/jquery.ajax/) or [others](https://reactjs.org/community/data-fetching.html).

This freedom means that when you move to another project with a different combination of libraries, you have to learn that stack as well.

### Angular

[Angular](https://angular.dev/) is a framework developed and maintained by Google. It provides a standard stack that is shared across applications. Angular uses [TypeScript](https://www.typescriptlang.org/), a statically typed language, along with a built-in routing API, and [Rx.js](http://reactivex.io/) for AJAX. Because of static typing, developers from backend technologies like .NET and Java find the code easy to follow.

Angular has a standard stack, so you learn it once and use the same stack in every project. This reduces the learning effort. Angular does not stop you from choosing other tools. For example, you can use the Fetch API instead of Rx.js, or even use React as the view inside Angular.

## Tools

### IDE

The IDEs and editors most often used for React and Angular are:

1. [WebStorm](https://www.jetbrains.com/webstorm/)
2. [VS Code](https://code.visualstudio.com/)
3. [Sublime Text](https://www.sublimetext.com/)
4. [Atom](https://atom.io/)

I prefer WebStorm, but it is paid. If you want a free option, [VS Code](https://code.visualstudio.com/) is a good choice. Both editors support React and Angular well.

### Testing

Use the default testing tools that come with each framework rather than experimenting with alternatives.

- **React:** See the [React testing guide](https://reactjs.org/community/testing.html) for the tools and frameworks available.
- **Angular:** Angular uses [Jasmine](https://jasmine.github.io/) for unit tests. It used [Protractor](https://www.protractortest.org/) for functional tests, but Protractor was deprecated in Angular 12 and removed in Angular 16. Check the [Angular testing guide](https://angular.dev/guide/testing) for current recommendations.

### Debugging

Most browsers have built-in developer tools for debugging both React and Angular applications. Other tools help you understand the application flow and change data on the fly.

- **React:** The [React DevTools](https://github.com/facebook/react-devtools) extension lets you inspect the component hierarchy, props and state. Other [React debugging tools](https://medium.com/@jondot/10-react-developer-tools-you-might-have-missed-6c7575cc27eb) are also available.
- **Angular:** [Angular DevTools](https://angular.dev/tools/devtools) is the official browser extension for inspecting components and their state. The older Augury extension is no longer maintained. See the [Angular resources page](https://angular.dev/resources) for more tools.

## Portability

The main challenge with front-end components is portability. A component built with one stack can only be used in that stack. For example, if you build a button component in React, you can use it only in React applications. Components tied to a stack cannot be reused in other stacks.

[Angular custom elements](https://angular.io/guide/elements) let you package Angular components as custom elements and use them in React or other stacks. Angular elements are Angular components packaged as [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), a web standard for defining new HTML elements in a framework-agnostic way.

## Architecture

**React** is a library that fits the view layer of an MVC model. As described in the [learning curve](#learning-curve) section, React does not impose an application architecture. You choose and design the architecture yourself. React does follow a component model, so you build UI components and combine them on a page. The sections below show how.

**Angular** is a framework that follows the MVC pattern for applications. In practice, most front-end frameworks follow MV* patterns, where the controller is not used as a separate concept. Google describes Angular as MVW (Model-View-Whatever). Refer to the [Angular architecture guide](https://angular.dev/guide/architecture) for details. Angular uses decorators for dependency injection. It also follows a component model, where each component combines templates, directives, pipes and services. The diagram below shows how they fit together.

![Angular architecture overview](https://angular.io/generated/images/guide/architecture/overview2.png)

## Hands-on

### Create a project

You can try both frameworks in online editors such as [CodePen](https://codepen.io/), [Plnkr](https://plnkr.co/) or [StackBlitz](https://stackblitz.com). For a local setup, both React and Angular need [Node.js](https://nodejs.org/en/download/), which includes [npm](https://www.npmjs.com/) to manage dependencies. After installing Node.js, check that npm is on your path:

```bash
npm --version
```

**React.** Install the React command-line utility globally, then create an app:

```bash
npm install -g create-react-app
create-react-app react-demo
cd react-demo/
```

`create-react-app` generates a `package.json` with the React dependencies (`react`, `react-dom` and the build scripts), plus a basic folder structure. Start the dev server:

```bash
npm start
```

This starts a server on port 3000 and opens the browser. Note that `create-react-app` is deprecated. For new projects, use a build tool such as [Vite](https://vitejs.dev/) with a React template.

**Angular.** The [Angular CLI](https://angular.dev/tools/cli) generates projects, folder structures, and handles development, testing, building and deployment. Install it:

```bash
npm install -g @angular/cli
```

Create the project:

```bash
ng new angular-demo
cd angular-demo
```

`ng new` creates the project, folder structure, installs dependencies and sets up testing. Angular has a standard folder structure and configuration. See the [file structure](https://angular.dev/guide/file-structure) and [workspace configuration](https://angular.dev/guide/workspace-config) guides for details. Run the application:

```bash
ng serve --open
```

Angular also provides mocking, a dev-server proxy, unit testing and modularity out of the box, which removes a lot of setup work.

### Template

**React** uses the `ReactDOM` API to render templates. Templates are part of a JavaScript file in JSX (JavaScript XML):

```jsx
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* template demo */}
        <h1>Welcome to React</h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

`ReactDOM` uses a [virtual DOM](https://reactjs.org/docs/faq-internals.html) rather than calling browser APIs directly to update the UI. The virtual DOM lets React render or re-render only the components that changed.

**Angular** separates concerns clearly. You can write the template inline in the component decorator, or put it in a separate HTML file and reference it from the component. The inline template looks like this:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'welcome',
  template: `
    <!-- template demo -->
    <div>
      <h1>Welcome to Angular</h1>
    </div>
  `
})
export class AppComponent {}
```

A separate template is referenced with `templateUrl`:

```html
<!-- message.html -->
<div>
  <h1>Welcome to Angular</h1>
</div>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'welcome',
  templateUrl: './message.html'
})
export class AppComponent {}
```

### Data binding

**React** uses one-way data flow. You update state with `this.setState()`, and the UI re-renders from it. The [StackBlitz demo](https://stackblitz.com/edit/react-databinding) shows the binding. React can also do two-way binding, which makes forms simpler, using [helper functions](https://reactjs.org/docs/two-way-binding-helpers.html).

Two things stand out in the React example. The HTML `class` attribute becomes `className`. The `onChange` event works like the native `oninput` event. In HTML, `onchange` fires when the input loses focus. In React, it fires on every keystroke.

**Angular** supports one-way and two-way binding. The [one-way demo](https://stackblitz.com/edit/angular-data-one-way-binding) mirrors the React example. To sync the UI with the React view, it uses the `(input)` event instead of `(change)`.

For two-way binding, use the `[(ngModel)]` directive instead of `[value]` and remove the `(input)` event:

```html
<input class="form-control" placeholder="Enter your name" [(ngModel)]="name"/>
```

For clarity, both examples put all of their code in a single component.

### Control statements

**React** supports control flow in two ways. You can use expressions inside JSX, or use plain JavaScript to add elements conditionally. The [StackBlitz demo](https://stackblitz.com/edit/react-control-statement) uses expressions. For a JavaScript-style loop, you can write:

```jsx
function DependentsView(props) {
  const { dependents } = props;
  const view = [];
  for (let i = 1; i <= dependents.length; i++) {
    view.push(
      <div className="form-group" key={i}>
        <label htmlFor={`dependent${i}`}>Dependent {i}</label>
        <input className="form-control" id={`dependent${i}`} />
      </div>
    );
  }
  return view;
}
```

**Angular** provides directives for control statements, such as `*ngIf`, `*ngFor` and `*ngSwitch`. It also has `<ng-template>` and `<ng-container>` elements for dynamic UI. See the [structural directives guide](https://angular.dev/guide/directives/structural-directives). The [StackBlitz demo](https://stackblitz.com/edit/angular-control-statements) shows them in use.

In both demos, select the **Married** checkbox to show the other fields conditionally. Enter a dependent count to show the dependent fields.

### Component communication

Components communicate in two ways: by passing input values down, and by returning values up. The demo has two components, `Menu` and `Body`. When the user clicks a menu item, `Menu` returns the page name. `Body` takes that value and shows the matching content. `Body` takes `page` as input and `onMenuSelection` as a callback for output.

**React** uses [props](https://react.dev/learn/passing-props-to-a-component) for both. You pass a value as a prop for input, and a function as a prop for output. See the [StackBlitz demo](https://stackblitz.com/edit/react-component-comm).

**Angular** uses the [`@Input()`](https://angular.dev/api/core/Input) decorator for input values, and the [`@Output()`](https://angular.dev/api/core/Output) decorator with an [`EventEmitter`](https://angular.dev/api/core/EventEmitter) for output. See the [StackBlitz demo](https://stackblitz.com/edit/angular-component-com).

## Conclusion

React and Angular each have their advantages and disadvantages. The main points are:

**React** uses a dynamically typed programming model with a store-based state approach. Facebook created React with the virtual DOM to solve a specific problem that is common to many web apps: displaying large amounts of data that change dynamically. JSX changes a number of HTML elements and attributes to work with React. Each project chooses its own stack to build the framework of the application, which increases the learning curve.

**Angular** uses a statically typed programming model with TypeScript. This makes code easier to understand and maintain in large projects. The cost is boilerplate and configuration when you build components. The Angular CLI reduces much of the manual configuration. Angular elements can be used with other frameworks, which improves reuse. Angular uses standard HTML elements and attributes, with an extra set of elements that separate JavaScript from HTML. It provides a standard stack, which reduces the learning curve, and it is easy to pick up for developers with a .NET or Java background.

## Key takeaway

Pick React if you want a lightweight view library and are happy to assemble your own stack. Pick Angular if you want a complete, opinionated framework with TypeScript and a standard set of tools, especially for large teams and projects.
