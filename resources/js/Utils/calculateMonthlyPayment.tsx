export default function calculateMonthlyPayment(
    interest: number,
    price: number,
    duration: number
) {
    const principle = price;
    const monthlyInterest = interest / 100 / 12;
    const numberOfPaymentsMonths = duration * 12;

    const monthlyPayment =
        (principle *
            monthlyInterest *
            Math.pow(1 + monthlyInterest, numberOfPaymentsMonths)) /
        (Math.pow(1 + monthlyInterest, numberOfPaymentsMonths) - 1);

    return monthlyPayment;
}
