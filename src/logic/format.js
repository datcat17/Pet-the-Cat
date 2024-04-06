"use strict";

export const formatNumber = (num) => {
    let numStr = num.toString();
    if(num >= 1000000) {
        return `${numStr.charAt(0)}.${numStr.charAt(1)}e${numStr.length}`;
    }

    else if(num >= 1000) {
        let temp = `${Math.floor(num / 1000)}.${numStr.charAt((`${num / 1000}`).indexOf("."))}`;
        if(temp.charAt(temp.length - 1) == '.') { temp += "0"; }

        return temp + "k";
    }

    else {
        return numStr;
    }
}
