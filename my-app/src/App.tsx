import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { useAppDispatch } from 'src/hook';
import { addTodo, } from 'src/store/todoSlice';
import reduxTest from "./addRedux/addToken"

// <Main />
type MyProps = {

};

type MyState = {
  timer: string;
};
class App extends React.Component<MyProps, MyState> {



  constructor(props: MyProps | Readonly<MyProps>, myState: MyState) {
    super(props);
    this.state = {
      timer: "timer",
    };
  }

  componentDidMount() {
    //не работает так
    reduxTest()
  }




  render() {
    return (
      <div className='wrapper' >
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </div>

    );
  }

}



export default App;
