import '../App.css';
import Header from "../header"
import Footer from '../footer';
import { useParams } from "react-router-dom"
import React, {useState, useEffect} from 'react';
import { OptionButton } from '../components/App';
import fb from "../fb.js"
import { getDatabase, ref, get, child } from "firebase/database";

const dbRef = ref(getDatabase());

function list_to_str(arr){
    let str = ""

}

function Get_lab_data(floor, labName){
    let [List, SetList] = useState([]);
    get(child(dbRef, `equipment/${floor}/${labName}/detail`)).then((snapshot) => {
        if (snapshot.exists()) {
          List = SetList(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    return List;
}

//absolute -> 퍼센트로 위치 지정
function MapContainer(props){
    //wrap, wrap-reverse:줄넘어감   row, column:가로배치, 세로배치
    const style = {
        width: props.width,
        height: props.height,
        left: props.xpos,
        top: props.ypos,
        flexDirection: props.direction,
        flexWrap:props.wrap
    }
    return <div id="mapcontainer" style={style}>
        {props.children}
    </div>
}

//MapContainer에 대해 퍼센트로
function MapFactor(props){
    const style = {
        width: `calc(${props.width} * 100%)`,
        height: `calc(${props.height}* 100%)`,
    }
    
    return <section id="mapfactor" className='mapFactor closet' style={style}>
        <p id='closetNum'>{props.closetNum}</p>
        <p id='closetContent'>{props.closetContent}</p>
    </section>
}

//relative
function LabMap(props){
    
    let labInfo = Get_lab_data(props.floor, props.labname)

    if (labInfo.length == 0){
        return <section id='labmap'></section>
    }
    else{
        let closet_arr = labInfo['closet_container'];

        let closet_container;
        let closet_container_data = [];
    
        let closetNumber = 1;
        for (let i = 1; i < closet_arr.length; i++){
            closet_container = closet_arr[1];
    
            for (let j = 0; j < closet_container['data'].length; j++){
                closet_container['data'][j]['data']['closetNum'] = closetNumber;
                closetNumber++;
            }
            if (closet_container != null){
                closet_container_data[i] = closet_container['data'].map((closet, idx) => {
                    if (closet != null){
                        
                        return <MapFactor width={closet['option']['width']} height={closet['option']['height']} closetNum={closet['data']['closetNum']} closetContent={closet['data'].toString().replace(/,/g, '\n')} ></MapFactor>
                    }
                })
                }
                
        }
    
        return <section id="labmap">
            {labInfo['closet_container'].map(function(closet_container, idx){
                if (closet_container != null){
                    return (<MapContainer xpos={closet_container['option']['xpos']} ypos={closet_container['option']['ypos']} width={closet_container['option']['width']} height={closet_container['option']['height']} direction={closet_container['option']['direction']} wrap={closet_container['option']['wrap']}>
                        {closet_container_data[idx]}
                    </MapContainer>)
                }
            })}
        </section>
    }
    
}

function LabContent(){
    const { labName, floor } = useParams()
    return <div id="inlab">
        <section id="labname">
            <p>{labName}</p>
            <OptionButton text = "메인으로" button_id='labToMainButton' background_color='white' width='5.5em' height='2em' fontsize ='17px'></OptionButton>
        </section>
        <LabMap labname={labName} floor={floor}></LabMap>
    </div>
}

function Lab(){
    return <div id="r">
    <Header mode='lab'></Header>
    <LabContent />
    <Footer></Footer>
  </div>
}

export default Lab