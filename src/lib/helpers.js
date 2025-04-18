export const generateSafeNavItems = (items) => {
    return items.map((item, index) => ({
        ...item,
        _key: `${item.name}-${index}`  // guaranteed unique per render
    }));
};
