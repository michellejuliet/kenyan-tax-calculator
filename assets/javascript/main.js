// variables
let salary = 0.00;
let benefits = 0.00;
let pay_period = null;
let deduct_nhif = null;
let deduct_nssf = null;
let nssf_rate = null;

let income_before_pension_deduction;
let deductible_nssf_pension_contribution;
let income_after_persion_deductons
let benefits_in_kind;
let taxable_income;
let tax_on_taxable_income;
let personal_relief;
let tax_net_off_relief;
let paye;
let chargeable_income;
let nhif_contribution;
let net_pay



function calculate_paye() {

    if (document.getElementById('month').checked) {
        pay_period = document.getElementById('month').value;
    } else if (document.getElementById('year').checked) {
        pay_period = document.getElementById('year').value;
    }
    if (document.getElementById('nssf_yes').checked) {
        deduct_nssf = document.getElementById('nssf_yes').value;
    } else if (document.getElementById('nssf_no').checked) {
        deduct_nssf = document.getElementById('nssf_no').value;
    }
    if (document.getElementById('nhif_yes').checked) {
        deduct_nhif = document.getElementById('nhif_yes').value;
    } else if (document.getElementById('nhif_no').checked) {
        deduct_nhif = document.getElementById('nhif_no').value;
    }

    if (document.getElementById('new').checked) {
        nssf_rate = document.getElementById('new').value;
    } else if (document.getElementById('old').checked) {
        nssf_rate = document.getElementById('old').value;
    }

    salary = document.getElementById('salary').value;
    benefits = document.getElementById('benefits').value;

    income_before_pension_deduction = salary;
    document.getElementById('income_before_pension_deduction').innerHTML = `KSH ${income_before_pension_deduction}`;

    if (deduct_nssf == 'yes') {
        if (nssf_rate == 'new') {
            deductible_nssf_pension_contribution = 1200; // calculate nssf tier
            document.getElementById('deductible_nssf_pension_contribution').innerHTML = `KSH ${deductible_nssf_pension_contribution}`
        } else if (nssf_rate == 'old') {
            deductible_nssf_pension_contribution = 200;
            document.getElementById('deductible_nssf_pension_contribution').innerHTML = `KSH ${deductible_nssf_pension_contribution}`
        }
    } else if (deduct_nssf == 'no') {
        deductible_nssf_pension_contribution = 0;
        document.getElementById('deductible_nssf_pension_contribution').innerHTML = `KSH ${deductible_nssf_pension_contribution}`
    }

    if (deductible_nssf_pension_contribution >= 0) {
        income_after_persion_deductons = income_before_pension_deduction - deductible_nssf_pension_contribution;
        document.getElementById('income_after_persion_deductons').innerHTML = `KSH ${income_after_persion_deductons}`
    } else {
        income_after_persion_deductons = income_before_pension_deduction;
        document.getElementById('income_after_persion_deductons').innerHTML = `KSH ${income_after_persion_deductons}`
    }

    benefits_in_kind = benefits;
    document.getElementById('benefits_in_kind').innerHTML = `KSH ${benefits_in_kind}`

    taxable_income = (+income_after_persion_deductons + +benefits_in_kind);
    document.getElementById('taxable_income').innerHTML = `KSH ${taxable_income}`;

    chargeable_income = taxable_income;
    document.getElementById('chargeable_income').innerHTML = `KSH ${chargeable_income}`;

    if (pay_period == 'month') {
        personal_relief = 2400;
        document.getElementById('personal_relief').innerHTML = `KSH ${personal_relief}`
        calculate_income_tax('month');
        document.getElementById('tax_on_taxable_income').innerHTML = `KSH ${tax_on_taxable_income}`
        paye = (tax_on_taxable_income - personal_relief).toFixed(2)
    } else if (pay_period == 'year') {
        personal_relief = 28800;
        document.getElementById('personal_relief').innerHTML = `KSH ${personal_relief}`
        calculate_income_tax('year')
        document.getElementById('tax_on_taxable_income').innerHTML = `KSH ${tax_on_taxable_income}`
        paye = (tax_on_taxable_income - personal_relief).toFixed(2)
    } else {
        personal_relief = 0.00;
        calculate_income_tax()
        document.getElementById('personal_relief').innerHTML = `KSH ${personal_relief}`
        document.getElementById('tax_on_taxable_income').innerHTML = `KSH ${tax_on_taxable_income}`
        paye = (tax_on_taxable_income - personal_relief).toFixed(2)
    }

    tax_net_off_relief = paye;
    document.getElementById('tax_net_off_relief').innerHTML = `KSH ${tax_net_off_relief}`
    document.getElementById('paye').innerHTML = `KSH ${paye}`


    // nhif
    if (deduct_nhif == 'yes') {
        calculate_nhif();
        document.getElementById(' nhif_contribution').innerHTML = `KSH ${nhif_contribution}`
        net_pay = (+chargeable_income - +nhif_contribution - +paye);
        document.getElementById('net_pay').innerHTML = `KSH ${net_pay}`
    } else if (deduct_nhif == 'no') {
        nhif_contribution = 0;
        document.getElementById(' nhif_contribution').innerHTML = `KSH ${nhif_contribution}`
        net_pay = (+chargeable_income - +nhif_contribution - +paye);
        document.getElementById('net_pay').innerHTML = `KSH ${net_pay}`
    } else {
        net_pay = (+chargeable_income);
        document.getElementById('net_pay').innerHTML = `KSH ${net_pay}`
    }

}

function calculate_nhif() {
        switch (true) {
            case salary <= 5999:
                nhif_contribution = 150;
                break;
            case salary <= 7999:
                nhif_contribution = 300;
                break;
            case salary <= 11999:
                nhif_contribution = 400;
                break;
            case salary <= 14999:
                nhif_contribution = 500;
                break;
            case salary <= 19999:
                nhif_contribution = 600;
                break;
            case salary <= 24999:
                nhif_contribution = 750;
                break;
            case salary <= 29999:
                nhif_contribution = 850;
                break;
            case salary <= 34999:
                nhif_contribution = 900;
                break;
            case salary <= 39999:
                nhif_contribution = 950;
                break;
            case salary <= 44999:
                nhif_contribution = 1000;
                break;
            case salary <= 49999:
                nhif_contribution = 1100;
                break;
            case salary <= 59999:
                nhif_contribution = 1200;
                break;
            case salary <= 69999:
                nhif_contribution = 1300;
                break;
            case salary <= 79999:
                nhif_contribution = 1400;
                break;
            case salary <= 89999:
                nhif_contribution = 1500;
                break;
            case salary <= 99999:
                nhif_contribution = 1600;
                break;
            default:
                nhif_contribution = 1700;
                break;
        }

    return nhif_contribution;
}

function calculate_income_tax(period) {

    tax_on_taxable_income = 0;
    let a, b, c, d = 0, tax;
    let taxes = [];

    if (period == 'month') {
        if (taxable_income > 12298) {
            a = taxable_income - 12298;
            tax = 12298 * 0.1;
            taxes.push(tax);

            if (a > 11587) {
                b = a - 11587;
                tax = 11587 * 0.15;
                taxes.push(tax);

                if (b > 11587) {
                    c = b - 11587;
                    tax = 11587 * 0.20;
                    taxes.push(tax);

                    if (c > 11587) {
                        d = c - 11587;
                        tax = 11587 * 0.25;
                        taxes.push(tax);

                        if (d) {
                            tax = d * 0.30;
                            taxes.push(tax);
                        }
                    } else {
                        tax = c * 0.25;
                        taxes.push(tax);
                    }
                } else {
                    tax = b * 0.20;
                    taxes.push(tax)
                }
            } else {
                tax = a * 0.15;
                taxes.push(tax);
            }
        } else {
            tax = taxable_income * 0.10;
            taxes.push(tax);
        }
    } else if (period == 'year') {
        console.log('year income tax');
        if (taxable_income > 147580) {
            a = taxable_income - 147580;
            tax = 147580 * 0.1;
            taxes.push(tax);

            if (a > 139043) {
                b = a - 139043;
                tax = 139043 * 0.15;
                taxes.push(tax);

                if (b > 139043) {
                    c = b - 139043;
                    tax = 139043 * 0.20;
                    taxes.push(tax);

                    if (c > 139043) {
                        d = c - 139043;
                        tax = 139043 * 0.25;
                        taxes.push(tax);

                        if (d) {
                            tax = d * 0.30;
                            taxes.push(tax);
                        }
                    } else {
                        tax = c * 0.25;
                        taxes.push(tax);
                    }
                } else {
                    tax = b * 0.20;
                    taxes.push(tax)
                }
            } else {
                tax = a * 0.15;
                taxes.push(tax);
            }
        } else {
            tax = taxable_income * 0.10;
            taxes.push(tax);
        }

    } else {
        taxes = [0];
    }

     console.log(taxes);
    taxes.forEach(el => {
        tax_on_taxable_income = tax_on_taxable_income + el;
    })
console.log(tax_on_taxable_income.toFixed(2))
    return tax_on_taxable_income.toFixed(2);
}