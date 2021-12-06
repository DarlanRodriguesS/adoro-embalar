const urlLocalTunel = ' http://38bf-2804-d4b-9461-600-6075-5242-97f2-10bd.ngrok.io';
    const urlLocalHost = 'http://localhost:3000';

    function changeToManualState() {
      document.querySelector('body').classList.add('addOrderManual');
    }

    function changeToAutoState() {
      document.querySelector('body').classList.remove('addOrderManual');
      document.getElementById("addOrderButton").value = "";
    }

    function loadOrders() {
      fetch(`${urlLocalHost}/orders`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((resp) => resp.json())
        .then((data) => {
          document.querySelector('.order.last h2').innerHTML = `${data.at(-1).code}`;
          document.querySelector('.order.penultimate h2').innerHTML = `${data.at(-2).code}`;
          document.querySelector('.order.antepenultimate h2').innerHTML = `${data.at(-3).code}`;
        })

        .catch(function (error) {
          console.log(error);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
      loadOrders();
    });

    function createOrder() {
      fetch(`${urlLocalHost}/create-order`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: document.querySelector("input").value
          })
        })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) {
            alert(data.error)
          } else {
            document.querySelector('input').focus();
            document.querySelector('input').value = '';
            loadOrders();
          }

        })
        .catch(function (error) {
          console.log(error);
        });

      document.querySelector('body').classList.remove('addOrderManual');
    }

    document.querySelector('body').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        document.querySelector('input').click();
        createOrder()
      }
    });