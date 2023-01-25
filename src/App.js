import './App.css';
import React, {useState, useEffect} from 'react';
import Lab from './lab.js'
import Explain from './explain.js'
import SchoolMap from './schoolmap.js'
import Search from './search.js'

import Comment from './comment.js'
import {db, storage} from './fb.js'
import { ref, set, get, child } from "firebase/database";
import { getDownloadURL, ref as sref } from "firebase/storage"



function Context(props) {
  // main page
  if (props.mode === "map"){
    return <SchoolMap></SchoolMap>
  }
  
  // map에서 검색버튼 누르면 search로 넘어감
  if (props.mode === "search"){
    return <Search></Search>
  }

  // lab 또는 search에서 기자재 선택 시 explain으로 넘어감
  if (props.mode === "explain"){
    return <Explain></Explain>
  }

  // map에서 실험실 누르면 lab으로 넘어감
  if (props.mode === "lab"){
    return <Lab></Lab>
  }
}

function Header(props) {
  return <div>

  </div>
}

function Footer(props) {
  return <div>

  </div>
}

function App() {
  // rtdb 업로드
  /*const labList = {
    1: {3:'hu'},
    2: {4:'jj'},
    3: {5:222},
    4: {1:'77'}
  }
  const reference = ref(db, 'equipment/1')
  set(reference, labList);*/

  // rtdb 불러오기
  /*const reference = ref(db)
  let list = {}
  get(child(reference, '/')).then((snapshot) => {
    if (snapshot.exists()) {
      list['equipment'] = snapshot.val()['equipment']
    } else {
      console.log("No data available");
    }
  })
  console.log(list)*/

  // storage 이미지 불러오기
  /*const dbRef = ref(db)
  const [imgLink, setImgLink] = useState(null)
  get(child(dbRef, '/equipment/1/공공기기 실험실/comment')).then((snapshot) => {
    if (snapshot.exists()){
      const Pos = snapshot.val()
      const imgPos = sref(storage, Pos)
      const url = getDownloadURL(imgPos)
      url.then((result)=>{
        setImgLink(result)
      })
    }
  })*/
  const [mode, setMode] = useState("map")

  return (
    <div>
      <Header mode={mode}></Header>
      <Context mode={mode}></Context>
      <Footer mode={mode}></Footer>
    </div>
  );
}

export default App;
