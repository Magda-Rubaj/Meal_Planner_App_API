export default {
    products: {
        getProducts: () => 
          fetch('http://127.0.0.1:8000/api/products',{
            method: 'get',
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access_token'),
                'Content-Type':'application/json',
            },
          })
          .then(res => res.json())
          .catch(e => {
              console.log(e);
          }),

        postProduct: added => 
          fetch('http://127.0.0.1:8000/api/products/',{
            method: 'post',
            headers: {
              'Authorization': "JWT " + localStorage.getItem('access_token'),
              'Content-Type':'application/json'
            },
            body: added
          })
            .then(res =>res)
            .catch(e => {
                console.log(e);
            })
          
    }
}