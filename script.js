//influencing factors for yield

// Get yield for plant

const getYieldForPlant = (plant, influencingFactors) => {
    // with out influencing factors
    if (!influencingFactors) {
        // with out influencing factors
        return plant.yield;
    } else if (!influencingFactors.wind) {
        // no wind
        const plantFactorSun = plant.factors.sun[influencingFactors.sun];
        return plant.yield * (1 + plantFactorSun / 100);
    } else if (!influencingFactors.sun) {
        // no sun
        const plantFactorWind = plant.factors.wind[influencingFactors.wind];
        return plant.yield * (1 + plantFactorWind / 100);
    } else if (influencingFactors.wind && influencingFactors.sun) {
        // sun & wind
        const plantFactorSun = plant.factors.sun[influencingFactors.sun];
        const plantFactorWind = plant.factors.wind[influencingFactors.wind];

        return (
            plant.yield * (1 + plantFactorWind / 100) * (1 + plantFactorSun / 100)
        );
    }
};

//getYieldForCrop
const getYieldForCrop = (input, influencingFactors) => {
    return Math.round(
        getYieldForPlant(input.crop, influencingFactors) * input.num_crops
    );
};
//getTotalYield
const getTotalYield = ({ crops }, influencingFactors) => {
    let totalYield = 0;
    crops.forEach((crop) => {
        totalYield += getYieldForCrop(crop, influencingFactors);
    });
    return totalYield;
};
//getCostsForCrop
const getCostsForCrop = (input) => {
    return input.crop.costs * input.num_crops;
};

//getRevenueForCrop
const getRevenueForCrop = (input, influencingFactors) => {
    return input.crop.revenue * getYieldForCrop(input, influencingFactors);
};
//getProfitForCrop
const getProfitForCrop = (input, influencingFactors) => {
    return (
        getRevenueForCrop(input, influencingFactors) -
        getCostsForCrop(input, influencingFactors)
    );
};

const getTotalProfit = ({ crops }, influencingFactors) => {
    let totalProfit = 0;
    crops.forEach((crop) => {
        totalProfit += getProfitForCrop(crop, influencingFactors);
    });
    return totalProfit;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};