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
      
        title:"my 2 admin2 posts"
       body:"this is admin2 my 2 p2"
        ){
          id
          title
          author{
            id
            username
            email
            displayName
            
          }
       }
      }

{
  posts{
    id
    title
    body
  }
}

{
  posts{
    id
    title
   author{
    email
  }
  }
}

{
  post(id:"61f49af7502ee6cc33b5ceb9"){
    author{
      displayName
    }
    title
    body
  }
}

  mutation{
  login(
    email:"cml@gmail.com",
    password:"admin"
  )
}
   */
