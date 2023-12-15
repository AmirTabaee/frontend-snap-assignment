export const generateContactMockItems = (lang, description) => {
    const tempArray = [];
    let id = 1;
    if (!description) {
        return;
    }
    for (const [key, value] of Object.entries(description)) {
        if (lang[key] !== undefined)
            tempArray.push({
                id: id++,
                title: lang[key],
                description: value,
            });
    }
    return tempArray;
};
