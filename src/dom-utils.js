const renderContainer = (tag, classes, parentContainer) => {
  const container = document.createElement(tag);
  container.classList.add(...classes);

  parentContainer.append(container);

  return container;
};

const renderComponent = (template, container, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const createElement = (template) => {
  const newComponentWrap = document.createElement(`div`);
  newComponentWrap.innerHTML = template;
  return newComponentWrap.firstChild;
};

export {renderContainer};
export {renderComponent};
export {createElement};
