$(document).ready(function () {

    var list = $('#results');

    $('#btnClear').click(function () {
        list.empty();
    });

    $('#btnExit').click(function () {
        Rho.Application.quit();
    });
                  
    $('#btnScan').click(function () {
        Rho.Barcode.take( {}, gotBarcode);
    });

    function freqFromCode(code) {
        var fRound = Number(code.substr(0,4));
        var fPart  = Number(code.substr(4,2));

        return fRound/10 + fPart/100;
    }


    function gotBarcode(evt) {
        var barcode = evt.data;

        Rho.Notification.beep({
            frequency: freqFromCode(barcode),
            volume: 1,
            duration: 100
        });

        list.append($("<li>").attr({
            class: 'list-group-item'
        }).text(barcode));

//        Rho.Barcode.stop();
        Rho.Barcode.start();
    }

    Rho.Barcode.allDecoders = false;
    Rho.Barcode.ean13 = true;
    Rho.Barcode.decodeDuration = 0;
    //Rho.Barcode.decodeVolume = 0;
    Rho.Barcode.enable({ }, gotBarcode);

    scanUsingDefaultScanner();
});