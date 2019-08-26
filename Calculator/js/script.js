let calc = document.getElementById("textBox");
let flag = false;
let result = 0;
let op = "";

function validate(input) {
    input.value = input.value.replace(/[^\d.]*/g, '')
         .replace(/^[^\d]*(\d+([.]\d{0,5})?).*$/g, '$1');
}

function numberBtnPress(number) {
    if (flag) {
        calc.value = number;
        flag = false;
    } else {
        if (calc.value === "0"){
            calc.value = number;
        } else {
            if (calc.value.length < 8) {
                calc.value += number;
            }
        }
    }
}

function btnACPress() {
    result = 0;
    op = "";
    calc.value = "0";
    flag = true;

    disabledBtnFalse();
}

function btnPointPress() {
    if(flag) {
        calc.value = "0.";
        flag = false;
    } else {
        if((calc.value.indexOf(".") === -1) && calc.value.length < 7) {
            calc.value += ".";
        }
    }
}

function operatorBtnPress(operator) {
    let operand_2 = parseFloat(calc.value);
    let operand_1 = result;

    if (flag && op !== '=') {
        calc.value = result;
    } else {
        if (op === '+') {
            result += operand_2;
        } else if (op === '-') {
            result -= operand_2;
        } else if (op === '*') {
            result *= operand_2;
        } else if (op === '/') {
            result /= operand_2;
        } else {
            result = operand_2;
        }

        result = result.toPrecision(7);
        result = Math.round(result*1000000)/1000000;

        if (result.toString() === 'Infinity') {
            result = "На ноль делить нельзя";
            disabledBtnTrue();
        } else if (result.toString().length > 8) {
            result = -1;
            disabledBtnTrue();
        }

        calc.value = result.toString();
        setModelNumberValue(operand_1, operand_2, op, result);
        flag = true;
    }
    op = operator;
}

function setModelNumberValue (operand_1, operand_2, operator, result) {
    if(!operator || operator === "=") {
        return;
    }

    let example = {
        operand_1: operand_1,
        operand_2: operand_2,
        operator: operator,
        result: result
    };

    model.push(example);
}

function disabledBtnFalse() {
    let btn = document.getElementsByTagName('button');

    for (let button of btn) {
        if (button.value !== "AC") {
            button.disabled = false;
        }
    }
}

function disabledBtnTrue() {
    let btn = document.getElementsByTagName('button');

    for (let button of btn) {
        if (button.value !== "AC") {
            button.disabled = true;
        }
    }
}