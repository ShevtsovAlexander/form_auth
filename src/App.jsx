import './App.css'
import {useRef} from "react";
// import axios from 'axios'
function App() {

  const form = useRef(null)
  const eField = useRef(null)
  const eInput = useRef(null)
  const pField = useRef(null)
  const pInput = useRef(null)


  let pattern2 = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  let pattern = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
      async function Post() {
        if (eInput.current.value.match(pattern2) && pInput.current.value.match(pattern) && !eField.current.classList.contains("error") && !pField.current.classList.contains("error")) {


          await fetch('http://localhost:3000/form', {
            method: 'POST',
            headers: {
              // 'Access-Control-Allow-Origin': 'http://localhost:5173/',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'login': eInput.current.value,
              'password': pInput.current.value,
            })
          });
      }}

  window.onload = function() {
    form.current.onsubmit =  (e) => {
      e.preventDefault();
      (eInput.current.value === "") ? eField.current.classList.add("shake", "error") : checkEmail();
      (pInput.current.value === "") ? pField.current.classList.add("shake", "error") : checkPassword();
      setTimeout(() => {
        eField.current.classList.remove("shake");
        pField.current.classList.remove("shake");
      }, 500);


      eInput.current.onkeyup = () => {
        checkEmail();
      }
      pInput.current.onkeyup = () => {
        checkPassword();
      }
    }
  }
      function checkEmail() {
        console.log('mail')
        if (!eInput.current.value.match(pattern2)) {
          eField.current.classList.add("error");
          eField.current.classList.remove("valid");
          const errorTxt = eField.current.querySelector(".error-txt");
          (eInput.current.value !== "") ? errorTxt.innerText = "Введите валидный адрес электронной почты" : errorTxt.innerText = "Вы не ввели адрес электронной почты";
        } else {
          eField.current.classList.remove("error");
          eField.current.classList.add("valid");
        }
      }

      function checkPassword() {
        console.log('password')
        if (!pInput.current.value.match(pattern)) {
          pField.current.classList.add("error");
          pField.current.classList.remove("valid");
          const errorTxt = pField.current.querySelector(".error-txt");
          (eInput.current.value !== "") ? errorTxt.innerText = "Пароль должен состоять из символов, цифр и букв (1qD@&@<#)" : errorTxt.innerText = "Вы не ввели пароль";
        } else {
          pField.current.classList.remove("error");
          pField.current.classList.add("valid");
        }

    }

  return (
    <>
      <div className="wrapper">
        <header>Вход</header>
        <form ref={form}>
          <div ref={eField} className="field email">
            <div className="input-area">
              <input ref={eInput} name={'login'} type="text" placeholder="Введите почту" />
                <i className="icon"></i>
                <i className="error error-icon "></i>
            </div>
            <div className="error error-txt">Вы не ввели адрес электронной почты</div>
          </div>
          <div ref={pField}   className="field password">
            <div className="input-area">
              <input ref={pInput}  name={'password'} type="password" placeholder="Введите пароль" />
                <i className="icon"></i>
                <i className="error error-icon "></i>
            </div>
            <div  className="error error-txt">Вы не ввели пароль</div>
          </div>
          <div className="pass-txt"><a href="#">Забыли пароль?</a></div>
          <input onClick={() => Post()} type="submit" value="Войти"></input>
        </form>
        <div className="sign-txt">Нет учетной записи? <a href="#">Зарегистрируйся!</a></div>
      </div>
    </>
  )
}
export default App

