export class DomUtils {

  static createDiv(cssClasses = []) {
    const div = document.createElement('div');

    if (cssClasses.length == 0) return div;

    for (const cssClass of cssClasses) {
      div.classList.add(cssClass);
    }

    return div;
  }

  static createP(text) {
    if (!text) return;

    const p = document.createElement('p');
    p.innerText = text;
    return p;
  }
}
