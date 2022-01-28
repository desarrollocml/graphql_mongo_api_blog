/*
 mutation{
    register(
      username:"admin21"
      email:"cml21@gmail.com"
      displayName:"cml21"
      password:"admin21"
      
    )
  }

  mutation{
    createPost(
      
    title:"my first post2"
    body:"this is my first p2"
    )
  }
  
   mutation{
    createPost(
      
        title:"my 2 post"
       body:"this is my 2 p"
        ){
          id
          title
          body
          authorId
       }
      }

  mutation{
  login(
    email:"cml@gmail.com",
    password:"admin"
  )
}
   */
