$(document).ready(function(){
    const onSearchingProvinceByName = function(name = String()){
        fetch('/prv',{
            method: 'POST',
            credentials: 'same-origin',
            redirect: 'follow',
            agent: null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ZGF2Lm1l'
            },
            body: JSON.stringify({str: name.toString()})
        })
        .then(res => {
            // console.dir(res)
            const tabLi = [];
            const responses = JSON.parse(res.statusText)
            const state = responses.mes; state = parseInt(state);
            switch (state) {
                case 404:
                    alert(404);
                    $('#text-info').html(`Il n'y a aucune information sur le mot de recherche que vous venez d'entrer assayer avec un autre mot`);
                    break;
                case 405:
                    alert(405);
                    // itm.forEach(elem => {
                    //     const li = document.createElement('li');
                    //     const a = document.createElement('a');
                    //     $(a).attr({'href':`/province/${elem.Nom}`}).html(`${elem.Nom}`);
                    //     $(li).append(a).on('click', function(e){
                    //     })
                    //     tabLi.push(li);
                    // });
                    break;
                default:
                    break;
            }
   
            // console.log(responses.mes)
            // $('#dropdownprovinces').append(tabLi)
        })
        .catch(err => {
            console.log(err)
        })
    }
    fetch('/prvs',{
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        agent: null,
        headers: {
            'Content-Type': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ZGF2Lm1l',
        }
    })
    .then(res => {
        const tabLi = [];

        const responses = JSON.parse(res.statusText)
        const itm = responses.mes;
        itm.forEach(elem => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            $(a).attr({'href':'#'??`/province/${elem.Nom}`}).html(`${elem.Nom}`);
            $(li).append(a).on('click', function(e){
                onSearchingProvinceByName(elem.Nom.toString())
            })
            tabLi.push(li);
        });
        // console.log(responses.mes)
        $('#dropdownprovinces').append(tabLi)
    })
    .catch(err => {
        console.log(err)
    })

    $('[id=formprv]').on('submit', function(e){
        e.preventDefault();
        if($('.input-news-letter').val().length > 0){
            $('.input-news-letter').removeClass('border-danger')
            onSearchingProvinceByName($('.input-news-letter').val())
        }else{
            $('.input-news-letter').addClass('border-danger') 
        }
    })
    // $('#dropdownprovinces').html(null)
})
