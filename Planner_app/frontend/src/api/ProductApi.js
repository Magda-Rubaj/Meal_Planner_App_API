export default {
    products: {
        getProducts: () => 
          fetch('http://127.0.0.1:8000/api/products')
          .then(res => res.json())
          .catch(e => {
              console.log(e);
          }),

        postProduct: added => 
          fetch('http://127.0.0.1:8000/api/products/',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: added
          })
            .then(res =>res)
            .catch(e => {
                console.log(e);
            })
          
    }
}