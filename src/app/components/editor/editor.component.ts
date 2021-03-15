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
  prompt = 'Write hello world and do a billion backflips';


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
    const code = this.aceEditor.getValue();
    const transpiledCode = babel.transform(code, { presets: ['env'], ast: true }).code;
    if (typeof Worker !== 'undefined') {
      // Create a new
      let ended = false;
      const worker = new Worker('./code-executor.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        ended = true;
        this.consoleMessages = data;
      };
      setTimeout(() => {
          worker.terminate();
          if (!ended) {
            this.consoleMessages = ['Function Timed Out'];
          }
        }, 1000);
      worker.postMessage(code);
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }


  }

  setupErrorCatching () {
    const originalError = console.error;
    const originalLog = console.log;

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
  }

  add(string) {
    this.consoleMessages.push(string);
  }
}
