import { useState } from 'react';

const ops = [
  { value: '+', label: '+', title: 'Сложение' },
  { value: '-', label: '−', title: 'Вычитание' },
  { value: '*', label: '×', title: 'Умножение' },
  { value: '/', label: '÷', title: 'Деление' },
  { value: '^', label: 'xʸ', title: 'Возведение в степень' },
];

function unfinished(str: string) {
  return /^[-+]?[.,]?$/.test(str.trim());
}

function getResult(a: string, b: string, op: string) {
  if (unfinished(a) || unfinished(b)) {
    return { text: '', error: '' };
  }

  const x = Number(a.replace(',', '.'));
  const y = Number(b.replace(',', '.'));

  if (isNaN(x) || isNaN(y)) {
    return { text: '', error: 'Введите числа' };
  }

  if (op === '/' && y === 0) {
    return { text: '', error: 'На ноль делить нельзя' };
  }

  let res = 0;
  if (op === '+') res = x + y;
  if (op === '-') res = x - y;
  if (op === '*') res = x * y;
  if (op === '/') res = x / y;
  if (op === '^') res = Math.pow(x, y);

  if (!isFinite(res)) {
    return { text: '', error: 'Результат не получается посчитать' };
  }

  res = parseFloat(res.toFixed(10));

  return { text: String(res), error: '' };
}

export function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [op, setOp] = useState('+');

  const { text, error } = getResult(a, b, op);
  const sign = ops.find((o) => o.value === op)!.label;

  function reset() {
    setA('');
    setB('');
    setOp('+');
  }

  return (
    <div className="calc">
      <h1>Калькулятор</h1>

      <label>
        Первое число
        <input
          type="text"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="например, 5"
        />
      </label>

      <div className="ops">
        {ops.map((o) => (
          <button
            key={o.value}
            title={o.title}
            className={op === o.value ? 'active' : ''}
            onClick={() => setOp(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      <label>
        Второе число
        <input
          type="text"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="например, 3"
        />
      </label>

      <button className="reset" onClick={reset}>
        Сбросить
      </button>

      {error && <p className="error">{error}</p>}
      {text && (
        <p className="result">
          {a} {sign} {b} = <b>{text}</b>
        </p>
      )}
    </div>
  );
}
