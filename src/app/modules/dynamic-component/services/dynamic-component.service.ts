import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';

@Injectable()
export class DynamicComponentService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  public create<T>(component: Type<T>, container: ViewContainerRef): void {
    const resolver: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);
    container.clear();
    const componentFactory: ComponentRef<any> =   container.createComponent(resolver);
  }

  public clear(container: ViewContainerRef): void {
    container.clear();
  }
}
