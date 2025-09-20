
---

# Documento de Requisitos: Utilização de Conceitos de Programação Funcional
**Projeto:** Componente Pomodoro - `page.jsx`

## Objetivo
Este documento detalha a implementação dos conceitos de Programação Funcional exigidos, indicando onde cada construção foi utilizada no código-fonte final do componente Pomodoro (`page.jsx`).

---

## 1. Função Lambda (Arrow Function)

### Análise Inicial
O código original já utilizava funções lambda extensivamente, o que é uma prática comum em React. Elas estavam presentes principalmente nos manipuladores de evento `onClick` e nos hooks `useEffect` e `useState`.

**Exemplo no código original:**

```javascript
<button onClick={() => resetTimer(25 * 60)} ... >
```

```javascript
useEffect(() => {
    // ...
    return () => { // <-- Função Lambda
       // ...
    };
}, []);
```

### Alterações Realizadas
Para tornar o uso mais explícito dentro da lógica principal do timer, a lógica de decremento do tempo foi extraída para uma função lambda separada, chamada `tick`.

### Implementação final na função `startTimer`:

```javascript
// 'tick' é declarada como uma Função Lambda
const tick = () => {
    setTime((prevTime) => {
        if (prevTime > 0) {
            return prevTime - 1;
        } else {
            clearInterval(id);
            alert('Tempo esgotado!');
            setIsRunning(false);
            return 0;
        }
    });
};
```

---

## 2. Closure (Fechamento)

### Análise Inicial
O código original já continha uma closure. A função anônima passada para `setInterval` acessava a variável `id` do escopo da função `startTimer` para poder parar o intervalo.

**Exemplo no código original:**

```javascript
const id = setInterval(() => { // <-- Esta função interna é uma closure
    setTime((prevTime) => {
        if (prevTime <= 1) {
            clearInterval(id); // <-- Acessa 'id' do escopo externo
            // ...
        }
        return prevTime - 1;
    });
}, 1000);
```

### Alterações Realizadas
A refatoração manteve e clarificou este conceito. A nova função `tick` continua sendo uma closure.

### Implementação final na função `startTimer`:

```javascript
let id; // Variável no escopo pai

// A função 'tick' é uma closure pois captura a variável 'id'
const tick = () => { 
    setTime((prevTime) => {
        if (prevTime > 0) {
            return prevTime - 1;
        } else {
            // 'tick' usa a variável 'id' que ela lembrou de seu escopo pai.
            clearInterval(id); 
            alert('Tempo esgotado!');
            return 0;
        }
        // ... (restante da lógica do tick)
    });
};

id = iniciarContador(tick, 1000);
```

---

## 3. Função de Alta Ordem (Higher-Order Function)

### Análise Inicial
O código já utilizava `setInterval`, que é uma função de alta ordem nativa do JavaScript, pois aceita uma função como primeiro argumento. O hook `setTime` do React também pode agir como uma HOF.

**Exemplo no código original:**

```javascript
// 'setInterval' é uma HOF que recebe uma função lambda como argumento.
const id = setInterval(() => { /* ... */ }, 1000);
```

### Alterações Realizadas
Para demonstrar o conceito de forma explícita, foi criada uma função de alta ordem chamada `iniciarContador`.

### Implementação final na função `startTimer`:

```javascript
// 'iniciarContador' é uma Função de Alta Ordem porque
// aceita a função 'tickLogic' como um de seus argumentos.
const iniciarContador = (tickLogic, delay) => {
    const newIntervalId = setInterval(tickLogic, delay);
    return newIntervalId;
};

// ... (dentro de startTimer)

// Uso da HOF: passamos a função 'tick' como argumento.
id = iniciarContador(tick, 1000);
```

---

## 4. List Comprehension

### Análise Inicial
O código original não continha este conceito. Os três botões de controle do timer (Pomodoro, Pausa Curta, Pausa Longa) eram escritos manualmente e de forma repetitiva no JSX.

**Código original (sem List Comprehension):**

```javascript
<div className="d-flex justify-content-center mb-3">
    <button onClick={() => resetTimer(25 * 60)} ...>
        Pomodoro
    </button>
    <button onClick={() => resetTimer(5 * 60)} ...>
        Pausa Curta
    </button>
    <button onClick={() => resetTimer(15 * 60)} ...>
        Pausa Longa
    </button>
</div>
```

### Alterações Realizadas
Para implementar o conceito, os botões foram gerados dinamicamente a partir de um array de dados, utilizando o método `.map()`.

### Implementação Final (na renderização do componente):

```javascript
// 1. Um array de dados foi criado para representar os botões.
const timerOptions = [
    { label: 'Pomodoro', time: 25 * 60 },
    { label: 'Pausa Curta', time: 5 * 60 },
    { label: 'Pausa Longa', time: 15 * 60 }
];

// 2. O método .map() é usado para transformar o array de dados
// em um array de elementos <button>.
<div className="d-flex justify-content-center mb-3">
    {timerOptions.map((option) => (
        <button
            key={option.label}
            onClick={() => resetTimer(option.time)}
            className="btn btn-primary rounded-pill mx-1"
        >
            {option.label}
        </button>
    ))}
</div>
```
---
