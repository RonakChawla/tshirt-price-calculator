var products = {
    'white': {

        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg'
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg'
        }
    },

    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg'
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png'
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
// 1: above 1.000 units - 20% discount
// 2: above 500 units - 12% discount
// 3: above 100 units - 5% discount


// Solution:

$(document).ready(function() {
    const numInputs = document.querySelectorAll('input[type=number]');

    numInputs.forEach(function(input) {
        input.addEventListener('change', function(e) {
            if (e.target.value == '') {
                e.target.value = 0
            }
        })
    })

    function update_params() {
        search_params.quantity = parseInt($('#quantity').val());
        search_params.style = $('#style').val();
        search_params.color = $('#color .option-button.selected').attr('id');
        search_params.quality = $('#quality .option-button.selected').attr('id');
        update_order_details();
    }

    function update_order_details() {
        $('.refresh-loader').show().fadeOut(2000);

        $('#result-quality').html($(`#${search_params.quality}`).text());

        $('#result-style').html($(`#style option[value = ${search_params.style}`).text());

        $('#result-color').html($(`#${search_params.color}`).text());

        $('#result-quantity').html(search_params.quantity);

        $('#total-price').text(calculate_price());

        $('#photo-product').attr('src', `img/${products[search_params.color][search_params.style].photo}`);
    }

    function calculate_price() {
        var unitPrice = products[search_params.color][search_params.style].unit_price;

        if (search_params.quality === 'q190') {
            unitPrice = unitPrice + unitPrice * 0.12;
        }

        if (search_params.quantity < 100) {
            totalPrice = unitPrice * search_params.quantity;
        } else if (search_params.quantity >= 100 && search_params.quantity < 500) {
            totalPrice = unitPrice * search_params.quantity;
            totalPrice = totalPrice - totalPrice * 0.05;
        } else if (search_params.quantity >= 500 && search_params.quantity < 1000) {
            totalPrice = unitPrice * search_params.quantity;
            totalPrice = totalPrice - totalPrice * 0.12;
        } else if (search_params.quantity >= 1000) {
            totalPrice = unitPrice * search_params.quantity;
            totalPrice = totalPrice - totalPrice * 0.20;
        }

        return totalPrice.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
        });
    }

    update_params();

    $('#quantity').change(function() {
        search_params.quantity = parseInt(($('#quantity').val()));
        update_order_details();
    });

    $('#style').change(function() {
        search_params.style = $('#style').val();
        update_order_details();
    });

    $('.color-option').click(function() {
        $('.color-option').each(function() {
            this.classList.remove('selected');
        });

        this.classList.add('selected');

        search_params.color = $('#color .option-button.selected').attr('id');

        update_order_details();
    });

    $('.quality-option').click(function() {
        $('.quality-option').each(function() {
            this.classList.remove('selected');
        });

        this.classList.add('selected');

        search_params.quality = $('#quality .option-button.selected').attr('id');

        update_order_details();
    });
});