import { useId, useState } from 'react';
import { Agreement } from './Agreement';
import { InputAccount } from './InputAccount';

export const Form = () => {
  const [checked, setChecked] = useState(false);
  const headingId = useId();
  return (
    <form aria-labelledby={headingId}>
      {/* aria-labelledby は親子関係を問わず、
      「この要素の名前は“あの要素”に書いてあるよ」
      と“参照で名前付け”するための属性だよ */}
      <h2 id={headingId}>新規アカウント登録</h2>
      <InputAccount />
      <Agreement
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
        }}
      />
      <div>
        <button disabled={!checked}>サインアップ</button>
      </div>
    </form>
  );
};
