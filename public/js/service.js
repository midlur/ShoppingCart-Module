import createHTMLElement from './view';

export function Createitem(){

    const iDiv = document.getElementById('table-body');
    const iDivh = document.getElementById('table-head');
    let html = ``;
    const url = `http://localhost:3000/cart`;
    
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
        iDiv.innerHTML = ``;
        let header = `
        <tr>
              <th scope="col">${data.length} items</th>
              <th scope="col"></th>
              <th scope="col">size</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
            </tr>
        `;
        iDivh.appendChild(createHTMLElement(header));
        data.map((img)=>{
            html = `
    <tr>
        <td class="image-data">
            <img src=${img.Imgurl} alt="Tee 1" />
        </td>
        <td class="description-data" style="padding-top: 40px;">
            <span>${img.id}</span> <br />
            <span>${img.Style}</span> <br />
            <span>${img.Color}</span><br />
            <span><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    Edit
            </button></span>
                <span
                  ><button type="button" class="btn btn-danger">
                    Remove
                  </button></span>
                <span
                  ><button type="button" class="btn btn-warning">
                    Save For Later
                  </button></span>
              </td>

              <td>${img.Size}</td>
              <td>${img.Qty}</td>
              <td>${img.Price*img.Qty}</td>
    </tr>`;
    let trElement = createHTMLElement(html);
    trElement
    .firstElementChild.nextElementSibling.lastElementChild
    .previousElementSibling.firstElementChild.onclick = function() {
        delFromDB(img.id);
        window.reload();
    }
    trElement
    .firstElementChild.nextElementSibling.lastElementChild
    .previousElementSibling.previousElementSibling.firstElementChild.onclick = function() {
        DynamicModalofDisplay(img.id);
        
    }
    iDiv.appendChild(trElement);
        })
    })  
}
 
    export function delFromDB(num) {
        console.log(num);
        let action = {
            method: "DELETE"
        }
        let url = `http://localhost:3000/cart/${num}`;
        fetch(url, action)
            .then((resp) => resp.json()) // Transform the data into json
            .then(data => {
                //do nothing
                window.location.reload();
            })
            .catch(e => console.log(`ERROR:: ${e}`));
            
    }

    export function Edit(num,size,qty) {

    const url1 = `http://localhost:3000/cart/${num}`;
    fetch(url1)
    .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            let listData = {
                "Size" : size,
                "Qty" : qty
            }
            let obj = Object.assign({},data,listData);

            // Updating in db

            const url3 = `http://localhost:3000/cart/${num}`;
            const fetchData = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(obj), // body data type must match "Content-Type" header
  };

  fetch(url3, fetchData);
  window.location.reload();
        })
        
    }

    export function Add(num,size,qty,price,imgurl,style,color) {
            let listData = {
                "id": num,
                "Imgurl": imgurl,
                "Size": size,
                "Qty": qty,
                "Style": style,
                "Color": color,
                "Price": price
            }
            //let obj = Object.assign({},data,listData);

            const url2 = 'http://localhost:3000/cart';
    const fetchData = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(listData), // body data type must match "Content-Type" header
  };

  fetch(url2, fetchData);
  window.location.reload();
   
}

    export function updateSubtotal() {
        const iDiv = document.getElementById('second-div');
        const url1 = `http://localhost:3000/cart`;
        const url2 = `http://localhost:3000/promotions`;
        let htmllayout = ``;
        
    
    fetch(url1)
    .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            let subtotal = 0;
            let html = ``;
            let promotiontobeappliedname = `NO`;
            let promotiontobeappliedprice = `0`;
            data.map((img)=>{
                let price = parseInt(img.Price)*img.Qty;
                subtotal += price; 
})


html = `<div class="col-8">
         <div class="row">
                    <div class="col-6">
                            Enter promotion code or Gift Card
                    </div>
                        <div class="col-3-right">
                                <input type="text" class="form-control" id="usr" />
                        </div>
                        
                        <div class="col-3-right">
                                <button type="button" class="btn btn-primary">Apply</button>
                        </div>
                </div>
                <hr class="headertag2" /> <br>
        <div class="row">
                    <div class="col-9">
                        Subtotal
                    </div>
                    <div class="col-2">
                        ${subtotal}
                    </div>
                </div> <br>
                <div class="row">
                        <div class="col-9" id="promocode" >
                        ${promotiontobeappliedname} Promotion Code Applied
                        </div>
                        <div class="col-2" id="promoprice">
                            -${promotiontobeappliedprice}
                        </div>
                </div>
                <br>
                <hr class="thinheader" /> 
                <br>
                <div class="row">
                        <div class="col-9">
                           Estimated Total
                        </div>
                        <div class="col-2" id="estimated">
                            ${subtotal-promotiontobeappliedprice}
                        </div>
                </div>
                <hr class="headertag2" /> <br>
                <div class="row">
                        <div class="col-8">
                           
                        </div>
                        <div class="col-3">
                                <button type="button" style="font-size: 20px" class="btn btn-primary">Checkout</button>
                        </div>
                </div>
            </div>
        `;

         htmllayout = createHTMLElement(html);
         
         htmllayout
        .firstElementChild.firstElementChild.nextElementSibling
        .nextElementSibling.firstElementChild.onclick = () => {
            fetch(url2)
            .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            console.log(data);
            let promotionsdata = htmllayout
            .firstElementChild.firstElementChild.nextElementSibling.firstElementChild.value;
            data.map((img)=>{
                if(img.name == promotionsdata){
                    console.log("if goes");
                    console.log(img.name);
                    document.getElementById('promocode').innerHTML = `${img.name} Promotion Code Applied`;
                    document.getElementById('promoprice').innerHTML  = `-${img.price}`;
                    document.getElementById('estimated').innerHTML  = `${subtotal-img.price}`;
                }
            })
            
        })


       }
       console.log("hello");
       console.log(promotiontobeappliedprice);
       iDiv.appendChild(htmllayout);
    
    })
    
     
} 

export function DynamicModalofCarrousel(num) {
    const iDiv = document.getElementById('myModal');
        
        
    const url1 = `http://localhost:3000/inventory/${num}`;
fetch(url1)
.then((resp) => resp.json()) // Transform the data into json
    .then(data => {
        console.log(data.Imgurl);
let html = `
      <div class="modal-dialog modal-dialog-centered">
        <!-- Modal content -->
        <div class="modal-content">
          <div class="modal-header"> 
          <h2>Product Details</h2>
            <button style="float: right;" type="button" class="close" data-dismiss="modal">&times;</button>
         
           </div>
          <div class="modal-body">
            <table class="table-modal">
              <tbody>
                <tr>
                  <td>
                    <span class ="title" style="padding-top: 20px">${data.id}</span>
                    <span class="modalprice">${data.Price}</span><br>

                        <form style="display: inline-block;font-size: 25px;" >
                                <select name="Size" value="Size" id="Size">
                                <option value="" selected disabled hidden>Size</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XXL">XXL</option>
                                </select>
                        </form>
                   
                        <form style="display: inline-block;font-size: 25px;" >
                                <select name="Qty" id = "Qty">
                                <option value="" selected disabled hidden>Qty</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                </select>
                              </form>
                   <br> <br>
                    
                          <button type="button" style="font-size: 20px;" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                Add TO Bag
                             </button>
                  </td>
                  <td>
                    <img src=${data.Imgurl} alt="Tee 1" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              id = "close-modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>`;

    
        let modal = createHTMLElement(html);

        modal.firstElementChild.lastElementChild.firstElementChild.onclick = () => {
            modal.style.display = "none";
            window.location.reload();
        }
        modal
        .firstElementChild.firstElementChild.nextElementSibling
        .firstElementChild.firstElementChild.firstElementChild.lastElementChild.previousElementSibling
        .lastElementChild.onclick = () => {
            Add(data.id,
                document.getElementById('Size').value,
                document.getElementById('Qty').value,data.Price,data.Imgurl,data.Style,data.Color);
        }
        
    iDiv.appendChild(modal);

    });


}

    export function DynamicModalofDisplay(num) {
        console.log(num)

        const iDiv = document.getElementById('myModal');
        
        
        const url1 = `http://localhost:3000/cart/${num}`;
    fetch(url1)
    .then((resp) => resp.json()) // Transform the data into json
        .then(data => {
            
            console.log(data.Imgurl);
    let html = `
          <div class="modal-dialog modal-dialog-centered">
            <!-- Modal content -->
            <div class="modal-content">
              <div class="modal-header"> 
              <h2>Product Details</h2>
                <button style="float: right;" type="button" class="close" data-dismiss="modal">&times;</button>
             
               </div>
              <div class="modal-body">
                <table class="table-modal">
                  <tbody>
                    <tr>
                      <td>
                        <span class ="title" style="padding-top: 20px">${data.id}</span>
                        <span class="modalprice">${data.Price}</span><br>

                            <form style="display: inline-block;font-size: 25px;" >
                                    <select name="Size" value="Size" id="Size">
                                    <option value="" selected disabled hidden>Size</option>
                                      <option value="S">S</option>
                                      <option value="M">M</option>
                                      <option value="L">L</option>
                                      <option value="XXL">XXL</option>
                                    </select>
                            </form>
                       
                            <form style="display: inline-block;font-size: 25px;" >
                                    <select name="Qty" id = "Qty">
                                    <option value="" selected disabled hidden>Qty</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </form>
                       <br> <br>
                        
                              <button type="button" style="font-size: 20px;" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                    Edit
                                 </button>
                      </td>
                      <td>
                        <img src=${data.Imgurl} alt="Tee 1" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  id = "close-modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>`;

            let modal = createHTMLElement(html);
            modal.firstElementChild.lastElementChild.firstElementChild.onclick = () => {
                modal.style.display = "none";
                window.location.reload();
            }
            modal
            .firstElementChild.firstElementChild.nextElementSibling
            .firstElementChild.firstElementChild.firstElementChild.lastElementChild.previousElementSibling
            .lastElementChild.onclick = () => {
                console.log("medha");
                console.log(document.getElementById('Size').value);
                Edit(data.id,
                    document.getElementById('Size').value,
                    document.getElementById('Qty').value);
            }
        iDiv.innerHTML="";
        iDiv.appendChild(modal);

        });

        

    }

    export function DynamicCarousel() {
        const iDiv = document.getElementById(`body-right-container`);
        const url1 = `http://localhost:3000/inventory`;

        fetch(url1)
.then((resp) => resp.json()) // Transform the data into json
    .then(data => {

        let html =
            `
        <!--Indicators-->
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="../public/assets/tee3.jpeg" style="width: 100%;" alt="...">
            <div class="carousel-caption d-none d-md-block">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        View Details
                </button>
            </div>
    </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>`;

      

      let htmllayout = createHTMLElement(html);
      htmllayout.firstElementChild.firstElementChild.lastElementChild.onclick = () => {
        DynamicModalofCarrousel("Black Coloured Shirt");

      }

      data.map((img)=>{
            //console.log(element);

            let carouselDiv = `
                            <div class="carousel-item">
                                <img src=${img.Imgurl} style="width: 100%;" alt="...">
                                    <div class="carousel-caption d-none d-md-block">
                                        <button type="button class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                View Details
                                        </button>
                                    </div>
                            </div>
        `;

        let carouselDivlayout = createHTMLElement(carouselDiv); 
        carouselDivlayout.lastElementChild.firstElementChild.onclick = () => {
            DynamicModalofCarrousel(img.id);
        }
            htmllayout.firstElementChild.appendChild(carouselDivlayout);
            
        })
        iDiv.appendChild(htmllayout);
        console.log(htmllayout);
        
    })     

    }

    
 