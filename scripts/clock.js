// Copyright Edwin Jones 2012.
// Feel free to use the code for whatever you want,
// but please throw me a little credit back when you are done eh? :)
// http://www.edwinjones.me.uk

var currentMonth = new Date().getUTCMonth();

var SummerTime = (currentMonth > 2 && currentMonth < 10);


//This function returns the currently selected city time/UTC difference as a numerical value.
function GetTimeValue() {

    //Get the values of the currently selected bits from both inputs.
    var timevalue = $('input:radio[name=City]:checked').val();

    //Force type conversion.
    timevalue *= 1;


    //calculate British Summer Time / American Daylight Saving time (not perfectly accurate)
    //EJ BUG FIX APRIL 2012: CurrentMonth is 0 if the month is january, NOT 1.
    if (SummerTime) 
    {

        switch (timevalue) {
            case -8: // san francisco
                timevalue = -7;
                break;
            case -5: // NY
                timevalue = -4;
                break;
            case 0:  //London
                timevalue = 1;
                break;
        }

    }

    //return the timevalue.
    return timevalue;
}

//This sets up a timer to tick every 10th of second and update the clock.
setInterval(function () {

    //create date object.
    var date = new Date();

    //calculate offset
    var offset = date.getHours() + GetTimeValue();

    //set date object hours offset to offset value
    date.setHours(offset);

    //format the time properly.
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getUTCSeconds();

    mm = (mm < 10) ? '0' + mm : mm;
    hh = (hh < 10) ? '0' + hh : hh;
    ss = (ss < 10) ? '0' + ss : ss;


    //Change text of Clock element to match currently selected time.
    $('#Clock').text(hh + ':' + mm + ':' + ss);

}, 100);