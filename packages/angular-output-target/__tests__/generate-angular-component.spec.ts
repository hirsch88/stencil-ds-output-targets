import { ComponentCompilerMeta } from '@stencil/core/internal';
import { createComponentDefinition } from '../src/generate-angular-component';

describe('createComponentDefinition', () => {
  const generateComponent = createComponentDefinition('component-library', '', '');

  test('should create a Angular component', () => {
    const finalText = generateComponent({
      tagName: 'my-component',
      properties: [],
      virtualProperties: [],
      events: [],
      methods: [],
      sourceFilePath: '',
      componentClassName: 'MyComponent',
    } as ComponentCompilerMeta);
    expect(finalText).toEqual(`

export declare interface MyComponent extends Components.MyComponent {}

@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class MyComponent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}`);
  });

  test('should create a Angular component with an event', () => {
    const finalText = generateComponent({
      tagName: 'my-component',
      properties: [],
      virtualProperties: [],
      events: [
        {
          internal: false,
          name: 'my-event',
          method: '',
          bubbles: true,
          cancelable: true,
          composed: false,
          docs: {
            text: '',
            tags: [],
          },
          complexType: {
            original: 'boolean',
            resolved: 'boolean',
            references: {},
          },
        },
      ],
      methods: [],
      sourceFilePath: '',
      componentClassName: 'MyComponent',
    } as ComponentCompilerMeta);
    expect(finalText).toEqual(`
import { MyComponent as IMyComponent } from 'component-library';
export declare interface MyComponent extends Components.MyComponent {}

@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  outputs: ['my-event']
})
export class MyComponent {
  /**  */
  my-event!: EventEmitter<boolean>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['my-event']);
  }
}`);
  });
});
