import './App.css';
import SEM from './img/SEM.png'
import Comment from './comment.js'
import db from './fb.js'
import { ref, set } from "firebase/database";

function DbControl(){


}


function App() {
  const labList = {
    1: {},
    2: {},
    3: {},
    4: {}
  }
  const reference = ref(db, 'users/')
  set(reference, labList);


  return (
    <div>
<p>안녕하세요</p>
<button className="ui primary button">
로그인
</button>
<img className='ui centered image' src={SEM} alt = ""></img>
<Comment></Comment>

    </div>
  );
}

export default App;
