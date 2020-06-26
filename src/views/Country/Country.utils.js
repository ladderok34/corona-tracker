const formatDate = date => new Date(date).toISOString().slice(0, 10);

export const setDateRequestParams = () => {
    const from = new Date(new Date().setDate(new Date().getDate() - 3));
    const to = new Date(new Date().setDate(new Date().getDate() - 1));

    return {
        from: formatDate(from),
        to: formatDate(to),
    };
};

