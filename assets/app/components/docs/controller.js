export class docsController {
  constructor() {

    this.tableOfContent = this.tableOfContent ? this.tableOfContent : [];
  }

  createTableOfContents() {

    this.createContent("Introduction", "intro");
    this.createContent("Advantage of components", "advantages");
    this.createContent("What about Angular 2?", "angular2");
    this.createContent("The workflow journey", "journey");
    this.createContent("Component oriented architecture", "architecture");
    this.createContent("Dynamic component loading", "loading");
    this.createContent("Dynamic injection", "injection");
    this.createContent("Better and strong workflow for companies using Angular 1.x", "better");
    this.createContent("Component communication", "communication");
    this.createContent("Automation tasks", "automate");
    this.createContent("Use ES2015 or later", "es2015");
    this.createContent("TDD Strong focus", "tdd");
    this.createContent("Future plans", "future");
  }

  getTableOfContents() {

    if (!this.tableOfContent.length) {
      throw 'Table of contents is empty, you should use createContent or  createTableOfContents method';
    }

    return this.tableOfContent;
  }

  createContent(text, target) {

    this.tableOfContent.push({ text: text, target: target });
  }

}