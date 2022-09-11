import React, { useState, useEffect } from "react";

const Info = () => {
  /*
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };
  */

  // 결국은 객체를 정의해야 하겠군.
  // ==> 그다음 각각의 값을 받아야 하겠고.
  // ==> setState 할 때, async 로 저장한 다음,
  // ==> 읽기 페이지로 가던지 하면 되겠네.
  const [info, setInfo] = useState({
    name: '',
    nickname: '',
  });

  const onChange = e => setInfo({
    ...info,
    [e.target.name]: e.target.value,
  });

  const {
    name,
    nickname,
  } = info;


  useEffect(() => {
    console.log('렌더링이 완료되었습니다!');
    console.log({
      name,
      nickname,
    });
    return () => {
      console.log('cleanup');
      console.log(name);
    }
  }, []);
  return (
    <div>
      <div>
        {/* <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} /> */}
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
        </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
}

export default Info;
