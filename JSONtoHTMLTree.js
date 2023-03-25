class JSONtoHTMLTree {
    #options;

    constructor(options = {
        classPrefix: 'tree-creator',
        tagContent: 'input'
    }) {
        this.#options = options;
    }

    init(json, elem) {
        this.#recursive(json, {
            elemInputBase: elem
        });
    }

    #isObject(value) {
        return (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value)
        );
    }

    #creator(elemAppended, tag) {
        let elemReturn = document.createElement(tag);
        elemAppended.append(elemReturn);
        return elemReturn;
    }

    #recursive(json, elems) {
        let objCount = 0,
            attrCount = 0;
        let openSymbol = '►',
            closeSymbol = '▼',
            classTable = this.#options.classPrefix + '-table',
            classContainer = this.#options.classPrefix + '-container',
            classController = this.#options.classPrefix + '-controller',
            classTitle = this.#options.classPrefix + '-title',
            classBody = this.#options.classPrefix + '-body',
            classContent = this.#options.classPrefix + '-content',
            classHidden = this.#options.classPrefix + '-hidden',
            classHiddenController = this.#options.classPrefix + '-hidden-controller',
            classHiddenBody = this.#options.classPrefix + '-hidden-body';

        for (var key in json) {
            if (this.#isObject(json[key])) {
                let elemTable = this.#creator(elems.elemInputBase, 'table'),
                    elemContainer = this.#creator(elemTable, 'tr'),
                    elemController = this.#creator(elemContainer, 'td'),
                    elemTitle = this.#creator(elemContainer, 'td'),
                    elemBody = this.#creator(elemContainer, 'td'),
                    elemContent = this.#creator(elemBody, this.#options.tagContent),
                    elemHidden = this.#creator(elemTable, 'tr'),
                    elemHiddenController = this.#creator(elemHidden, 'td'),
                    elemHiddenBody = this.#creator(elemHidden, 'td');

                elemTable.classList.add(classTable);
                elemContainer.classList.add(classContainer);
                elemController.classList.add(classController);
                elemTitle.classList.add(classTitle);
                elemBody.classList.add(classBody);
                elemContent.classList.add(classContent);
                elemHidden.classList.add(classHidden);
                elemHiddenController.classList.add(classHiddenController);
                elemHiddenBody.classList.add(classHiddenBody);

                elemController.innerHTML = openSymbol;
                elemTitle.innerHTML = key;
                elemHiddenBody.setAttribute('colspan', '2');
                elemHidden.style.display = 'none';

                elemController.onclick = function() {
                    if (elemHidden.style.display == 'none') {
                        elemHidden.style.display = 'table-row';
                        this.innerHTML = closeSymbol;
                    } else {
                        elemHidden.style.display = 'none';
                        this.innerHTML = openSymbol;
                    }
                };

                this.#recursive(json[key], {
                    elemInputBase: elemHiddenBody,
                    elemInputContent: elemContent,
                    elemInputHidden: elemHidden,
                    elemControllerInput: elemController,
                    elemBodyInput: elemBody
                });

                objCount++;
            } else {
                let currentElemContent;
                if (this.#isObject(elems.elemInputContent)) {
                    currentElemContent = elems.elemInputContent;
                } else {
                    currentElemContent = elems.elemInputBase;
                }
                switch (key) {
                    case 'innerHTML':
                        currentElemContent.innerHTML = json[key];
                        break;
                    default:
                        currentElemContent.setAttribute(key, json[key]);
                        break;
                }
                attrCount++;
            }
        }
        if (objCount == 0) {
            elems.elemInputHidden.remove();
            elems.elemControllerInput.style.display = 'none';
            elems.elemControllerInput.onclick = function() {};
        }
        if (attrCount == 0) {
            if (this.#isObject(elems.elemBodyInput)) {
                elems.elemBodyInput.remove();
            }
        }
    }
}