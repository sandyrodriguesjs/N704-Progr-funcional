import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    document.body.classList.add("bg-dark", "text-light", "text-center");
    return () => {
      document.body.classList.remove("bg-dark", "text-light", "text-center");
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const remainingSeconds = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  const startTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      setIntervalId(null);
    } else {
      // Conceito: Função de Alta Ordem (Higher-Order Function)
      // A função 'iniciarContador' é uma HOF porque aceita uma função ('tickLogic') como argumento.
      const iniciarContador = (tickLogic, delay) => {
        const newIntervalId = setInterval(tickLogic, delay);
        return newIntervalId;
      };

      // Esta variável 'id' será acessada pela closure abaixo.
      let id;

      // Conceito: Função Lambda (Arrow Function) e Closure
      // 'tick' é uma Função Lambda.
      // 'tick' também é uma Closure, pois "fecha" e captura a variável 'id'
      // do escopo externo (da função startTimer) para usá-la posteriormente.
      const tick = () => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(id); // Acessando 'id' do escopo pai (Closure)
            alert("Tempo esgotado!");
            setIsRunning(false); // Para o botão de pausar
            return 0;
          }
        });
      };

      // Usando nossa Função de Alta Ordem para iniciar o contador
      id = iniciarContador(tick, 1000);

      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const resetTimer = (newTime) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsRunning(false);
      setIntervalId(null);
    }
    setTime(newTime);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Array de dados
  const timerOptions = [
    { label: "Pomodoro", time: 25 * 60 },
    { label: "Pausa Curta", time: 5 * 60 },
    { label: "Pausa Longa", time: 15 * 60 },
  ];

  return (
    <>
      <header className="bg-primary py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/pomodoro" data-cy="nav-home">
            <i
              className="fa-sharp fa-solid fa-clock ml-2 mx-2"
              style={{ color: "#74C0FC" }}
            ></i>
            Pomodoro
          </Link>
          <nav>
            <Link to="/gerenciamento_users" data-cy="nav-users">
              <button className="btn text-light fw-bold">
                Gerenciar usuários
              </button>
            </Link>
            <button
              onClick={logout}
              className="btn fw-bold text-light"
              data-cy="btn-logout"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      <div className="container mt-5">
        <div className="d-flex justify-content-center mb-3">
          {/* Usando .map() como List Comprehension para criar botões */}
          {timerOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => resetTimer(option.time)}
              className="btn btn-primary rounded-pill mx-1"
              data-cy={`btn-${option.label.replace(" ", "-").toLowerCase()}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div
          id="display-temporizador"
          data-cy="timer-display"
          className="display-1 font-weight-bold"
        >
          {formatTime(time)}
        </div>

        <button
          onClick={startTimer}
          className="btn btn-primary btn-lg rounded-pill mt-3"
          data-cy="btn-start-pause"
        >
          {isRunning ? "PAUSAR" : "INICIAR"}
        </button>
      </div>
    </>
  );
}

export default Pomodoro;
