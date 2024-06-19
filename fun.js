export function startAndEndDate(year, season) {
    if (year == "") {
        return ["", ""]
    } else {
        if (season == "whole") {
            return [`${year}-01-01`, `${year}-12-31`]
        } else if (season == "winter") {
            return [`${year}-01-01`, `${year}-03-31`]
        } else if (season == "spring") {
            return [`${year}-04-01`, `${year}-06-30`]
        } else if (season == "summer") {
            return [`${year}-07-01`, `${year}-09-30`]
        } else if (season == "fall") {
            return [`${year}-10-01`, `${year}-12-31`]
        }
    }
        
}