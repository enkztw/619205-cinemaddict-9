const renderComponent = (template, container, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const createElement = (template) => {
  const newComponentWrap = document.createElement(`div`);
  newComponentWrap.innerHTML = template;
  return newComponentWrap.firstChild;
};

export {renderComponent};
export {createElement};
