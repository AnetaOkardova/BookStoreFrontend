function validateForm() {
    var rewuiredElements = document.querySelectorAll('[required]');
    var valid = true;

    for (let i = 0; i < rewuiredElements.length; i++) {
        var elementValue = rewuiredElements[i].value;
        if (elementValue == null || elementValue.trim().length == 0 || elementValue == NaN) {
            valid = false;
            break;
        }
    }
    return valid;
}