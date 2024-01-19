/**
 * Does a call for the Rick and Morty series character api and return response to build a table with the basic data.
 *
 * @param form The form in which is called this function on click event.
 */
function apiCall( form ) {
    let apiUrl = 'https://rickandmortyapi.com/api/character/?',
        valName = form.name.value,
        valStatus = form.status.value,
        valType = form.type.value,
        valGender = form.gender.value;

    document.getElementById( 'result' ).innerHTML = '';

    if ( valName ) {
        apiUrl += 'name=' + valName;

        if ( valStatus )
            apiUrl += '&status=' + valStatus;
        if ( valType )
            apiUrl += '&type=' + valType;
        if ( valGender )
            apiUrl += '&gender=' + valGender;

        fetch( apiUrl )
            .then( ( response ) => response.json() )
            .then( ( result ) => {

                let resultDiv = document.getElementById('result'),
                    appendDiv = document.createElement('table');

                appendDiv.innerHTML += '<thead>' +
                    '<tr>' +
                    '<th>Name</th>' +
                    '<th>Status</th>' +
                    '<th>Species</th>' +
                    '<th>Gender</th>' +
                    '<th>Photo</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

                if (result.results) {
                    result.results.forEach(function (value, key) {
                        appendDiv.innerHTML += '<tr>' +
                            '<td class="rm-td-centered">' + value.name + '</td>' +
                            '<td class="rm-td-centered">' + value.status + '</td>' +
                            '<td class="rm-td-centered">' + value.species + '</td>' +
                            '<td class="rm-td-centered">' + value.gender + '</td>' +
                            '<td class="rm-td-centered"><img src="' + value.image + '" alt="' + value.id + '" style="width: 50px; height: 50px;"></td>' +
                            '</tr>';
                    })
                } else
                    appendDiv.innerHTML += '<tr><td colspan="5" style="text-align: center">' + result.error + ', no results for this search (' + valName + ').</td></tr>';

                appendDiv.innerHTML += '</tbody>';
                resultDiv.innerHTML += "<h3>Results:</h3>";

                resultDiv.appendChild(appendDiv);

            })
            .catch((error) => {
                console.log(error);
            });

    } else
        document.getElementById('result').innerHTML += "<h3>At least send Character's Name, dude.</h3>";

    event.preventDefault();
}