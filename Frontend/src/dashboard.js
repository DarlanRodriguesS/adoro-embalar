const btn = document.querySelector("#bsearch")
          const ipt = document.querySelector('#isearch')
          // btn.addEventListener("click", function () {
          //   var codeOrder = document.querySelector('#isearch').value
          //   document.querySelectorAll('.orderCode').forEach((orderCode) => {
           
          //       if(orderCode.innerText != codeOrder) {
          //         orderCode.parentElement.style.display = 'none';
          //       }
               
          //   })
          // })
          ipt.addEventListener('input', function () {
            var codeOrder = ipt.value
            if (ipt.value.length > 0) {
              document.querySelectorAll('.orderCode').forEach((orderCode) => {
                var orderNumber = orderCode.textContent;
                var expressao = new RegExp(codeOrder, "i")
                if (!expressao.test(orderNumber)) {
                  orderCode.parentElement.classList.add('ocult');
                } else {
                  orderCode.parentElement.classList.remove('ocult')
                }
              })
            } else {
              document.querySelectorAll('.orderCode').forEach((orderCode) => {
                orderCode.parentElement.classList.remove('ocult')
              })
            }

          })

          var url = `http://localhost:3000/orders/`;

          fetch(url, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })

            .then((resp) => resp.json())
            .then((data) => {
              var dataReverse = data.reverse();

              document.querySelector('.orders .loading').remove();
              dataReverse.forEach(order => {
                document.querySelector('.reverse').innerHTML +=
                  `
            <div class="order">
                <div class='orderCode'>${order.code}</div>
                <div class='dateCode'>${order.date}</div>
            </div>
            `;

              });
            })
            .catch(function (error) {
              console.log(error);
            });