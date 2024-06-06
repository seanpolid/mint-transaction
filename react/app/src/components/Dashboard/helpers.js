export function processNetData(data, startDate, endDate) {
    const processedData = {};

    for (const transaction of data) {
        const type = transaction.category.type.name;

        if (!processedData[type]) {
            processedData[type] = {};
        }

        if (transaction.startDate && transaction.endDate) {
            const rangeOfDates = getRangeOfDates(transaction.startDate, transaction.endDate);

            const amountPerDay = transaction.amount / rangeOfDates.length;
            for (const date of rangeOfDates) {
                if (date < startDate || date > endDate) {
                    continue;
                }

                if (!processedData[type][date]) {
                    processedData[type][date] = amountPerDay;
                } else {
                    processedData[type][date] += amountPerDay;
                }
            }
        } else {
            const date = transaction.startDate;
            if (!processedData[type][date]) {
                processedData[type][date] = transaction.amount;
            } else {
                processedData[type][date] += transaction.amount;
            }
        }
    }

    return {
        seriesData: getSeriesData(processedData),
        net: getNet(processedData)
    };
}

function getRangeOfDates(startDate, endDate) {
    const rangeOfDates = [];

    const currentDate = new Date(startDate);
    let currentDateString = getDateString(currentDate);
    while (currentDateString <= endDate) {
        rangeOfDates.push(currentDateString);
        currentDate.setDate(currentDate.getDate() + 1);
        currentDateString = getDateString(currentDate);
    }
    
    return rangeOfDates;
}

function getDateString(date) {
    const dateString = date.toISOString();
    return dateString.split('T')[0];
}

function getSeriesData(processedData) {
    const seriesData = [];
    const colors = ["hsl(278, 70%, 50%)", "hsl(50, 70%, 50%)"];
    let index = 0;
    for (const type in  processedData) {
        const processedDataList = [];
        for (const [date, amount] of Object.entries(processedData[type])) {
            processedDataList.push({x: date, y: amount});
        }
        const sortedDataList = processedDataList.sort((d1, d2) => d1.x.localeCompare(d2.x));

        const finalDataObject = {};
        finalDataObject['id'] = type;
        finalDataObject['color'] = colors[index++];
        finalDataObject['data'] = sortedDataList;
        seriesData.push(finalDataObject);
    }

    return seriesData;
}

function getNet(processedData) {
    let net = 0;
    if (processedData['Income']) {
        const expenseSeries = processedData['Expense'];
        const incomeSeries = processedData['Income'];

        for (const date in incomeSeries) {
            net += incomeSeries[date];
            if (expenseSeries && expenseSeries[date]) {
                net -= expenseSeries[date];
            }
        }
    }

    return moneyRound(net);
}

function moneyRound(amount) {
    amount = amount * 100;
    amount = Math.round(amount);
    return amount / 100;
}

