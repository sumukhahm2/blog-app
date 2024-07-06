import {react,useRef,useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap'
import BookList from './BookList'

const BookForm=()=>{

  const bookRef=useRef()
  const [data,setData]=useState([])

  useEffect(()=>{
    async function getData(){
      const res=await fetch('http://localhost:4000/book/get-book',{
        method:'GET'
      })
      const data=await res.json()
      console.log(data.bookDetails)
      setData(data.bookDetails)
    }
    getData()
  },[])
  //console.log(data)
  const submittedBook=async(event)=>{
     event.preventDefault()

     console.log(new Date().toLocaleString())

     const bookData={
       bookName:bookRef.current.value,
       takenTime:new Date().toLocaleString(),
       returnTime:0
     }
     setData((prev)=>{
      return [...prev,bookData]
     })
      const res=await fetch('http://localhost:4000/book/add-book',{
        method:'POST',
        body:JSON.stringify(bookData),
        headers:{
          'Content-Type':'application/json'
        }
      })

      //const data=res.json()
     // console.log(data)
  }
    return(
    <div >
         <Form onSubmit={submittedBook} className='mb-2'>
      <Form.Group className="m-2" >
        <Form.Label>Book Name</Form.Label>
        <Form.Control type="text" placeholder='Enter The Book Name' ref={bookRef}/>
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    <BookList bookData={data}/>
    </div>
    )
}

export default BookForm