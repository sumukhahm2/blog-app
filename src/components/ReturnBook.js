import React from 'react'


const ReturnBooks=(props)=>{

    return(
        <>
        
          <h1>Returned Books</h1>
          {props.data.map(item=>
            <div className='m-2'>
            <h4>Book Name:- {item.bookName}</h4>
            <h4>Fine:- {item.fine}</h4>
            <h4>Returned On:- {item.returnTime}</h4>
        </div>)}
          
        </>
    )
}

export default ReturnBooks