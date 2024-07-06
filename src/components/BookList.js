import {React,useState,useEffect} from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import ReturnBooks from './ReturnBook'

const BookList=(props)=>{

    useEffect(()=>{
        async function getData(){
          const res=await fetch('http://localhost:4000/book/get-returnbook',{
            method:'GET'
          })
          const data=await res.json()
          console.log(data.bookDetails)
          setData(data.bookDetails)
        }
        getData()
      },[])
const [returnData,setData]=useState([])
const returnBook=async(item)=>{

   await fetch('http://localhost:4000/book/return-book',{
    method:'POST',
    body:JSON.stringify(item),
    headers:{
        'Content-Type':'application/json'
    }
   })
    setData((prev)=>{
        return [...prev,item]
    })
}
 
    return(
        <>
        {props.bookData.map((item)=>
            <Col key={item.bookName} className='shadow-lg mb-2 '>
            <h2>Book Name:-  {item.bookName}</h2>
            <h2>Book Taken On:- {item.takenTime}</h2>
            <h2>Book Return Date:- {new Date().toLocaleString()}</h2>
            <h2>Current Fine:- 0</h2>
  
            <Button className='btn-success' onClick={returnBook.bind(null,item)} >Return Book</Button>
        </Col>
        )
      }
     {returnData && <ReturnBooks data={returnData}/>}
      </>

    )
}


export default BookList