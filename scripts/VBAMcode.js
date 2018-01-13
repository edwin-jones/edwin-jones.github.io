// Copyright Edwin Jones 2012.
// Feel free to use the code for whatever you want,
// but please throw me a little credit back when you are done eh? :)
// http://www.edwinjones.me.uk

var readyString = "Ready for Output";

function GetOutput() {
    return document.getElementById('output');
}

//this is called when the document is fully loaded use for page setup/javascript enabled testing.
function Start() {
    try {
        GetOutput().innerHTML = readyString;
    }
    catch (err) {
        GetOutput().innerHTML = err;
    }
}


function GetByte() {
    //create array of  9 output doubles/bits (1 byte with a overflow bit).
    var bits = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    return bits;
}

function InvertBit(bit) {

    if (bit == 1) {
        bit = 0;
    }
    else {
        bit = 1;
    }

    return bit;
}

function Calculate(operation) {


    var adding = false;
    var subtracting = false;
    var multiplying = false;
    var dividing = false;

    //find out which operation is being performed.
    switch (operation) {

        case 'add':
            adding = true;
            break;
        case 'subtract':
            subtracting = true;
            break;
        case 'multiply':
            multiplying = true;
            break;
        case 'divide':
            dividing = true;
            break;
    }

    // declare carry bit
    var carry = 0

    //invert carry if subtracting
    if (subtracting) {
        carry = 1;
    }

    // declare input bytes
    var byte1 = GetByte();
    var byte2 = GetByte();

    // declare output byte.
    var o = GetByte();

    //make sure byte match inputs. loop n times so we can include the overflow bit.
    for (i = 0; i < GetByte().length; i++) {
        var str1 = 'input:radio[name=inputOneBit' + i + ']:checked';
        var str2 = 'input:radio[name=inputTwoBit' + i + ']:checked';

        //Get the values of the currently selected bits from both inputs.
        var b1 = $(str1).val();
        var b2 = $(str2).val();

        if (subtracting) {

            b2 *= 1;

            b2 = InvertBit(b2);

        }

        //If the index is higher than the input bit count, prevent b1 and b2 being undefined.
        if (i >= 8) {
            b1 = 0;
            b2 = 0;
        }

        //match the current loop iteration bits to the relevant byte bits.
        byte1[i] = b1;
        byte2[i] = b2;

        //sum of inputs will be stored here. Must be set to numerical 0, not character '0' to maintain the correct typing.
        var sum = 0;

        //force type conversion and calculate sum of the inputs.
        sum = (byte1[i] * 1) + (byte2[i] * 1) + (carry * 1);

        //this switch will simulate a series of logic gates, taking in the current bits of byte1, byte2 and the carry bit
        //and producing the correct output in the output bit. The carry bit value will carry over for the next operation.
        switch (sum) {
            case 0:
                o[i] = 0;
                carry = 0;
                break;

            case 1:
                o[i] = 1;
                carry = 0;
                break;

            case 2:
                o[i] = 0;
                carry = 1;
                break;

            case 3:
                o[i] = 1;
                carry = 1;
                break;
        }
    }

    //create a string to hold results.
    var result = " ";

    //append the byte bit values to the result string in reverse order.
    if (adding) {
        result += o[8]; //only print overflow bit in addition operations.
    }
    result += o[7];
    result += o[6];
    result += o[5];
    result += o[4];
    result += o[3];
    result += o[2];
    result += o[1];
    result += o[0];

    //make sure we have a decimal string representation of the result.
    binaryNumber = parseInt(result, 2);
    var decimal = binaryNumber.toString(10);

    //output the binary and decimal result.
    GetOutput().innerHTML = "Binary: " + result + "<p>Decimal: " + decimal + "</p>";

    //check for negative numbers during subtractions!
    if (subtracting && o[7] > 0) {
        GetOutput().innerHTML = "ERROR! Result is negative. This system only handles positive integers.";
    }
}	