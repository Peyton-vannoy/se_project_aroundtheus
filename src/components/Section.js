export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //data
    this._renderer = renderer; //function
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
