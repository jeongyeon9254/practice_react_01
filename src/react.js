const Hooks = [];
let currentComponent = 0;

export class Component {
  constructor(props) {
    this.props = props;
  }
}

// 리얼돔을 만들어줌
export function createDom(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const elemenet = document.createElement(node.tag);

  Object.entries(node.props).forEach(([name, value]) => {
    elemenet.setAttribute(name, value);
  });

  node.children.map(createDom).forEach(elemenet.appendChild.bind(elemenet));

  return elemenet;
}

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
}

// hooks 의 컨셉
function useState(val) {
  let position = currentComponent - 1;
  if (!Hooks[position]) {
    Hooks[position] = [...val];
  }

  const modifre = (nextVal) => {
    Hooks[position] = nextVal;
  };

  return [Hooks[position], modifre];
}

// 그럼 왜 대문자여야 했을까? 상수도 대문자 쓰는데
export function createElement(tag, props, ...children) {
  props = props || {};

  if (tag instanceof Function) {
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } else {
      Hooks[currentComponent] = null;
      currentComponent++;
      if (children.length > 0) {
        return tag(makeProps(props, children));
      } else {
        return tag(props);
      }
    }
  } else {
    // 트리구조를 가지고있음
    return { tag, props, children };
  }
}

export function render(vdom, con) {
  con.appendChild(createDom(vdom));
}

// const render = (function () {
//   let prevDom = null;
//   return function (vdom, con) {
//     if (prevDom === null) {
//       prevDom = vdom;
//     }
//     con.appendChild(createDom(vdom));
//   };
// })();
