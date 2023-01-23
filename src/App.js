import './App.css';
import SEM from './img/SEM.png'
import Comment from './comment.js'
import db from './fb.js'

function DbControl(){


}


function App() {
  const labList = []
  db.collection('equipment').get().then((ss)=>{
    ss.forEach((doc) => {
      labList.push(Object.assign(doc.data(), {id:doc.id}))
  })
  })
  console.log(labList)
//    db.collection('equipment').add({
//      lab: "화학준비실"

//    db.collection('equipment').doc(id).delete()


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
