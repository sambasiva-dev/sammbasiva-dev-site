---
title: "Loading Components Dynamically in Angular"
description: "Two ways to switch between components in Angular: conditional rendering with NgIf and NgSwitch, and creating components at runtime with ViewContainerRef, with a note on what changed in recent Angular versions."
pubDate: 2017-11-18
tags: ["Angular", "TypeScript", "Dynamic Components", "Frontend"]
category: "Frontend"
draft: false
featured: false
readingTime: "7 min read"
---

> **Note on versions:** The API section below describes the approach as it was written for Angular 8 to 12. In Angular 13 and later, `ComponentFactoryResolver` is deprecated and `entryComponents` is no longer needed. Components can be created directly with `ViewContainerRef.createComponent(MyComponent)`. The overall approach is the same, so the sample code shows the simplified form where it differs.

## Overview

When you build a front-end, you usually know which components appear in a template and in what order. Sometimes you need to load components dynamically instead. For example, you might have several components of the same type and want to load only one of them, which is a component factory. Other common cases are overlays and tab sets. This article uses a tab set.

Suppose you have two tabs, **Action** and **Actioned**. The **Action** tab body is `ActionTabComponent`, and the **Actioned** tab body is `ActionedTabComponent`. When the user clicks a tab, the matching body should load.

Angular offers several ways to load components dynamically. The two most common are:

- **Conditional rendering** with the [`NgIf`](https://angular.io/api/common/NgIf) or [`NgSwitch`](https://angular.io/api/common/NgSwitch) directives.
- **The Angular API**, using [`ComponentFactoryResolver`](https://angular.io/api/core/ComponentFactoryResolver) and [`ViewContainerRef`](https://angular.io/api/core/ViewContainerRef).

The sections below show both.

## Through condition

### NgIf directive

```html
<ng-container *ngIf="tab === 'action'; else actioned">
  <tab-action></tab-action>
</ng-container>
<ng-template #actioned>
  <tab-actioned></tab-actioned>
</ng-template>
```

### NgSwitch directive

```html
<ng-container [ngSwitch]="tab">
  <tab-action *ngSwitchCase="'action'"></tab-action>
  <tab-actioned *ngSwitchCase="'actioned'"></tab-actioned>
</ng-container>
```

The demo below uses the `NgSwitch` approach. Open the console to see the constructor messages. Click the increase button to raise the counter, then switch to Tab 2 and back to Tab 1. The counter resets because the Tab 1 component is destroyed and re-created each time. `NgIf` and `NgSwitch` work, but they don't scale well.

[Open the NgSwitch demo on Plunker](https://embed.plnkr.co/plunk/UC3MKrDzwJqbwt7e?show=app,preview&deferRun)

## Through API

Angular's APIs can create components at runtime. Angular can even load modules on the fly, but this article focuses on components. To create a component dynamically:

1. Create the component you want to load dynamically. Use the Angular CLI with `ng g c`.
2. Declare the component in the `declarations` array of an [`NgModule`](https://angular.io/guide/ngmodules). The Angular CLI usually does this for you.
3. Add the component to the `entryComponents` array. This was required to load the component dynamically in Angular 8 to 12. It is no longer needed in Angular 13 and later.
4. Place an `<ng-container>` element in the HTML template, where the component should appear. Use a template reference variable so that the code can find it.
5. Use `ComponentFactoryResolver` and `ViewContainerRef` to create the component:

```typescript
import {
  Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <ul class="nav nav-tabs">
        <li class="nav-item nav-link" *ngFor="let tab of tabs" [ngClass]="{'active': tab.id === tabId}">
          <a (click)="tabOnClick(tab.id)">{{tab.label}}</a>
        </li>
      </ul>
      <div class="tab-body">
        <ng-container #tabBody></ng-container>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild('tabBody', { read: ViewContainerRef })
  componentContainer: ViewContainerRef;

  tabId = 'one';
  tabs = [
    // { id: 'one', label: 'Tab 1', component: TabOneComponent },
    // { id: 'two', label: 'Tab 2', component: TabTwoComponent },
  ];

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadTab();
  }

  tabOnClick(id: string): void {
    this.tabId = id;
    this.loadTab();
  }

  loadTab(): void {
    const tab = this.tabs.find(t => t.id === this.tabId);
    this.componentContainer.clear();

    const factory = this.resolver.resolveComponentFactory(tab.component);
    const componentRef = this.componentContainer.createComponent(factory);

    // Call detectChanges so the component's lifecycle hooks run immediately.
    componentRef.changeDetectorRef.detectChanges();

    // To call methods on the tab component, use its instance:
    // componentRef.instance.increaseCounter();
  }
}
```

The tab definitions are shown as comments because the full list depends on your components. Replace `TabOneComponent` and `TabTwoComponent` with your own.

The sample `loadTab()` method does three things. It clears the container, so the previous tab is removed. It creates a new component in the container. Then it calls `detectChanges()`, which makes the component's lifecycle hooks run straight away. If you need to call a method on the tab component, use `componentRef.instance`.

In Angular 13 and later, the same logic is shorter:

```typescript
loadTab(): void {
  const tab = this.tabs.find(t => t.id === this.tabId);
  this.componentContainer.clear();
  const componentRef = this.componentContainer.createComponent(tab.component);
  componentRef.changeDetectorRef.detectChanges();
}
```

## Demo

[Open the full demo on StackBlitz](https://stackblitz.com/github/samreddy-patti/angular-dynamic-loading?file=src/app/app.component.ts)

## Key takeaway

Use `NgIf` or `NgSwitch` for a few fixed branches. When components need to be chosen or created at runtime, use `ViewContainerRef` and clear the container before loading the next one. Be aware that `clear()` destroys the previous component, so its state is lost. If a tab must keep its state, keep the component references alive and hide them instead of destroying them.
