const fs = require("fs");

// read data from file inout
fs.readFile("input3.txt", "utf-8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let sumOfPriorities = 0;
    // split data to array
    const lines = data.split("\n");
    const letterRow="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    lines.map( line => {
        const length = line.length;

        // split the string in half
        const firstPart = line.slice(0, length / 2);
        const secondPart = line.slice(length / 2);

        // Convert Both Halves To A Set Of Unique Letters
        const uniqueCharsInFirstPart = new Set(firstPart);
        const uniqueCharsInSecondPart = new Set(secondPart);

        //Find a common letter by intersecting two sets
        const commonLetter = [...uniqueCharsInFirstPart].filter(char => uniqueCharsInSecondPart.has(char))[0];
        //Find position of commonLetter
        const position = letterRow.indexOf(commonLetter) + 1;
        if (position !== -1) {
            sumOfPriorities = sumOfPriorities + position;
        }
    });

    const groups = [];
    for (let i = 0; i < lines.length; i += 6) {
        groups.push([lines.slice(i, i + 3),lines.slice(i + 3, i + 6)]);
    }
    // sum variable for task 2
    let totalPrioritySum = 0;

// Iterate through each group
    for (const group of groups) {
        // Iterate through every item of group
        for (const groupArray of group) {
            // Create a Set for each rucksack's contents
            const rucksacks = groupArray.map(rucksack => new Set(rucksack));

            // Find the common item type among all three rucksacks
            if (rucksacks.length) {
                const commonItems = [...rucksacks[0]].filter(item => rucksacks[1].has(item) && rucksacks[2].has(item));

                // Calculate the sum of priorities for the common item(s)
                const prioritySum = commonItems.reduce((sum, item) => sum + (letterRow.indexOf(item) !== -1 ? letterRow.indexOf(item) + 1 : 0), 0);

                // Add the priority sum to the total
                totalPrioritySum += prioritySum;
            }
        }
    }

    // Print the total priority sum for task 2
    console.log(totalPrioritySum);

    // Print the total priority sum for task 1
    console.log(sumOfPriorities,'sum')
});

