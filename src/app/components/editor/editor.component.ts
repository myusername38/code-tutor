import { Component,
         OnInit,
         ElementRef,
         ViewChild,
         AfterViewInit
       } from '@angular/core';
import * as ace from 'ace-builds';
import * as babel from '@babel/standalone';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;

  aceEditor = null;
  infiniteLoopCB = line => {
    throw new Error(`Bad loop on line ${ line }`);
  };
  timeout = 100;
  consoleMessages = [];


  constructor() { }

  ngOnInit(): void {
    this.setupErrorCatching();

  }

  ngAfterViewInit(): void {

    this.setAce();

  }

  setAce() {
    ace.config.set('fontSize', '14px');
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme('ace/theme/monokai');
    this.aceEditor.session.setMode('ace/mode/javascript');
  }

  runCode() {
    this.consoleMessages = [];
    const codeInput = this.aceEditor.getValue();
    const transpiledCode = babel.transform(codeInput, { presets: ['env'], plugins: [this.loopControl], ast: true }).code;
    try {
      (new Function(transpiledCode))();
    } catch (error) {
      console.error(error)
    }
  }

  setupErrorCatching () {
    const originalError = console.error;
    const originalLog = console.log;
    const originalWarning = console.warn;
    const originalInfo = console.info;
    const originalClear = console.clear;

    const add = something => {
      this.consoleMessages.push(something)

    }

    console.error = function (error) {
      if (error.toString().includes('ReferenceError')) {
        add(error.toString());
      } else if (error.toString().includes('Execution Timedout')) {
        add('Error: Infinite Loop');
      } else {
        add(arguments[1].toString());
      }


      originalLog(arguments[1])

      originalError.apply(arguments);
    };
    console.log = function (...args) {
      args.forEach(add);
      originalLog.apply(console, args);
    };
    console.warn = function (...args) {
      args.forEach(add);
      originalWarning.apply(console, args);
      originalLog(arguments);
      console.log('hey4')
    };
    console.info = function (...args) {
      console.log('hey5')
      args.forEach(add);
      originalInfo.apply(console, args);
    };
    console.clear = function (...args) {
      this.consoleMessage = '';
      originalClear.apply(console, args);
    };
  }

  add(string) {
    this.consoleMessages.push(string);
  }

  loopControl(b) {
    let t = b.types;
    return {
       visitor: {
          WhileStatement: function transformWhile(path) {
            let variableName = path.scope.generateUidIdentifier('timer');
            let declaration = t.declareVariable(variableName);
            path.scope.parent.push(declaration);
            let definition = t.assignmentExpression(
              '=',
              variableName,
              t.callExpression(t.memberExpression(t.identifier('Date'), t.identifier('now')), [])
            );
            path.insertBefore(t.expressionStatement(definition));
            const lhs = t.parenthesizedExpression(t.binaryExpression('+', variableName, t.NumericLiteral(3000)));
            path
              .get('body')
              .pushContainer(
                'body',
                t.ifStatement(
                  t.binaryExpression('>', t.callExpression(t.memberExpression(t.identifier('Date'), t.identifier('now')), []), lhs),
                  t.throwStatement(t.stringLiteral('Execution Timedout')),
                  null
                )
              );
          }
       }
    };
  }
}
