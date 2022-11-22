export class Component {
  constructor(options) {
    this.document = options.shadowDom;
    this.box = this.document.getElementById("box");
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    switch (attribute) {
      case "layout":
        this.box.classList.add(newValue);
        break;
    }
  }
}
