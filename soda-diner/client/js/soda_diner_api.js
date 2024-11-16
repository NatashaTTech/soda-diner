$(() => {
    // click brand name logo to return to home screen
    $('.home-btn').click(function () {
        $('.landing').show();
        $('.diners').hide();
        $('.sodas').hide();
    }); // end click home logo

    // all cancel buttons inside popups
    $('.cancel-btn').click(function () {
        event.preventDefault();
        $(this).parents('.border').fadeOut('fast') // close popup window
    }); // end cancel button

///////////////// - DINERS - ///////////////// 
    // all diners button
    $('.diners-btn').click(function () {
        $('.landing').hide();
        $('.sodas').hide();
        $('.diners').show();
        getDiners(); // populate diner list from db
    }); // end click diners button

    // add new diner button
    $('.add-diner-btn').click(function () {
        getSodaOptions(); // populate soda options select menu
        $('.add-diner-popup').fadeIn('fast') // show new diner popup
    }) // end click add diner button

    // submit add new diner form
    $('.add-diner-form').submit(function () {
        event.preventDefault();
        newDiner(); // post new diner to db
        getDiners(); // refresh diner list
    }); // end submit new diner

    // submit edit diner form
    $('.edit-diner-form').submit(function () {
        event.preventDefault();
        editDiner(editThisDiner); // put edited diner in db
        getDiners(); // refresh diner list
        $(this).parents('.border').fadeOut('fast'); // close popup window
        showDbAction('.edited', 40) // show update success popup
    }); // end submit diner edit

    // diner item to append to diner list
    const dinerItem = (diner) => {
        return `<div class="accordion bg-dark my-2 pb-2 pt-3 rounded">
                <div class="text-light h2 fw-light pb-2">${diner.name} &nbsp;<i class="fa fa-caret-right"></i>
                </div>
                <div class="content pb-1">
                    <div class="h4 fw-light"><span class="highlightInfo">Location: &nbsp;</span>${diner.location}</div>
                    <div class="h4 fw-light"><span class="highlightInfo">Sodas Served: </span>${diner.sodas}</div>
                    <div class="d-flex justify-content-center pt-3 pb-2">
                        <div class="edit-diner-btn ui button inverted small orange basic mt-2" id="${diner._id}">Edit Diner</div>
                        <div class="delete-diner-btn ui button inverted small red basic mt-2" id="${diner._id}">Delete Diner</div>
                    </div>
                </div>
            </div>`
    } // end diner item

    let editThisDiner; // to store id of diner about to be edited

    // ajax get method to retrieve and display diners from db and create related items
    function getDiners() {
        $.ajax({
            type: 'GET',
            url: '/api/diners',
            success: function (result) {
                $('.diner-list').empty(); // empty diner list
                result.forEach(function (diner) {
                    $('.diner-list').append(dinerItem(diner)) // populate diner list
                }); // end forEach
                // initialize accordions
                $('.accordion').accordion({
                    active: false,
                    collapsible: true,
                    header: '.h2'
                });
                // opening accordion highlights name
                $('.accordion>.h2').click(function () {
                    $(this).toggleClass('highlightName');
                    $(this).children('i').toggleClass('fa-caret-right fa-caret-down')
                });
                // delete button
                $('.delete-diner-btn').click(function () {
                    const dinerId = $(this).attr('id'); // grabs selected diner id
                    deleteDiner(dinerId); // delete diner from db
                    getDiners(); // refresh diner list
                }); // end delete button

                getSodasForDiner(); // retrieves sodas from db for use in diner editing popup

                // edit diner button
                $('.edit-diner-btn').click(function () {
                    editThisDiner = $(this).attr('id'); // globally saves id of selected diner to pass to PUT method

                    const thisDinerName = $(this).parents('.accordion').children('.ui-accordion-header').text().trim(); // grabs name of selected diner
                    $('#editName').val(thisDinerName); // inserts diner name into editName input field
                    
                    let thisDinerLocation = $(this).parents('.accordion').find('.h4:first-of-type'); // grabs location of selected diner
                    thisDinerLocation = $(thisDinerLocation).text().trim().slice(11) // removes "Location: " from location string
                    $('#editLocation').val(thisDinerLocation) // inserts diner location into editLocation input field

                    let currentSodas = $(this).parents('.accordion').find('.h4:nth-of-type(2)'); // grabs list of sodas currently being served at selected diner
                    currentSodas = $(currentSodas).text().trim().slice(15).split(','); // removes "Sodas Served: " from sodas served string and splits list of sodas into array 

                    $('input').prop('checked', false); // reset checkboxes

                    // adjusts the soda names (removes spaces and/or periods) within currentSodas array to be able to match the sodaClass classes in checkbox inputs
                    for (let i = 0; i < currentSodas.length; i++) {
                        if (currentSodas[i].split('. ').length >= 2) {
                            currentSodas[i] = currentSodas[i].split('. ').join('');
                        }
                        let thisSoda = currentSodas[i].split(' ').join('').trim();
                        $(`.${thisSoda}`).prop('checked', true); // if a soda is already being served at selected diner, find it by its sodaClass name, and pre-check its checkbox
                    }
                    $('.edit-diner-popup').fadeIn('fast'); // show the edit diner popup we just populated with info specific to the selected diner
                }); // end edit diner button
            }, // end success
            error: function (e) {
                console.log(`error: ${e}`)
            } // end error
        }) // end ajax
    } // end get diners

    // ajax post method to save new diner
    function newDiner() {
        // grab user-defined diner
        const newDinerData = {
            name: $('#dinerName').val().trim(),
            location: $('#location').val().trim(),
            sodas: $('#soda-options').val()
        } // end newDinerData
        $.ajax({
            type: 'POST',
            url: '/api/diners',
            contentType: "application/json",
            data: JSON.stringify(newDinerData), // send data to db
            dataType: 'json',
            success: function (newDiner) {
                console.log(`New Diner: ${newDiner}`)
                $('.add-diner-popup>form>input').val(''); // reset form values
                showDbAction('.added', 40); // show added to database popup
                $('.add-diner-popup').fadeOut('fast');
            }, // end success
            error: function (err) {
                console.log(`error... ${err}`);
                showDbAction('.not-added', 70) // show not added to database popup
                $('.add-diner-popup>form>input').val(''); // reset form values
            } // end error
        }) // end ajax
    } // end post new diner                                                                                                                                             
    // ajax get method to list available sodas in select dropdown inside new diner form
    function getSodaOptions() {
        $.ajax({
            type: 'GET',
            url: '/api/sodas',
            success: function (result) {
                console.log(result)
                $('#soda-options').empty(); // empty soda options select menu
                // display sodas as options in select menu
                result.forEach(function (soda) {
                    $('#soda-options').append(`<option value="${soda.name}">${soda.name}</option>`) // populate soda options in select menu
                })
            }, // end success
            error: function (e) {
                console.log(`error: ${e}`)
            } // end error
        }) // end ajax
    } // end get soda options

    // ajax delete method to delete diner from db
    function deleteDiner(dinerId) {
        $.ajax({
            type: "DELETE",
            url: `/api/diners/${dinerId}`,
            success: (deletedDiner) => {
                console.log(`Deleted diner: ${deletedDiner}`)
                showDbAction('.deleted', 40) // show deleted from database popup
            } // end success
        }) // end ajax
    } // end delete diner

    // ajax get method to retrieve and display sodas for editing diner menu
    function getSodasForDiner() {
        $.ajax({
            type: 'GET',
            url: '/api/sodas',
            success: function (result) {
                console.log(result)
                $('#choose-soda-list').empty(); // empty soda options select menu
                // display sodas as options in select menu
                result.forEach(function (soda) {
                    let sodaClass = soda.name.split('. ').join('').trim(); // removes any spaces or periods from soda names...
                    sodaClass = sodaClass.split(' ').join('').trim(); // ...to create valid class names
                    // populate soda options in select menu
                    $('#choose-soda-list').append(`
                        <div class="diner-menu-row col-6 py-1">
                            <label for="${soda.name}" class="col-9 h4 fw-light text-end">${soda.name} &nbsp;</label>
                            <input class="pl-4 ${sodaClass}" type="checkbox" value="${soda.name}">
                        </div>`)
                }) // end for each
                $('.diner-menu-row:odd>label').removeClass('col-9').addClass('col-6'); // adjusts two column layout properly
                // this adds a blank col-6 to keep proper layout if there's an odd number of sodas
                if ($('.diner-menu-row').length % 2 != 0) {
                    $('#choose-soda-list').append(`<div class="col-6 py-1"> </div>`)
                }
            }, // end success
            error: function (e) {
                console.log(`error: ${e}`)
            } // end error
        }) // end ajax
    } // end get sodas for diner

    // ajax put method to update edited diner object in db
    function editDiner(dinerId) {
        // grab form results
        const dinerName = $('#editName').val().trim();
        const dinerLocation = $('#editLocation').val().trim();
        const checkedSodas = [];
        $('input:checked').each(function () {
            let soda = $(this).val();
            checkedSodas.push(` ${soda}`)
        })
        // new updated diner object
        const updatedDinerData = {
            name: `${dinerName}`,
            location: `${dinerLocation}`,
            sodas: `${checkedSodas}`
        }
        $.ajax({
            type: "PUT",
            url: `/api/diners/${dinerId}`,
            contentType: "application/json",
            data: JSON.stringify(updatedDinerData), // send data to db
            dataType: 'json',
            success: (updatedDiner) => {
                console.log(`Updated Diner: ${updatedDiner}`)
            },
            error: function (e) {
                console.log(`error: ${e}`)
            } // end error
        }); // end ajax
    } // end edit diner

///////////////// - SODAS - /////////////////
    // all sodas button
    $('.sodas-btn').click(function () {
        $('.landing').hide();
        $('.diners').hide();
        $('.sodas').show();
        getSodas(); // populate soda list
    }); // end click sodas button

    // add soda button
    $('.add-soda-btn').click(function () {
        $('.add-soda-popup').fadeIn('fast');
    }) // end click add sodas button

    // add new soda button
    $('.add-soda-form').submit(function () {
        event.preventDefault();
        newSoda(); // post new soda
        getSodas(); // refresh soda list   
    }); // end submit new soda

    // soda item to append to soda list
    const sodaItem = (soda) => {
        return `<div class="accordion bg-dark my-2 pb-2 pt-3 rounded">
                    <div class="text-light h2 fw-light pb-1">${soda.name} &nbsp;<i class="fa fa-caret-right"></i>
                </div>
                <div class="content pb-1">
                    <div class="h4 fw-light">Fizziness: <span class="highlightInfo">${soda.fizziness}</span></div>
                    <div class="h4 fw-light">Taste Rating: <span class="highlightInfo">${soda.tasteRating}</span></div>
                    <div class="delete-soda-btn ui inverted red basic button small mx-auto mt-3 mb-2" id="${soda._id}">Delete Soda</div>
                </div>
            </div>`
    } // end soda item 

    // ajax get method to retrieve and display sodas from db
    function getSodas() {
        $.ajax({
            type: 'GET',
            url: '/api/sodas',
            success: function (result) {
                console.log(result)
                $('.soda-list').empty(); // empty soda list
                result.forEach(function (soda) {
                    $('.soda-list').append(sodaItem(soda)) // populate soda list
                });
                // initialize delete button
                $('.delete-soda-btn').click(function () {
                    const sodaId = $(this).attr('id');
                    deleteSoda(sodaId); // delete soda from db
                    getSodas(); // refresh soda list
                });
                // initialize accordions
                $('.accordion').accordion({
                    active: false,
                    collapsible: true,
                    header: '.h2'
                });
                // opening accordion highlights name
                $('.accordion>.h2').click(function () {
                    $(this).toggleClass('highlightName');
                    $(this).children('i').toggleClass('fa-caret-right fa-caret-down')
                })
            }, // end success
            error: function (e) {
                console.log(`error: ${e}`)
            } // end error
        }) // end ajax
    } // end get sodas

    // ajax post method to save new soda
    function newSoda() {
        // grab user-defined soda
        const newSodaData = {
            name: ' ' + $('#sodaName').val(),
            fizziness: $('#fizziness').val(),
            tasteRating: $('#tasteRating').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/sodas',
            contentType: "application/json",
            data: JSON.stringify(newSodaData), // send data to db
            dataType: 'json',
            success: function (newSoda) {
                console.log(newSoda)
                $('.add-soda-popup>form>input').val(''); // reset form values
                showDbAction('.added', 40); // show added to database popup
                $('.add-soda-popup').fadeOut('fast');
            }, // end success
            error: function (err) {
                console.log(`error... ${err}`);
                showDbAction('.not-added', 70) // show not added to database popup
                $('.add-soda-popup>form>input').val(''); // reset form values
            } // end error
        }) // end ajax
    } // end post new soda

    // ajax delete method to delete soda from db
    function deleteSoda(sodaId) {
        $.ajax({
            type: "DELETE",
            url: `/api/sodas/${sodaId}`,
            success: (deletedSoda) => {
                console.log(`Deleted soda: ${deletedSoda}`)
                showDbAction('.deleted', 40) // show deleted from database popup
            } // end success
        }) // end ajax
    } // end delete soda

    // show popup to display action taken by database
    function showDbAction(popup, distance) {
        $(popup).fadeIn().position({
            at: `center center-${distance}`,
            of: 'body'
        }).delay(1600).fadeOut('slow')
    } // end showDbAction

    // all popup windows are draggable
    $('.draggable').draggable({
        cursor: 'grabbing',
        delay: 70
    });
}); // end document ready