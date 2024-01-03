/** @jsx createElement */
import { render, createElement, Component } from "./react.js";
// 소프트웨어를 위한 소프트웨어 리액트

class Title extends Component {
  render() {
    return <h1>{this.props.children}</h1>;
  }
}

function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>;
}

const App = () => {
  return (
    <p>
      <Title>리액트 만들기</Title>
      <ul>
        <Item color="blue">첫번째 만들기</Item>
        <Item color="red">두번째 만들기</Item>
        <Item color="yellow">세번째 만들기</Item>
      </ul>
    </p>
  );
};

render(<App />, document.getElementById("root"));
console.log(<App />);
