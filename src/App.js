import './App.css';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const [name,setName]=useState('Murat')

  const [description,setDescription]=useState('')
  
  const genders=[
    {key:'1',value:'Erkek'},
    {key:'2',value:'Kadın'}
  ]
  const [gender,setGender]=useState('2')
  const selectedGender=genders.find(g=>g.key===gender)

  const categorieList=[
    {key:1, value:'REACT'},
    {key:2, value:'JS'},
    {key:3, value:'HTML'},
    {key:4, value:'CSS'},
  ]
  const [categories,setCategories]=useState([2,4])
  const selectedCategories=categories && categorieList.filter(c=>categories.includes(c.key))

  const [rule,setRule]=useState(true)
  
  const [rules,setRules]=useState([
    {key:1, value:"1. Kuralı kabul ediyorum",checked:false},
    {key:2, value:"2. Kuralı kabul ediyorum",checked:true},
    {key:3, value:"3. Kuralı kabul ediyorum",checked:false}
  ])
  function checkRule(key,checked){
    setRules(rules=>rules.map(rule=>{
      if(key==rule.key){
        rule.checked=checked
      }
      return rule
    }))
  }
  const enabled=rules.every(rule=>rule.checked) // tüm kurallar kabul edildiğinde aktifleştirir


  const levels=[
    {key:'beginner', value:'Başlangıç'},
    {key:'jr_developer', value: ' Jr. Developer'},
    {key:'sr_developer',value:'Sr. Developer'}
  ]
  const [level,setLevel]=useState('jr_developer')
  const selectedLevel=levels.find(g=>g.key===level)


  const [avatar,setAvatar]=useState(false)
  const [img,setImg]=useState(false)

  useEffect(()=>{
    if(avatar){
      const fileReader=new FileReader()
    fileReader.addEventListener('load',function(){
      //console.log(this.result)
      setImg(this.result)
    })
    fileReader.readAsDataURL(avatar)
    }
  },[avatar])

  return (
    <div className="App">
      <button onClick={()=>(setName('Ahmet'))}>Adı Değiştir</button>
      <input type="text" value={name} onChange={e=>setName(e.target.value)}/><br/>
      {name}
      <br/>

      <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea><br/>
      {description}
      <br/>

      <select value={gender} onChange={e=>(setGender(e.target.value))}>
        <option value="">Seçin</option>
        {genders.map(gender=>(<option value={gender.key} key={gender.key}>{gender.value}</option>))}
      </select><br/>
      <pre>{JSON.stringify(selectedGender,null,2)}</pre>
      <br/>
      
      <button onClick={()=>setCategories([2,3,4])}> 2,3,4 seç</button>
      <select value={categories} multiple={true} onChange={e=>setCategories([...e.target.selectedOptions].map(option=>+option.value))}>
        {categorieList.map(category=>(<option value={category.key} key={category.key}>{category.value}</option>))}
      </select><br/>
      <pre>{JSON.stringify(selectedCategories,null,2)}</pre>
      <br/>

      <label>
        <input type="checkbox" checked={rule} onChange={e=>(setRule(e.target.checked))}/>
        Kuralları kabul ediyorum<br/>{rule+""}
      </label>
      <button disabled={!rule}>Kabul ediyorum</button>
      <br/>
      
      {
        rules.map(rule=>(
        <label key={rule.key}>
          <input type="checkbox" checked={rule.checked} onChange={e=>checkRule(rule.key,e.target.checked)}/>
          {rule.value}
          <br/>
        </label>
        
        ))
      }
      <pre>{JSON.stringify(rules,null,2)}</pre>
      <br/>
      {levels.map((l,index)=>(
      <label key={index}>
        <input type="radio" value={l.key} checked={l.key===level} onChange={e=>setLevel(e.target.value)}/>
        {l.value}
      </label>
      ))}
      <br/>
      <pre>{JSON.stringify(selectedLevel,null,2)}</pre> 
      <br/>
      <button disabled={!enabled}>Tüm kuralları kabul ediyorum</button> 

      <br/>
      <label>
        <input type='file' onChange={e=>setAvatar(e.target.files[0])}/>
      </label>

      {avatar && (
        <>
          <h3>{avatar.name}</h3>
          {img && <img src={img} alt=''/>}
        </>
        
      )}

    </div>
  );
}

export default App;
