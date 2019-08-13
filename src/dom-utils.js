const renderContainer = (tag, classes, parentContainer) => {
  const container = document.createElement(tag);
  container.classList.add(...classes);

  parentContainer.append(container);

  return container;
};

const renderComponent = (template, container, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

export {renderContainer};
export {renderComponent};
