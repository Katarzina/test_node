const fs = require("fs");

// read data from file inout
fs.readFile("input.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    // split data to array
    const lines = data.split("\n");
    //  This code first concatenates all elements into a single string, then uses the regular expression split(/,(?=,)/),
    //  which looks for commas immediately following the comma (i.e., empty elements) to split the string into substrings.
    //  We then use map to break each of these substrings into subarrays.
    const result = lines
        .join(",")
        .split(/,(?=,)/)
        .map((item) => item.split(","));

    const resultArray = [];
    // We count value every array element and add this to new array
    result.map((item) => {
        const sum = item.reduce((acc, calorie) => acc + Number(calorie), 0);
        resultArray.push(sum);
    });
    // get Max value
    const max = Math.max(...resultArray);
    console.log(max, "max");
});

