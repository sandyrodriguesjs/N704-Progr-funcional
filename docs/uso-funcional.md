
---

# Utilização de Inteligência Artificial (Chatbot)

Para a elaboração deste documento e para a refatoração do código-fonte, foi utilizado o auxílio do chatbot Gemini (Google AI). O processo de interação ocorreu da seguinte forma:

1.  **Análise Inicial:** O código-fonte original do componente `page.jsx` foi submetido ao chatbot com a pergunta sobre a viabilidade de aplicar os conceitos de programação funcional exigidos (função lambda, list comprehension, closure e função de alta ordem).

2.  **Primeira Resposta e Sugestão:** O chatbot confirmou que a implementação era viável, indicando que três dos quatro conceitos já estavam presentes de forma implícita no código. Além disso, sugeriu uma maneira de implementar o conceito ausente (list comprehension) de forma idiomática no contexto do React.

3.  **Solicitação de Refatoração e Documentação:** Foi solicitado ao chatbot que refatorasse uma função específica (`startTimer`) para tornar os conceitos mais explícitos e, em seguida, que documentasse detalhadamente cada alteração, explicando onde cada conceito foi aplicado no código final.

4.  **Refinamento da Documentação:** A documentação gerada foi refinada em etapas posteriores, solicitando a remoção das definições teóricas dos conceitos e, por fim, a formatação do conteúdo para o padrão Markdown.

O chatbot atuou como uma ferramenta de assistência para análise de código, sugestão de refatoração e geração de documentação técnica.

---

## Resposta Final do Chatbot (Utilizada no Documento)

A seguir, está reproduzida a resposta final consolidada e formatada que foi gerada pelo chatbot e utilizada como base para esta seção do documento.

---

# Documento de Requisitos: Utilização de Conceitos de Programação Funcional
**Projeto:** Componente Pomodoro - `page.jsx`

## Objetivo
Este documento detalha a implementação dos conceitos de Programação Funcional exigidos, indicando onde cada construção foi utilizada no código-fonte final.

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