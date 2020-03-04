export default {
    user: {
        getUser: () => 
          fetch('http://127.0.0.1:8000/api/users/1')
          .then(res => res.json())
          .catch(e => {
              console.log(e);
          }),

        putUser: body => 
          fetch('http://127.0.0.1:8000/api/users/1/',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: body
          })
            .then(res =>res)
            .catch(e => {
                console.log(e);
            })
          
    }
}