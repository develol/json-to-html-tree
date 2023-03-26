# json-to-html-tree
[JavaSctipt] A class for creating an adaptive HTML tree from JSON\
**[Example](https://deve.lol/www/jsontohtmltree/)**

## Getting started
1. Cloning this repository
2. Connecting a **JSONtoHTMLTree.js**
3. Creating an instance of a class
```javascript
let tree = new JSONtoHTMLTree(
  // {
  //   classPrefix: 'tree-creator',
  //   tagContent: 'input'
  // }
);
```
4. Initializing tree
```javascript
tree.init(
  '<json>', 
  document.getElementById('<id_element>')
);
```
