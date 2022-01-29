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
  posts{
    id
    title
   comments{
    comment
    user{
      displayName
    }
  }
  }
}

{
  posts{
   title
    author{
      displayName
    }
   comments{
    comment
    user{
      displayName
    }
  }
  }
}

mutation{
  addComment (postId:"61f49bb8640690396a16c7c0",comment:"second comment"){
    comment
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

mutation {
  createPost(title: "my 2 admin2 posts", body: "this is admin2 my 2 p2") {
    id
    title
    author {
      id
      username
      email
      displayName
    }
  }
}

mutation{
  updatePost(id:"61f49af7502ee6cc33b5ceb9",
  title:"act post",
    body:"post actualizado 2"
  ){
    title
    id
    body
  }
}

mutation{
  deletePost(postId:"61f49af7502ee6cc33b5ceb9")
}

   */
